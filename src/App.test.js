import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const cell = (row, column) =>
  screen.getByRole("gridcell", { name: new RegExp(`^Row ${row}, column ${column}`) });

test("starts a game and alternates players", () => {
  render(<App />);

  expect(screen.getByRole("status")).toHaveTextContent("X's turn");
  fireEvent.click(cell(1, 1));
  expect(cell(1, 1)).toHaveTextContent("X");
  expect(screen.getByRole("status")).toHaveTextContent("O's turn");
  fireEvent.click(cell(1, 2));
  expect(cell(1, 2)).toHaveTextContent("O");
});

test("announces a winner and prevents further moves", () => {
  render(<App />);

  [[1, 1], [2, 1], [1, 2], [2, 2], [1, 3]].forEach(([row, column]) => fireEvent.click(cell(row, column)));

  expect(screen.getByRole("status")).toHaveTextContent("X wins!");
  expect(cell(3, 3)).toBeDisabled();
});

test("resets the board when a new size is selected", () => {
  render(<App />);

  fireEvent.click(cell(1, 1));
  fireEvent.change(screen.getByLabelText("Board size"), { target: { value: "4" } });

  expect(screen.getAllByRole("gridcell")).toHaveLength(16);
  expect(screen.getByRole("status")).toHaveTextContent("X's turn");
});
