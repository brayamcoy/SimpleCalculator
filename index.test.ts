import { registerRootComponent } from "expo";
import App from "./src/App";

jest.mock("expo", () => ({
  registerRootComponent: jest.fn(),
}));

describe("App entry point", () => {
  it("registers the root component", () => {
    expect(registerRootComponent).toHaveBeenCalledTimes(0);
    require("./index.ts");
    expect(registerRootComponent).toHaveBeenCalledTimes(1);
    expect(registerRootComponent).toHaveBeenCalledWith(App);
  });
});
