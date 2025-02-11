import { helloWorld } from "./testFunction";

it("出力のテスト", () => {
    expect(helloWorld()).toBe("Hello World!");
});
