import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CheckboxGroup, CheckboxGroupItem } from "../checkbox-group";

const Options = () => (
  <>
    <CheckboxGroupItem value="email" label="Email" />
    <CheckboxGroupItem value="sms" label="SMS" />
    <CheckboxGroupItem value="push" label="Push" description="Device alerts" />
  </>
);

describe("CheckboxGroup", () => {
  it("renders a role=group with a checkbox per item", () => {
    render(
      <CheckboxGroup defaultValue={[]}>
        <Options />
      </CheckboxGroup>
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  it("reflects the controlled value as checked state", () => {
    render(
      <CheckboxGroup value={["sms"]}>
        <Options />
      </CheckboxGroup>
    );
    expect(screen.getByRole("checkbox", { name: "SMS" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Email" })).not.toBeChecked();
  });

  it("emits the next value array via onValueChange", async () => {
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup defaultValue={[]} onValueChange={onValueChange}>
        <Options />
      </CheckboxGroup>
    );
    await userEvent.click(screen.getByRole("checkbox", { name: "Email" }));
    expect(onValueChange).toHaveBeenCalledWith(["email"]);
  });

  it("disables every item when the group is disabled", () => {
    render(
      <CheckboxGroup disabled defaultValue={[]}>
        <Options />
      </CheckboxGroup>
    );
    for (const box of screen.getAllByRole("checkbox")) {
      expect(box).toBeDisabled();
    }
  });
});
