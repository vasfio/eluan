import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { Home, Users } from "lucide-react";
import {
  NavigationDrawer,
  NavigationDrawerProvider,
  NavigationDrawerContent,
  NavigationDrawerItem,
  NavigationDrawerLayout,
} from "../navigation-drawer";

// NavigationDrawer requires being wrapped in `NavigationDrawerProvider`. The
// previous tests mounted it directly which threw the
// "must be used within a NavigationDrawerProvider" error.

describe("NavigationDrawer", () => {
  const TestDrawer = () => (
    <NavigationDrawerProvider>
      <NavigationDrawer>
        <NavigationDrawerContent>
          <nav>
            <a href="/home">Home</a>
            <a href="/about">About</a>
          </nav>
        </NavigationDrawerContent>
      </NavigationDrawer>
    </NavigationDrawerProvider>
  );

  it("renders nav links inside the drawer (desktop)", () => {
    render(<TestDrawer />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });
});

// Stand-in for next/link: it runs the caller's onClick, then prevents the
// native navigation and pushes the route itself.
const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    push: (href: string) => void;
  }
>(({ href, push, onClick, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    {...props}
    onClick={(event) => {
      onClick?.(event);
      event.preventDefault();
      push(href);
    }}
  />
));
RouterLink.displayName = "RouterLink";

describe("NavigationDrawerItem asChild", () => {
  it("renders the child link with the icon and label inside it", () => {
    render(
      <NavigationDrawerProvider>
        <NavigationDrawerItem asChild icon={<Users data-testid="icon" />}>
          <RouterLink href="/users" push={() => {}}>
            Users
          </RouterLink>
        </NavigationDrawerItem>
      </NavigationDrawerProvider>
    );

    const link = screen.getByRole("link", { name: "Users" });
    expect(link).toHaveAttribute("href", "/users");
    expect(link).toContainElement(screen.getByTestId("icon"));
    // The item's styles land on the link itself, not on a wrapper.
    expect(link.className).not.toBe("");
    expect(link.parentElement?.tagName).not.toBe("A");
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("drops the label but keeps the link when collapsed", () => {
    render(
      <NavigationDrawerProvider defaultCollapsed>
        <NavigationDrawerItem asChild icon={<Users data-testid="icon" />}>
          <RouterLink href="/users" push={() => {}}>
            Users
          </RouterLink>
        </NavigationDrawerItem>
      </NavigationDrawerProvider>
    );

    const link = screen.getByRole("link");
    expect(link).toContainElement(screen.getByTestId("icon"));
    expect(link).not.toHaveTextContent("Users");
  });
});

describe("NavigationDrawer on mobile", () => {
  beforeEach(() => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(375);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const Sidebar = ({
    onHomeClick,
    push = () => {},
  }: {
    onHomeClick?: React.MouseEventHandler<HTMLAnchorElement>;
    push?: (href: string) => void;
  }) => (
    <NavigationDrawerContent>
      <NavigationDrawerItem href="/" icon={<Home />} onClick={onHomeClick}>
        Home
      </NavigationDrawerItem>
      <NavigationDrawerItem asChild icon={<Users />}>
        <RouterLink href="/users" push={push}>
          Users
        </RouterLink>
      </NavigationDrawerItem>
    </NavigationDrawerContent>
  );

  const openSheet = async () => {
    await userEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  };

  it("closes the sheet when an item is clicked", async () => {
    render(
      <NavigationDrawerLayout sidebar={<Sidebar onHomeClick={(e) => e.preventDefault()} />}>
        <main>Page</main>
      </NavigationDrawerLayout>
    );

    await openSheet();
    await userEvent.click(screen.getByRole("link", { name: "Home" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes the sheet when the click is handled by a client-side router", async () => {
    const push = vi.fn();
    render(
      <NavigationDrawerLayout sidebar={<Sidebar push={push} />}>
        <main>Page</main>
      </NavigationDrawerLayout>
    );

    await openSheet();
    await userEvent.click(screen.getByRole("link", { name: "Users" }));

    expect(push).toHaveBeenCalledWith("/users");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("reports item clicks through onMobileOpenChange when controlled", async () => {
    const onMobileOpenChange = vi.fn();
    const Controlled = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <NavigationDrawerLayout
          mobileOpen={open}
          onMobileOpenChange={(next) => {
            onMobileOpenChange(next);
            setOpen(next);
          }}
          sidebar={<Sidebar onHomeClick={(e) => e.preventDefault()} />}
        >
          <main>Page</main>
        </NavigationDrawerLayout>
      );
    };
    render(<Controlled />);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("link", { name: "Home" }));

    expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});

describe("NavigationDrawer on desktop", () => {
  it("does not report a mobile open change when an item is clicked", async () => {
    const onMobileOpenChange = vi.fn();
    render(
      <NavigationDrawerLayout
        onMobileOpenChange={onMobileOpenChange}
        sidebar={
          <NavigationDrawerContent>
            <NavigationDrawerItem href="/" onClick={(e) => e.preventDefault()}>
              Home
            </NavigationDrawerItem>
          </NavigationDrawerContent>
        }
      >
        <main>Page</main>
      </NavigationDrawerLayout>
    );

    await userEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(onMobileOpenChange).not.toHaveBeenCalled();
  });
});
