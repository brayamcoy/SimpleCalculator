import React, { useState } from "react";
import { Text, Pressable } from "react-native";
import styles from "../../App.styles";

export interface ButtonProps {
  children: React.ReactNode;
  operator?: Boolean;
  onPress: (children: React.ReactNode) => void;
}

/**
 * Description: Button component for each number and operator of the calculator
 * @date 1/29/2023 - 4:41:56 PM
 *
 * @param {ButtonProps} {
  children,
  operator = false,
  onPress,
}
 * @returns {React.ReactNode}
 */

const ButtonCalculator = ({
  children,
  operator = false,
  onPress,
}: ButtonProps)=> {
  const initialStateHover = {
    status: false,
    button: "",
  };

  const [isHovered, setIsHovered] = useState(initialStateHover);
  const hover = isHovered.status && isHovered.button === String(children);
  const textStyles = !operator ? styles.buttonText : styles.buttonTextOperator;
  const handleHover = (status: Boolean) => {
    if (!status) return setIsHovered(initialStateHover);
    return setIsHovered({
      status: true,
      button: String(children),
    });
  };
  return (
    <Pressable
      style={[styles.button, hover && styles.buttonHovered]}
      onLongPress={() => {
        onPress(children);
        handleHover(true);
      }}
      onPress={() => {
        onPress(children);
      }}
      onPressIn={()=>{
        handleHover(true);
      }}
      onPressOut={() => {
        handleHover(false);
      }}
    >
      <Text style={textStyles}>{children}</Text>
    </Pressable>
  );
};

export default ButtonCalculator;
