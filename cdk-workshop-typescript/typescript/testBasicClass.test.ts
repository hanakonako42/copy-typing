import { Person } from "./testBasicClass";

it("Personクラスのテスト", () => {
    const taro = new Person("AWS", "太郎");
    expect(taro.firstName).toEqual("AWS");
    expect(taro.lastName).toEqual("太郎");
    expect(taro.greet()).toEqual("私はAWS 太郎です。");
});