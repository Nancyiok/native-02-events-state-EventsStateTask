import { render, fireEvent } from "@testing-library/react-native";
import App from "./App";

export const changeTextInput = (element, text) => {
  fireEvent.changeText(element, text);
  fireEvent(element, "onChange", { nativeEvent: { text } });
};

describe("App", () => {
  test("check that the note container is empty before entering notes", () => {
    const { queryAllByTestId } = render(<App />);
    expect(queryAllByTestId("noteElem").length).toBe(0);
  });

  test("check that the input text field is cleared after the button is pressed", () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    changeTextInput(getByPlaceholderText("Enter your note"), "new item");
    fireEvent.press(getByText("Add note"));

    expect(getByPlaceholderText("Enter your note")).toHaveDisplayValue("");
  });

  test("check that it is not possible to add an empty note first", () => {
    const { getByText, queryAllByTestId } = render(<App />);

    fireEvent.press(getByText("Add note"));
    expect(queryAllByTestId("noteElem").length).toBe(0);
  });

  test("check that it is not possible to add an empty note after an added note", () => {
    const { getByPlaceholderText, getByText, queryAllByTestId } = render(
      <App />
    );

    changeTextInput(getByPlaceholderText("Enter your note"), "New note text");
    fireEvent.press(getByText("Add note"));
    fireEvent.press(getByText("Add note"));

    expect(queryAllByTestId("noteElem").length).toBe(1);
  });

  test("check the rendering of the note when it was entered", () => {
    const { getByPlaceholderText, getByText, getAllByText, queryAllByTestId } =
      render(<App />);

    changeTextInput(getByPlaceholderText("Enter your note"), "note 1");
    fireEvent.press(getByText("Add note"));

    expect(getAllByText("note 1")).toHaveLength(1);
    expect(queryAllByTestId("noteElem").length).toBe(1);
  });

  test("check rendering of several added notes", () => {
    const { getByPlaceholderText, getByText, getAllByText, queryAllByTestId } =
      render(<App />);

    changeTextInput(getByPlaceholderText("Enter your note"), "Item 1");
    fireEvent.press(getByText("Add note"));

    changeTextInput(getByPlaceholderText("Enter your note"), "Item 2");
    fireEvent.press(getByText("Add note"));

    expect(getAllByText("Item 1")).toHaveLength(1);
    expect(getAllByText("Item 2")).toHaveLength(1);
    expect(queryAllByTestId("noteElem").length).toBe(2);
  });

  test("check note styles", () => {
    const BACKGROUND_COLOR = "#ffffff";
    const NOTE_COLOR = "#ffffff";
    const { getByPlaceholderText, getByText, getByTestId } = render(<App />);

    changeTextInput(getByPlaceholderText("Enter your note"), "New note text");
    fireEvent.press(getByText("Add note"));

    expect(getByTestId("pressableElem")).toHaveStyle({
      backgroundColor: BACKGROUND_COLOR,
    });
    expect(getByTestId("noteElem")).toHaveStyle({ color: NOTE_COLOR });
  });
});
