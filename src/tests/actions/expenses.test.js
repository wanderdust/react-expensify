import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should set up remove expense action object", () => {
    const action = removeExpense({ id: "123abc"});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        expenseId: "123abc"
    });
});

test("should set up an edit expense action", () => {
    const action = editExpense("123abc", {
        description: "test",
        amount: 100
    });
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123abc",
        updates: {
            description: "test",
            amount: 100
        }
    });
});

describe("Should set up valid addExpense actions", () => {
    test("should set up an addExpense action with custom parameters", () => {
        const expenseData = {
            description: "test",
            note: "note",
            amount: 123,
            createdAt: 1000
        };
        const action = addExpense(expenseData);
        expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                ...expenseData,
                id: expect.any(String)
            }
        });
    });

    test("should set up an addExpense action with default values", () => {
        const defaultData = {
            description: "",
            note: "",
            amount: 0,
            createdAt: 0
        }
        const action = addExpense();
        expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                ...defaultData,
                id: expect.any(String)
            }
        });
    });
});