import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import { SingleDatePicker } from "react-dates"

describe("should render Expense form correctly", () => {

    test("should render expense form without data passed", () => {
        const wrapper = shallow(<ExpenseForm />);
        expect(wrapper).toMatchSnapshot();
    });

    test("should render expense form with passed props", () => {
        const wrapper = shallow(<ExpenseForm  expense={expenses[2]}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test("should render an error for invalid form submission", () => {
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find("form").simulate("submit", {
            preventDefault: () => {}
        });
        expect(wrapper.state("errorMessage").length).toBeGreaterThan(0);
        expect(wrapper).toMatchSnapshot();
    });

    test("should set description on input change", () => {
        const text = "Some crazy description!";
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find("input").at(0).simulate("change", {
            target: {value: text}
        });
        expect(wrapper.state("description")).toBe(text);
        expect(wrapper).toMatchSnapshot();
    });

    test("should set note on input change", () => {
        const value = "Some crazy note!";
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find("textarea").simulate("change", {
            target: { value }
        });
        expect(wrapper.state("note")).toBe(value);
        expect(wrapper).toMatchSnapshot();
    });

    test("should set amount on input change", () => {
        const value = "20000.33";
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find("input").at(1).simulate("change", {
            target: { value }
        });
        expect(wrapper.state("amount")).toBe(value);
        expect(wrapper).toMatchSnapshot();
    });

    test("should NOT set amount on invalid input change", () => {
        const value = "800.3654";
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find("input").at(1).simulate("change", {
            target: { value }
        });
        expect(wrapper.state("amount")).toBe("");
        expect(wrapper).toMatchSnapshot();
    });

    test("should call onSubmit prop for valid form submission", () => {
        const onSubmitSpy = jest.fn();
        const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
        wrapper.find("form").simulate("submit", {
            preventDefault: () => {}
        });
        expect(wrapper.state("errorMessage")).toBe("");
        expect(onSubmitSpy).toHaveBeenLastCalledWith({
            description: expenses[0].description,
            amount: expenses[0].amount,
            note: expenses[0].note,
            createdAt: expenses[0].createdAt
        });
    });

    test("should set new date on date change", () => {
        const now = moment();
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find(SingleDatePicker).prop("onDateChange")(now);
        expect(wrapper.state("createdAt")).toEqual(now);
    });

    test("should set calendar focused on change", () => {
        const focused = true;
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find(SingleDatePicker).prop("onFocusChange")({focused});
        expect(wrapper.state("calendarFocused")).toBe(focused);
    });
});