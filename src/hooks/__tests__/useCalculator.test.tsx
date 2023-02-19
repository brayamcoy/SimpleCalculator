import { ToastAndroid } from "react-native";
import useCalculator from "../useCalculator";

jest.mock("react-native", () => ({
  ToastAndroid: {
    show: jest.fn(),
  },
}));

describe("useCalculator", () => {
  it("resetCalculator reset the values", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "10",
      setValue: mockSetState,
      operation: "+",
      setOperation: mockSetState,
    };
    const { resetCalculator } = useCalculator(props);
    resetCalculator();
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenNthCalledWith(1, "0");
    expect(mockSetState).toHaveBeenNthCalledWith(2, "");
  });

  it("deleteValue delete the last element if the last digit is different to 0", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "123",
      setValue: mockSetState,
      operation: "+",
      setOperation: mockSetState,
    };
    const { deleteValue } = useCalculator(props);
    deleteValue();
    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith("12");
  });

  it("deleteValue reset the values if the value is 0", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "0",
      setValue: mockSetState,
      operation: "+",
      setOperation: mockSetState,
    };
    const { deleteValue } = useCalculator(props);
    deleteValue();
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenNthCalledWith(1, "0");
    expect(mockSetState).toHaveBeenNthCalledWith(2, "");
  });

  it("inputNumber works correctly", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "0",
      setValue: mockSetState,
      operation: "",
      setOperation: mockSetState,
    };
    const { inputNumber } = useCalculator(props);
    inputNumber(1);
    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith("1");
  });

  it("Calculate the result correctly", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "2+2",
      setValue: mockSetState,
      operation: "",
      setOperation: mockSetState,
    };
    const { calculate } = useCalculator(props);
    calculate();
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenCalledWith("4");
  });

  it("should call ToastAndroid.show when calculate throws an error", () => {
    const setValue = jest.fn();
    setValue.mockClear();
    setValue.mockImplementation(() => {
      throw new Error();
    });
    const props = {
      value: "0",
      setValue,
      operation: "+",
      setOperation: jest.fn(),
    };
    const { calculate } = useCalculator(props);
    calculate();
    expect(ToastAndroid.show).toHaveBeenCalledWith(
      "Invalid format used.",
      ToastAndroid.SHORT
    );
  });

  it("inputOperation works correctly", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "10",
      setValue: mockSetState,
      operation: "",
      setOperation: mockSetState,
    };
    const { inputOperator } = useCalculator(props);
    inputOperator("+");
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenNthCalledWith(1, "10+");
  });

  it("should call setValue with 0 when inputNumber with C is called", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "0",
      setValue: mockSetState,
      operation: "",
      setOperation: mockSetState,
    };
    const { inputNumber } = useCalculator(props);
    inputNumber("C");
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenNthCalledWith(1, "0");
  });

  it("should call setValue with concat when inputNumber has a value", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "5",
      setValue: mockSetState,
      operation: "",
      setOperation: mockSetState,
    };
    const { inputNumber } = useCalculator(props);
    inputNumber("5");
    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenNthCalledWith(1, "55");
  });

  it("should call setValue with correct value when deleteValue is called", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "0",
      setValue: mockSetState,
      operation: "",
      setOperation: mockSetState,
    };
    const { inputNumber, deleteValue } = useCalculator(props);
    mockSetState.mockClear();
    inputNumber("5");
    deleteValue();
    expect(mockSetState).toHaveBeenCalledWith("0");
  });

  it("Calculate works correctly inside inputOperator", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "20+30",
      setValue: mockSetState,
      operation: "=",
      setOperation: mockSetState,
    };
    const { inputOperator } = useCalculator(props);
    inputOperator("=");
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenCalledWith("50");
  });

  it("Should validate if the last element is a number to add another operator", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "5",
      setValue: mockSetState,
      operation: "+",
      setOperation: mockSetState,
    };
    const { inputOperator } = useCalculator(props);
    inputOperator("+");
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenCalledWith("5+");
  });

  it("Should validate if is a square to concat with the operator", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "5+",
      setValue: mockSetState,
      operation: "+",
      setOperation: mockSetState,
    };
    const { inputOperator } = useCalculator(props);
    inputOperator("√");
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenCalledWith("5+√");
  });

  it("Should validate if isn't a square to change last operator by new operator", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "5+",
      setValue: mockSetState,
      operation: "+",
      setOperation: mockSetState,
    };
    const { inputOperator } = useCalculator(props);
    inputOperator("-");
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenCalledWith("5-");
  });

  it("Should validate if is a square to add instead 0 when isn't operation", () => {
    const mockSetState = jest.fn();
    const props = {
      value: "0",
      setValue: mockSetState,
      operation: "",
      setOperation: mockSetState,
    };
    const { inputOperator } = useCalculator(props);
    inputOperator("√");
    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockSetState).toHaveBeenCalledWith("√");
  });
});
