import uuid from "uuid";

//ADD EXPENSE
export const addExpense = (
    { 
        description = "",
        note = "",
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE EXPENSE
export const removeExpense = ({id: expenseId} = {}) => ({
    type: "REMOVE_EXPENSE",
    expenseId
});

//EDIT EXPENSE
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});