import uuid from "uuid";
import database from "../firebase/firebase";

//ADD EXPENSE
export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense
});

// ASYNC ADD EXPENSE
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = "",
            note = "",
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database.ref("expenses").push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE EXPENSE
export const removeExpense = ({id: expenseId} = {}) => ({
    type: "REMOVE_EXPENSE",
    expenseId
});

//ASYNC REMOVE EXPENSE
export const startRemoveExpense = ({id} = {}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then((ref) => {
            dispatch(removeExpense({id}))
        });
    };
};

//EDIT EXPENSE
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

//SET EXPENSES
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
});

//ASYNC SET EXPENSES
export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref("expenses").once("value").then((snapshot) => {
            const expenses = [];

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    }
};