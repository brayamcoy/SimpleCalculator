import React from "react";
import useCalculator from "../../../hooks/useCalculator";
import Calculator from "../index";
import { create } from "react-test-renderer";

jest.mock("../../../hooks/useCalculator", () => {
  return jest.fn().mockImplementation(() => {
    return {
      deleteValue: jest.fn(),
      inputNumber: jest.fn(),
      inputOperator: jest.fn(),
    };
  });
});

jest.mock('@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js', () => {
  return () => '';
});

describe("Calculator component", () => {
  it("renders correctly", () => {
    const tree = create(<Calculator />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls the inputNumber function when a number button is pressed", () => {
    const inputNumber = jest.fn();
    useCalculator.mockImplementation(() => {
      return {
        deleteValue: jest.fn(),
        inputNumber: inputNumber,
        inputOperator: jest.fn(),
      };
    });
    const tree = create(<Calculator />).root;
    tree.findByProps({ children: "9" }).props.onPress();
    expect(inputNumber).toHaveBeenCalled();
  });

  it("calls the inputOperator function when an operator button is pressed", () => {
    const inputOperator = jest.fn();
    useCalculator.mockImplementation(() => {
      return {
        deleteValue: jest.fn(),
        inputNumber: jest.fn(),
        inputOperator: inputOperator,
      };
    });
    const tree = create(<Calculator />).root;
    tree.findByProps({ children: "÷" }).props.onPress();
    expect(inputOperator).toHaveBeenCalled();
  });
});
