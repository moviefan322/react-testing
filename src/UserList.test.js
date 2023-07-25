import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "Jane", email: "jane@jane.com" },
    { name: "Bob", email: "bob@bob.com" },
  ];
  render(<UserList users={users} />);

  return {
    users,
  };
}

test("it renders one row per user", () => {
  // Render the component
  renderComponent();

  // Find the rows
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // Assertion: correct number of rows
  expect(rows).toHaveLength(2);
});

test("it renders email and name of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
