import { Teacher } from "./basicClassInheritance";

it("継承を使ったTeacherクラスのテスト", () => {
    const taro = new Teacher("国語");
    expect(taro.greet()).toBe("私はAWS 太郎です。国語の先生をやっています。")
});