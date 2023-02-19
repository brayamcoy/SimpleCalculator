import React from "react";
import { create } from "react-test-renderer";
import App from "./App";

jest.mock('@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js', () => {
  return () => '';
});

describe("App component", () => {
  it("renders correctly", () => {
    const component = create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});