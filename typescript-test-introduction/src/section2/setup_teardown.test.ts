// beforeEach: 各テスト(it)の前に実行される
// afterEach: 各テスト(it)の前に実行される

// beforeAll: グループ内のすべてのテストもしくはファイル内のすべてのテストの前に1度だけ実行される
// afterAll: グループ内のすべてのテストもしくはファイル内のすべてのテストの後に１度だけ実行される

describe("outer describe block", () => {
    beforeAll(() => {
        console.log("outer beforeAll");
    });

    afterAll(() => {
        console.log("outer afterAll");
    });

    beforeEach(() => {
        console.log("outer beforeEach");
    });

    afterEach(() => {
        console.log("outer afterEach");
    });

    it("outer test 1", () => {
        console.log("outer test 2");
    });

    it("outer test 2", () => {
        console.log("outer test 2");
    });

    describe("inner describe block", () => {
        beforeAll(() => {
            console.log("inner beforeAll");
        });

        afterAll(() => {
            console.log("inner afterAll");
        });

        beforeEach
    })
});

