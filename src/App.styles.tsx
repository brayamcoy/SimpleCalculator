import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  calculator: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
    marginHorizontal: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  screen: {
    backgroundColor: "#FFF",
    paddingHorizontal: 28,
    paddingVertical: 15,
    height: 79,
    display: "flex",
    flexDirection: "row-reverse",
    overflow: "hidden",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
  },
  rowNumbers: {
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-between",
  },
  numbers: {
    display: "flex",
    flexDirection: "column",
    width: "73%",
    padding: 10,
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  operators: {
    justifyContent: "space-between",
    backgroundColor: "#F88934",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    padding: 35,
    borderRadius: 5,
  },
  buttonHovered: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonTextOperator: {
    fontSize: 22,
    color: "#FFF",
  },
  screenButtonText: {
    color: "#333",
    fontSize: 29,
  },
});
export default styles;
