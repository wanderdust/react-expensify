import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            expense={expenses[0]}
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
        />);
});

test("should render edit expense page correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit correctly", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
    expect(startEditExpense).toHaveBeenCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenCalledWith("/");
});

test("should handle onRemove correctly", () => {
    wrapper.find("button").simulate("click");
    expect(startRemoveExpense).toHaveBeenCalledWith({id: expenses[0].id});
    expect(history.push).toHaveBeenCalledWith("/");
});