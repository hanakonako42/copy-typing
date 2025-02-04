import { helloWorld } from "./testFuncstion";

it("出力のテスト", () => {
    expect(helloWorld()).toBe("Hello World!");
});
