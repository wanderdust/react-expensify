import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            expense={expenses[0]}
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history}
        />);
});

test("should render edit expense page correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit correctly", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
    expect(editExpense).toHaveBeenCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenCalledWith("/");
});

test("should handle onRemove correctly", () => {
    wrapper.find("button").simulate("click");
    expect(removeExpense).toHaveBeenCalledWith({id: expenses[0].id});
    expect(history.push).toHaveBeenCalledWith("/");
});