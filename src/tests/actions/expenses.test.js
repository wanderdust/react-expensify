import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { 
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense,
    startEditExpense
} from "../../actions/expenses";

import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const uid = "this_is_my_test_uid";
const defaultAuthState = { auth: {uid} };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }; 
    });

    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
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
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("should add expense with defaults to database and store", () => {
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaults);
        done();
    }).catch((e) => new Error(e));
});

test("should fetch the expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        done();
    });
});

test("should remove expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const expensesTest = [
        expenses[0],
        expenses[2]
    ];

    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            expenseId: id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test("should edit an expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {
        description: "this is an update from the test suite!"
    }

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_EXPENSE",
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val().description).toBe(updates.description);
        done();
    });
});