import * as React from "react";
import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@eluan/core";
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis, Users } from "lucide-react";

// ---------------------------------------------------------------------------
// Types and data
// ---------------------------------------------------------------------------

const ROLES = ["Admin", "Member", "Viewer"] as const;
export type Role = (typeof ROLES)[number];

export type UserStatus = "active" | "suspended";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  /** ISO 8601 timestamp of the user's last sign-in, or null if they have never signed in. */
  lastActiveAt: string | null;
};

type SortKey = "name" | "role" | "lastActiveAt";
type SortDirection = "ascending" | "descending";
type SortState = { key: SortKey; direction: SortDirection };

const SAMPLE_USERS: User[] = [
  { id: "u1", name: "Ana Lima", email: "ana.lima@example.com", role: "Admin", status: "active", lastActiveAt: "2026-10-29T16:42:00Z" },
  { id: "u2", name: "Ben Okafor", email: "ben.okafor@example.com", role: "Member", status: "active", lastActiveAt: "2026-10-27T09:15:00Z" },
  { id: "u3", name: "Chloé Martin", email: "chloe.martin@example.com", role: "Viewer", status: "suspended", lastActiveAt: "2026-09-30T13:05:00Z" },
  { id: "u4", name: "Daniel Park", email: "daniel.park@example.com", role: "Member", status: "active", lastActiveAt: null },
  { id: "u5", name: "Eva Novak", email: "eva.novak@example.com", role: "Admin", status: "active", lastActiveAt: "2026-10-30T08:20:00Z" },
  { id: "u6", name: "Farid Haddad", email: "farid.haddad@example.com", role: "Viewer", status: "active", lastActiveAt: "2026-10-12T11:48:00Z" },
];

const STATUS_BADGE: Record<UserStatus, { label: string; variant: "positive" | "secondary" }> = {
  active: { label: "Active", variant: "positive" },
  suspended: { label: "Suspended", variant: "secondary" },
};

/** The direction a column starts in the first time it's sorted. Dates start with the most recent. */
const INITIAL_DIRECTION: Record<SortKey, SortDirection> = {
  name: "ascending",
  role: "ascending",
  lastActiveAt: "descending",
};

const iconStyle: React.CSSProperties = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });
const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

function compareUsers(a: User, b: User, sort: SortState): number {
  const flip = sort.direction === "ascending" ? 1 : -1;
  let order = 0;

  switch (sort.key) {
    case "name":
      order = flip * collator.compare(a.name, b.name);
      break;
    case "role":
      order = flip * collator.compare(a.role, b.role);
      break;
    case "lastActiveAt": {
      const aTime = a.lastActiveAt === null ? null : Date.parse(a.lastActiveAt);
      const bTime = b.lastActiveAt === null ? null : Date.parse(b.lastActiveAt);
      if (aTime === null || bTime === null) {
        // People who have never signed in stay at the bottom in both directions.
        order = aTime === bTime ? 0 : aTime === null ? 1 : -1;
      } else {
        order = flip * (aTime - bTime);
      }
      break;
    }
  }

  // Break ties on name, then email, so equal values keep a stable, predictable order.
  return order || collator.compare(a.name, b.name) || collator.compare(a.email, b.email);
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

function SortableHead({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  sort: SortState;
  onSort: (key: SortKey) => void;
}) {
  const active = sort.key === sortKey;
  const Icon = !active ? ArrowUpDown : sort.direction === "ascending" ? ArrowUp : ArrowDown;

  return (
    <TableHead aria-sort={active ? sort.direction : "none"}>
      <Button type="button" variant="ghost" size="sm" onClick={() => onSort(sortKey)}>
        {label}
        <Icon aria-hidden="true" style={iconStyle} />
      </Button>
    </TableHead>
  );
}

function UserActionsMenu({
  user,
  triggerRef,
  onChangeRole,
  onToggleSuspended,
  onRequestRemove,
}: {
  user: User;
  triggerRef: (node: HTMLButtonElement | null) => void;
  onChangeRole: (role: Role) => void;
  onToggleSuspended: () => void;
  onRequestRemove: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild ref={triggerRef}>
        <Button type="button" variant="ghost" size="iconSm" aria-label={`Actions for ${user.name}`}>
          <Ellipsis aria-hidden="true" style={iconStyle} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={user.role}
              onValueChange={(value) => {
                if (isRole(value) && value !== user.role) onChangeRole(value);
              }}
            >
              {ROLES.map((role) => (
                <DropdownMenuRadioItem key={role} value={role}>
                  {role}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onSelect={onToggleSuspended}>
          {user.status === "active" ? "Suspend user" : "Reactivate user"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="destructive" onSelect={onRequestRemove}>
          Remove from workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// eluan: composed, no component for empty state
const UsersEmptyState = React.forwardRef<HTMLDivElement>(function UsersEmptyState(_props, ref) {
  return (
    <div
      ref={ref}
      // Focusable so focus has somewhere to land after the last user is removed.
      tabIndex={-1}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "var(--spacing-sm)",
        padding: "var(--spacing-3xl)",
      }}
    >
      <Users
        aria-hidden="true"
        style={{ width: "var(--size-md)", height: "var(--size-md)", color: "var(--container-fg-alt)" }}
      />
      <Typography variant="subheading" as="h2">
        No users in this workspace
      </Typography>
      <Typography variant="body" tone="muted">
        People you invite to the workspace will appear here.
      </Typography>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Users table
// ---------------------------------------------------------------------------

export type UsersTableProps = {
  /** Users to show on first render. The table keeps its own copy and applies row actions to it. */
  initialUsers?: User[];
};

export default function UsersTable({ initialUsers = SAMPLE_USERS }: UsersTableProps) {
  const [users, setUsers] = React.useState<User[]>(initialUsers);
  const [sort, setSort] = React.useState<SortState>({ key: "name", direction: "ascending" });
  const [pendingRemoval, setPendingRemoval] = React.useState<User | null>(null);

  // Row menu triggers by user id, so focus can go back to the right row after the dialog closes.
  const triggerRefs = React.useRef(new Map<string, HTMLButtonElement>());
  // The user whose menu trigger should get focus when the dialog closes; null means the empty state.
  const focusAfterDialog = React.useRef<string | null>(null);
  const emptyStateRef = React.useRef<HTMLDivElement>(null);

  const rows = React.useMemo(() => [...users].sort((a, b) => compareUsers(a, b, sort)), [users, sort]);

  const handleSort = (key: SortKey) =>
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === "ascending" ? "descending" : "ascending" }
        : { key, direction: INITIAL_DIRECTION[key] },
    );

  const updateUser = (id: string, patch: Partial<Omit<User, "id">>) =>
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, ...patch } : user)));

  const setTriggerRef = (id: string) => (node: HTMLButtonElement | null) => {
    if (node) triggerRefs.current.set(id, node);
    else triggerRefs.current.delete(id);
  };

  const requestRemoval = (user: User) => {
    focusAfterDialog.current = user.id;
    setPendingRemoval(user);
  };

  const confirmRemoval = () => {
    if (!pendingRemoval) return;
    // The removed row's trigger disappears, so hand focus to the row that takes its place.
    const index = rows.findIndex((user) => user.id === pendingRemoval.id);
    const neighbour = rows[index + 1] ?? rows[index - 1];
    focusAfterDialog.current = neighbour ? neighbour.id : null;

    setUsers((current) => current.filter((user) => user.id !== pendingRemoval.id));
    setPendingRemoval(null);
  };

  // The dialog opens from a menu item, not a DialogTrigger, so return focus ourselves.
  const restoreFocus = (event: Event) => {
    event.preventDefault();
    const id = focusAfterDialog.current;
    const target = id === null ? emptyStateRef.current : triggerRefs.current.get(id);
    target?.focus();
  };

  return (
    <>
      {rows.length === 0 ? (
        <UsersEmptyState ref={emptyStateRef} />
      ) : (
        <Table>
          <TableCaption>People with access to this workspace.</TableCaption>
          <TableHeader>
            <TableRow>
              <SortableHead label="Name" sortKey="name" sort={sort} onSort={handleSort} />
              <SortableHead label="Role" sortKey="role" sort={sort} onSort={handleSort} />
              <TableHead>Status</TableHead>
              <SortableHead label="Last active" sortKey="lastActiveAt" sort={sort} onSort={handleSort} />
              <TableHead aria-label="Actions" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((user) => {
              const status = STATUS_BADGE[user.status];
              return (
                <TableRow key={user.id}>
                  <TableCell weight="medium">
                    {user.name}
                    <Typography variant="caption" tone="muted" as="div">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    {user.lastActiveAt ? (
                      <time dateTime={user.lastActiveAt}>{dateFormatter.format(new Date(user.lastActiveAt))}</time>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <div style={{ textAlign: "right" }}>
                      <UserActionsMenu
                        user={user}
                        triggerRef={setTriggerRef(user.id)}
                        onChangeRole={(role) => updateUser(user.id, { role })}
                        onToggleSuspended={() =>
                          updateUser(user.id, { status: user.status === "active" ? "suspended" : "active" })
                        }
                        onRequestRemove={() => requestRemoval(user)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <Dialog
        open={pendingRemoval !== null}
        onOpenChange={(open) => {
          if (!open) setPendingRemoval(null);
        }}
      >
        {pendingRemoval && (
          <DialogContent onCloseAutoFocus={restoreFocus}>
            <DialogHeader>
              <DialogTitle>Remove {pendingRemoval.name} from the workspace?</DialogTitle>
              <DialogDescription>
                {pendingRemoval.name} ({pendingRemoval.email}) loses access to this workspace immediately. To give them
                access again, you'll need to send a new invite.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" variant="destructive" onClick={confirmRemoval}>
                Remove from workspace
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
