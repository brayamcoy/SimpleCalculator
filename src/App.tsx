import React from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./App.styles";
import Calculator from "./screens/main";

const App = () => {
  return (
    <LinearGradient
      colors={["#222", "#333"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.wrapper}
    >
      <StatusBar style="auto" />
      <Calculator />
    </LinearGradient>
  );
};

export default App;
