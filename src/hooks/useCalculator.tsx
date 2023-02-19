import { ToastAndroid } from "react-native";
import React from "react";
import * as math from "mathjs";

export interface useCalculatorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  operation: string;
  setOperation: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * useCalculator.tsx
 * Use Calculator hooks logic for the calculator
 * @date 1/31/2023 - 8:10:14 AM
 *
 * @param {useCalculatorProps} { value, setValue, operation, setOperation }
 * @returns {{ deleteValue: () => React.SetStateAction<string>=void; inputNumber: (number: React.ReactNode) => React.SetStateAction<string>=void;
 *  inputOperator: (operator: React.ReactNode) => void; }}
 */

const useCalculator = ({
  value,
  setValue,
  operation,
  setOperation,
}: useCalculatorProps) => {
  const operations = ["÷", "x", "-", "+", "%", "√"];

  /**
   * showToast()
   * Description: is a function that shows a native toast when the operator is incorrect
   * @date 1/29/2023 - 4:52:37 PM
   *
   * @param {string} message
   * @returns {ToastAndroid}
   */

  const showToast = (message: string) =>
    ToastAndroid.show(message, ToastAndroid.SHORT);

  /**
   * resetCalculator()
   * Description: This function reset the calculator values
   * @date 1/29/2023 - 4:53:38 PM
   *
   * @returns {void}
   */

  const resetCalculator = () => {
    setValue("0");
    setOperation("");
  };

  /**
   * deleteValue()
   * Description: This function delete the last value of the string value variable
   *  and reset the calculator when the value is 0
   * @date 1/29/2023 - 4:53:38 PM
   *
   * @returns {React.SetStateAction<string>=void}
   */

  const deleteValue = () => {
    const str = value.substring(0, value.length - 1);
    if (str === "0" || str.trim() === "") return resetCalculator();
    return setValue(str);
  };

  /**
   * inputNumber()
   * Description: This function set the calculator value when you make click on
   * the button
   * @date 1/29/2023 - 4:53:38 PM
   * @param {number} React.ReactNode
   * @returns {React.SetStateAction<string>=void}
   */

  const inputNumber = (number: React.ReactNode) => {
    const numberParsed = String(number);
    switch (numberParsed) {
      case "C":
        return resetCalculator();
      default: {
        if (value === "0") return setValue(numberParsed);
        else return setValue(`${value}${numberParsed}`);
      }
    }
  };

  /**
   * calculate()
   * Description: This function calculate the string operation with math.js library
   * but first replace the operators into another format supported by the library.
   * the button
   * @date 1/29/2023 - 4:53:38 PM
   *
   * @returns {void}
   */

  const calculate = () => {
    try {
      // Replace operators strings into another format supported by math.js (*, /, sqrt)
      const replacedValue = value
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/√(\d+)/g, "sqrt($1)");
      // Evalute the operation
      const result = math.evaluate(replacedValue);
      // Parse into a string
      const resultParsed = String(result);
      // Set result
      setValue(resultParsed);
      setOperation("");
    } catch {
      showToast("Invalid format used.");
    }
  };

  /**
   * inputNumber()
   * Description: This function set the calculator value when you make click on
   * the button
   * @date 1/29/2023 - 4:53:38 PM
   *
   * @param {operator} React.ReactNode
   * @returns {void}
   */

  const inputOperator = (operator: React.ReactNode) => {
    const operatorParsed = String(operator);
    if (operations.includes(operatorParsed)) {
      let tmpValue = "";
      if (operation) {
        //Validate if the last element is a number to add another operator
        if (!isNaN(parseInt(value[value.length - 1]))) {
          tmpValue = `${value}${operatorParsed}`;
        } else {
          // Validate if is a square to concat with the operator
          if (operatorParsed === "√") {
            tmpValue = `${value}${operatorParsed}`;
          } else {
            // Change last operator by new operator
            let str = value.substring(0, value.length - 1);
            tmpValue = `${str}${operatorParsed}`;
          }
        }
      } else {
        // Validate if is a square to add instead 0
        if (value === "0" && operatorParsed === "√") {
          tmpValue = operatorParsed;
        } else {
          // Concat value calculator with operator
          tmpValue = `${value}${operatorParsed}`;
        }
      }
      // Set values
      setValue(tmpValue);
      setOperation(operatorParsed);
    }
    if (operatorParsed === "=") {
      // calculate
      calculate();
    }
  };

  return {
    deleteValue,
    inputNumber,
    inputOperator,
    resetCalculator,
    calculate,
  };
};

export default useCalculator;
