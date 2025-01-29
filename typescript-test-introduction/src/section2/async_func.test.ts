import { delay } from "./async_func";

it("delayが指定された時間後にメッセージを返す", async () => {
    const result = await delay("Hello Jest", 1000);
    expect(result).toBe("Hello Jest");
});

it("timeがマイナスの場合はエラーが発生する", async () => {
    try {
        const result = await delay("Hello Jest", -1);
    } catch(e: any) {
        expect(e.message).toBe("timeは0以上で指定してください");
    }
});

