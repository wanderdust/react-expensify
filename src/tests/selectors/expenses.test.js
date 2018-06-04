import selectExpenses from "../../selectors/expenses";
import { findLocalNegativePatterns } from "fast-glob/out/managers/tasks";
import moment from "moment";
import expenses from "../fixtures/expenses";

const defaultFilters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
};

test("should filter by text value", () => {
    const filters = {
        ...defaultFilters,
        text: "e"
    }
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[1]
    ]);
});

test("should filter by start date", () => {
    const filters = {
        ...defaultFilters,
        startDate: moment(0)
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[0]
    ]);
});

test("should filter by end date", () => {
    const filters = {
        ...defaultFilters,
        endDate: moment(0)
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[0],
        expenses[1]
    ]);
});

test("should show only expenses within start date and end date", () => {
    const filters = {
        ...defaultFilters,
        startDate: moment(0).subtract(10, "days"),
        endDate: moment(0).add(1, "days")
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[0],
        expenses[1]
    ]);
});

test("should sort by date", () => {
    const filters = {
        ...defaultFilters
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[0],
        expenses[1]
    ]);
});

test("should sort by amount", () => {
    const filters = {
        ...defaultFilters,
        sortBy: "amount"
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[1],
        expenses[0]
    ]);
});