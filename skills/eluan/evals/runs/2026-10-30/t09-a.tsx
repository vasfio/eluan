"use client";

import * as React from "react";
import {
  ActionPopover,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@eluan/core";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

export type UserRole = "owner" | "admin" | "member" | "viewer";
export type UserStatus = "active" | "invited" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  /** ISO-8601 timestamp, or null when the user has never signed in. */
  lastActiveAt: string | null;
}

export type SortKey = "name" | "email" | "role" | "status" | "lastActiveAt";
/** Matches the `aria-sort` values, so it can be passed straight through. */
export type SortDirection = "ascending" | "descending";

export interface SortState {
  key: SortKey;
  direction: SortDirection;
}

type BadgeVariant = NonNullable<React.ComponentProps<typeof Badge>["variant"]>;
type RowAction = React.ComponentProps<typeof ActionPopover>["items"][number];

// ─── Display metadata ───────────────────────────────────────────────────────

const COLUMNS: ReadonlyArray<{ key: SortKey; label: string }> = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "lastActiveAt", label: "Last active" },
];

// `rank` gives role and status a meaningful sort order instead of alphabetical.
const ROLE_META: Record<UserRole, { label: string; rank: number }> = {
  owner: { label: "Owner", rank: 0 },
  admin: { label: "Admin", rank: 1 },
  member: { label: "Member", rank: 2 },
  viewer: { label: "Viewer", rank: 3 },
};

const STATUS_META: Record<
  UserStatus,
  { label: string; rank: number; badge: BadgeVariant }
> = {
  active: { label: "Active", rank: 0, badge: "positive" },
  invited: { label: "Invited", rank: 1, badge: "informative" },
  suspended: { label: "Suspended", rank: 2, badge: "caution" },
};

const DEFAULT_SORT: SortState = { key: "name", direction: "ascending" };

// ─── Sorting ────────────────────────────────────────────────────────────────

const collator = new Intl.Collator(undefined, {
  sensitivity: "base",
  numeric: true,
});

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });

type SortValue = string | number | null;

const SORT_VALUE: Record<SortKey, (user: User) => SortValue> = {
  name: (user) => user.name,
  email: (user) => user.email,
  role: (user) => ROLE_META[user.role].rank,
  status: (user) => STATUS_META[user.status].rank,
  lastActiveAt: (user) =>
    user.lastActiveAt === null ? null : Date.parse(user.lastActiveAt),
};

function compareValues(a: string | number, b: string | number): number {
  return typeof a === "string" || typeof b === "string"
    ? collator.compare(String(a), String(b))
    : a - b;
}

export function sortUsers(
  users: readonly User[],
  { key, direction }: SortState,
): User[] {
  const getValue = SORT_VALUE[key];
  const sign = direction === "ascending" ? 1 : -1;

  return [...users].sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    if (aValue === null || bValue === null) {
      // Missing values (e.g. never signed in) stay at the bottom in both directions.
      if (aValue !== bValue) return aValue === null ? 1 : -1;
    } else {
      const result = compareValues(aValue, bValue);
      if (result !== 0) return sign * result;
    }

    // Deterministic tie-break so equal rows don't shuffle between sorts.
    return collator.compare(a.name, b.name) || collator.compare(a.id, b.id);
  });
}

function nextSort(current: SortState, key: SortKey): SortState {
  if (current.key !== key) return { key, direction: "ascending" };
  return {
    key,
    direction: current.direction === "ascending" ? "descending" : "ascending",
  };
}

// ─── Styles (token-driven; applied to plain elements only) ──────────────────

const mutedTextStyle: React.CSSProperties = {
  color: "var(--container-fg-alt)",
};

const actionsCellStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
};

const sortIconStyle: React.CSSProperties = {
  flexShrink: 0,
  marginInlineStart: "var(--spacing-xs)",
};

const visuallyHiddenStyle: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

// ─── Cells ──────────────────────────────────────────────────────────────────

function LastActive({ value }: { value: string | null }) {
  if (value === null) return <span style={mutedTextStyle}>Never</span>;
  return <time dateTime={value}>{dateFormatter.format(new Date(value))}</time>;
}

function SortableHead({
  column,
  sort,
  onSort,
}: {
  column: (typeof COLUMNS)[number];
  sort: SortState;
  onSort: (key: SortKey) => void;
}) {
  const isSorted = sort.key === column.key;
  const Icon = !isSorted
    ? ArrowUpDown
    : sort.direction === "ascending"
      ? ArrowUp
      : ArrowDown;

  return (
    // aria-sort goes on the sorted column only (WAI-ARIA sortable table pattern).
    <TableHead aria-sort={isSorted ? sort.direction : undefined}>
      <Button variant="ghost" size="sm" onClick={() => onSort(column.key)}>
        {column.label}
        <Icon size={16} aria-hidden="true" style={sortIconStyle} />
      </Button>
    </TableHead>
  );
}

// ─── UsersTable ─────────────────────────────────────────────────────────────

export interface UsersTableProps {
  users: readonly User[];
  /** Called when a user is suspended or reactivated from the row menu. */
  onStatusChange: (user: User, status: "active" | "suspended") => void;
  /**
   * Called after the user confirms deletion. May return a promise: the dialog
   * stays open (buttons disabled) until it settles, and closes only on success.
   * If it rejects, the dialog stays open for a retry — surface the error from
   * your handler.
   */
  onDelete: (user: User) => void | Promise<void>;
  defaultSort?: SortState;
  /** Accessible name for the table, rendered as its caption. */
  caption?: string;
}

export function UsersTable({
  users,
  onStatusChange,
  onDelete,
  defaultSort = DEFAULT_SORT,
  caption = "Users",
}: UsersTableProps) {
  const [sort, setSort] = React.useState<SortState>(defaultSort);
  const sortedUsers = React.useMemo(() => sortUsers(users, sort), [users, sort]);

  // The target outlives `open` so the dialog copy doesn't blank out while it
  // animates closed.
  const [deleteTarget, setDeleteTarget] = React.useState<User | null>(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const [isDeleting, setDeleting] = React.useState(false);

  const handleSort = React.useCallback((key: SortKey) => {
    setSort((current) => nextSort(current, key));
  }, []);

  const requestDelete = (user: User) => {
    setDeleteTarget(user);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await onDelete(deleteTarget);
      setDeleteOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  const rowActions = (user: User): RowAction[] => {
    const isOwner = user.role === "owner";
    const statusAction: RowAction =
      user.status === "suspended"
        ? {
            label: "Reactivate user",
            icon: <UserCheck size={16} aria-hidden="true" />,
            onClick: () => onStatusChange(user, "active"),
          }
        : {
            label: "Suspend user",
            icon: <UserX size={16} aria-hidden="true" />,
            onClick: () => onStatusChange(user, "suspended"),
            // Owners can't be suspended; invited users haven't joined yet.
            disabled: isOwner || user.status === "invited",
          };

    return [
      statusAction,
      {
        label: "Delete user",
        icon: <Trash2 size={16} aria-hidden="true" />,
        onClick: () => requestDelete(user),
        destructive: true,
        disabled: isOwner,
      },
    ];
  };

  return (
    <>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((column) => (
              <SortableHead
                key={column.key}
                column={column}
                sort={sort}
                onSort={handleSort}
              />
            ))}
            <TableHead>
              <span style={visuallyHiddenStyle}>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={COLUMNS.length + 1}>
                <span style={mutedTextStyle}>No users yet.</span>
              </TableCell>
            </TableRow>
          ) : (
            sortedUsers.map((user) => {
              const status = STATUS_META[user.status];
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <span style={mutedTextStyle}>{user.email}</span>
                  </TableCell>
                  <TableCell>{ROLE_META[user.role].label}</TableCell>
                  <TableCell>
                    <Badge variant={status.badge}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <LastActive value={user.lastActiveAt} />
                  </TableCell>
                  <TableCell>
                    <div style={actionsCellStyle}>
                      <ActionPopover
                        aria-label={`Actions for ${user.name}`}
                        items={rowActions(user)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <Dialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          // Don't let Escape / outside click dismiss mid-request.
          if (!isDeleting) setDeleteOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {deleteTarget?.name ?? "user"}?</DialogTitle>
            <DialogDescription>
              {deleteTarget?.email} will lose access immediately. This can&apos;t
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={() => void confirmDelete()}
            >
              {isDeleting ? "Deleting…" : "Delete user"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Default export: table wired to local state ─────────────────────────────

// Placeholder data — swap for the users API response where this is mounted.
const INITIAL_USERS: User[] = [
  {
    id: "usr_01",
    name: "Amara Okafor",
    email: "amara@example.com",
    role: "owner",
    status: "active",
    lastActiveAt: "2026-10-29T16:42:00Z",
  },
  {
    id: "usr_02",
    name: "Liam Chen",
    email: "liam.chen@example.com",
    role: "admin",
    status: "active",
    lastActiveAt: "2026-10-28T09:15:00Z",
  },
  {
    id: "usr_03",
    name: "Sofia Rossi",
    email: "sofia@example.com",
    role: "member",
    status: "suspended",
    lastActiveAt: "2026-08-03T11:00:00Z",
  },
  {
    id: "usr_04",
    name: "Noah Patel",
    email: "noah.patel@example.com",
    role: "viewer",
    status: "invited",
    lastActiveAt: null,
  },
  {
    id: "usr_05",
    name: "Elena Novak",
    email: "elena@example.com",
    role: "member",
    status: "active",
    lastActiveAt: "2026-10-30T07:30:00Z",
  },
  {
    id: "usr_06",
    name: "Diego Alvarez",
    email: "diego@example.com",
    role: "admin",
    status: "active",
    lastActiveAt: "2026-10-12T18:05:00Z",
  },
];

export default function UsersTableContainer() {
  const [users, setUsers] = React.useState<User[]>(INITIAL_USERS);

  const handleStatusChange = React.useCallback(
    (user: User, status: "active" | "suspended") => {
      setUsers((current) =>
        current.map((u) => (u.id === user.id ? { ...u, status } : u)),
      );
    },
    [],
  );

  const handleDelete = React.useCallback((user: User) => {
    setUsers((current) => current.filter((u) => u.id !== user.id));
  }, []);

  return (
    <UsersTable
      users={users}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
    />
  );
}
