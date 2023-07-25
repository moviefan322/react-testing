/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import user from "@testing-library/user-event";
import App from "./App";

test("can recieve a new user and show it on the list", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await act(async () => {
    user.click(nameInput);
    user.type(nameInput, "Jane");
    user.click(emailInput);
    user.type(emailInput, "jane@jane.com");

    user.click(button);
  });

  const name = screen.getByRole("cell", { name: "Jane" });
  const email = screen.getByRole("cell", { name: "jane@jane.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
