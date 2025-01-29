// toThrow：エラーに関するテストはexpectの引数にしている際、無名関数を使う

import { divide, ZeroDivisorError} from "./divide";

it("0で割るとエラーが発生する", () => {
    expect(() => divide(10, 0)).toThrow();
    expect(() => divide(10, 0)).toThrow("0で割ることはできません");
    expect(() => divide(10, 0)).toThrow(ZeroDivisorError);
});
