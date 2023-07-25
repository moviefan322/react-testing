/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // render component
  render(<UserForm />);

  // manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertion - make sure the component is doing
  // what we expect it to do

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls the onUserAdd function when the button is clicked", async () => {
  // NOT THE BEST IMPLEMENTATION
  const mock = jest.fn();

  // Try to render my component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  // const [nameInput, emailInput] = screen.getAllByRole("textbox");
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate typing in a name
  await act(async () => {
    await user.click(nameInput);
    await user.type(nameInput, "Bob");
  });

  // Simulate typing in an email
  await act(async () => {
    await user.click(emailInput);
    await user.type(emailInput, "Bob@Bob.com");
  });

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  await act(async () => {
    await user.click(button);
  });

  // Check that the onUserAdd function was called
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "Bob", email: "Bob@Bob.com" });
});

test("it empties the two inputs when the form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await act(async () => {
    user.click(nameInput);
    user.type(nameInput, "Bob");
    user.click(emailInput);
    user.type(emailInput, "bob@bob.com");

    user.click(button);
  });

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
