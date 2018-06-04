import moment from "moment";
import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
    const state = expensesReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});

test("should remove expense by id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        expenseId: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        expenses[0],
        expenses[2]
    ]);
});

test("should not remove expense if id not found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        expenseId: -1
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test("should add an expense", () => {
    const expense = {
        id: "4",
        description: "Test",
        note: "",
        amount: 3000,
        createdAt: moment(0).subtract(10, "days").valueOf()
    };
    const action = {
        type: "ADD_EXPENSE",
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense", () => {
    const updates = {
        description: "This is an updated description!",
        amount: 123456
    };
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[0].id,
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[0]).toEqual({...state[0], ...updates});
});

test("should not edit and expense if expense not found", () => {
    const updates = {
        description: "This is an updated description!",
        amount: 123456
    };
    const action = {
        type: "EDIT_EXPENSE",
        id: "some_non_existing_id",
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});