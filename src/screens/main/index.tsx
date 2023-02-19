import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as math from "mathjs";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import ButtonCalculator from "../../components/button";
import styles from "../../App.styles";
import useCalculator from "../../hooks/useCalculator";

/**
 * Main screen Calculator
 * @date 1/29/2023 - 4:45:34 PM
 *
 * @returns {React.ReactNode}
 */

const Calculator = () => {
  const [value, setValue] = useState("0");
  const [operation, setOperation] = useState("");
  const { deleteValue, inputNumber, inputOperator } = useCalculator({
    value,
    setValue,
    operation,
    setOperation,
  });
  return (
    <LinearGradient
      colors={["#222", "#333"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.wrapper}
    >
      <StatusBar style="light" />
      <View style={styles.calculator}>
        <View style={styles.screen}>
          <Text style={styles.screenButtonText}>{value}</Text>
        </View>
        <LinearGradient
          colors={["#444", "#444"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttons}
        >
          <View style={styles.numbers}>
            <View style={styles.rowNumbers}>
              <ButtonCalculator onPress={deleteValue}>
                <FontAwesome name="times-circle" size={16} color="white" />
              </ButtonCalculator>
              <ButtonCalculator onPress={inputOperator}>%</ButtonCalculator>
              <ButtonCalculator onPress={inputOperator}>√</ButtonCalculator>
            </View>
            <View style={styles.rowNumbers}>
              <ButtonCalculator onPress={inputNumber}>9</ButtonCalculator>
              <ButtonCalculator onPress={inputNumber}>8</ButtonCalculator>
              <ButtonCalculator onPress={inputNumber}>7</ButtonCalculator>
            </View>
            <View style={styles.rowNumbers}>
              <ButtonCalculator onPress={inputNumber}>6</ButtonCalculator>
              <ButtonCalculator onPress={inputNumber}>5</ButtonCalculator>
              <ButtonCalculator onPress={inputNumber}>4</ButtonCalculator>
            </View>
            <View style={styles.rowNumbers}>
              <ButtonCalculator onPress={inputNumber}>3</ButtonCalculator>
              <ButtonCalculator onPress={inputNumber}>2</ButtonCalculator>
              <ButtonCalculator onPress={inputNumber}>1</ButtonCalculator>
            </View>
            <View style={styles.rowNumbers}>
              <ButtonCalculator onPress={inputNumber}>C</ButtonCalculator>
              <ButtonCalculator onPress={inputNumber}>.</ButtonCalculator>
              <ButtonCalculator onPress={inputNumber}>0</ButtonCalculator>
            </View>
          </View>
          <View style={styles.operators}>
            <ButtonCalculator operator onPress={inputOperator}>
              ÷
            </ButtonCalculator>
            <ButtonCalculator operator onPress={inputOperator}>
              x
            </ButtonCalculator>
            <ButtonCalculator operator onPress={inputOperator}>
              -
            </ButtonCalculator>
            <ButtonCalculator operator onPress={inputOperator}>
              +
            </ButtonCalculator>
            <ButtonCalculator operator onPress={inputOperator}>
              =
            </ButtonCalculator>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default Calculator;
