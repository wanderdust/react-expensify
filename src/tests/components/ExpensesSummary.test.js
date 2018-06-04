import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

let testProps;

beforeEach(() => {
    testProps = {
        expensesCount: 9,
        expensesTotal: 123456
    }
});

test("should render ExpenseSummary correctly", () => {
    const wrapper = shallow(<ExpensesSummary {...testProps} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpesesSummary text when we have multiple expenses", () => {
    const wrapper = shallow(<ExpensesSummary {...testProps} />);
    const text = wrapper.find("h1").at(0).text();
    expect(text).toBe("You have 9 expenses totalling $1,234.56");
    expect(wrapper).toMatchSnapshot();  
});

test("should render ExpesesSummary text when 1 expense", () => {
    const wrapper = shallow(
        <ExpensesSummary 
            expensesCount={1}
            expensesTotal={1000}
        />
    );
    const text = wrapper.find("h1").at(0).text();
    expect(text).toBe("You have 1 expense totalling $10.00");  
    expect(wrapper).toMatchSnapshot();
});