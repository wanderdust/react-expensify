import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }; 
    });

    database.ref("expenses").set(expensesData).then(() => done());
});

test("should setup set expense action object with data", () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: "SET_EXPENSES",
        expenses
    })
});

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

test("should set up an addExpense action with custom parameters", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

test("should add expense to database and store", (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: "mouse",
        amount: 2000,
        note: "",
        createdAt: 100
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("should add expense with defaults to database and store", () => {
    const store = createMockStore({});
    const defaults = {
        description: "",
        note: "",
        amount: 0,
        createdAt: 0
    };
    
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...defaults
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaults);
        done();
    }).catch((e) => new Error(e));
});

test("should fetch the expenses from firebase", (done) => {
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        done();
    });
});