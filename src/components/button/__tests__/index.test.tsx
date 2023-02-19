import React from "react";
import { Text, Pressable } from "react-native";
import renderer, { act } from "react-test-renderer";
import ButtonCalculator, { ButtonProps } from "../index";

const defaultProps: ButtonProps = {
  children: "1",
  operator: false,
  onPress: jest.fn(),
};

describe("ButtonCalculator component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ButtonCalculator {...defaultProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with operator", () => {
    const props: ButtonProps = {
      ...defaultProps,
      operator: true,
    };
    const tree = renderer.create(<ButtonCalculator {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onPress function on button press", () => {
    const tree = renderer.create(<ButtonCalculator {...defaultProps} />);
    act(() => {
      const pressable = tree.root.findByType(Pressable);
      pressable.props.onPress();
      // tree.root.findByType(Pressable).props.onPress();
    });

    expect(defaultProps.onPress).toHaveBeenCalledWith(defaultProps.children);
  });

  it("calls onPress function on button long press", () => {
    const tree = renderer.create(<ButtonCalculator {...defaultProps} />);
    act(() => {
      const pressable = tree.root.findByType(Pressable);
      pressable.props.onLongPress();
    });
    expect(defaultProps.onPress).toHaveBeenCalledWith(defaultProps.children);
  });

  it("Handles hover correctly", () => {
    const buttonCalculator = renderer.create(
      <ButtonCalculator onPress={() => {}}>1</ButtonCalculator>
    );
    act(() => {
      buttonCalculator.root.findByType(Pressable).props.onPressIn();
    });
    expect(buttonCalculator.toJSON()).toMatchSnapshot();
    act(() => {
      buttonCalculator.root.findByType(Pressable).props.onPressOut();
    });
    expect(buttonCalculator.toJSON()).toMatchSnapshot();
  });

  it("Should have correct style for operator button", () => {
    const component = renderer.create(
      <ButtonCalculator children="+" operator={true} onPress={jest.fn()} />
    );
    expect(component.root.findByType(Text).props.style).toHaveProperty(
      "color",
      "#FFF"
    );
  });
});
