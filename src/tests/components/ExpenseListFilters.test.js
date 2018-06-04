import React from "react";
import { shallow } from "enzyme";
import { expenseListFilters, ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import { DateRangePicker } from "react-dates";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
        />
    );
});

test("should render expenseListFilters correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should render expenseListFilters with alt data correctly", () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
    const value = "a";
    wrapper.find("input").at(0).simulate("change", {
        target: { value }
    });
    expect(setTextFilter).toHaveBeenCalledWith(value);
});

test("shold handle on dates change", () => {
    wrapper.find(DateRangePicker).prop("onDatesChange")({
        startDate: altFilters.startDate,
        endDate: altFilters.endDate
    });
    expect(setStartDate).toHaveBeenCalledWith(altFilters.startDate);
    expect(setEndDate).toHaveBeenCalledWith(altFilters.endDate);
});

test("should handle on calendar Focus change", () => {
    const focus = "endDate";
    wrapper.find(DateRangePicker).prop("onFocusChange")(focus);
    expect(wrapper.state("calendarFocused")).toBe(focus);
});

test("should handle on sort change", () => {
    const value = altFilters.sortBy;
    wrapper.find("select").simulate("change", {
        target: { value }
    });
    wrapper.setProps({ filters })
    expect(sortByAmount).toHaveBeenCalled();
    expect(sortByAmount).toHaveBeenCalled();
});