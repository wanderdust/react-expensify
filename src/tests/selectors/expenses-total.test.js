import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

describe("should add the amount of the expenses", () => {

    test("should return 0 if no expenses added", () => {
        expect(selectExpensesTotal([])).toBe(0);
    });

    test("should return the amount of the 1 expense", () => {
        const oneItemExpense = [expenses[2]];
        expect(selectExpensesTotal(oneItemExpense)).toBe(expenses[2].amount);
    });

    test("should return the sum amount of all the expenses", () => {
        const sum = expenses[0].amount + expenses[1].amount + expenses[2].amount;
        expect(selectExpensesTotal(expenses)).toBe(sum);
    });
});
