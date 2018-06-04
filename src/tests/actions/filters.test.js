import moment from "moment";
import {
    setEndDate,
    setStartDate,
    sortByAmount,
    sortByDate,
    setTextFilter
} from "../../actions/filters";

test("should generate setStartDate action object", () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: "SET_START_DATE",
        startDate: moment(0)
    });
});

test("should generate setEndDate action object", () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: "SET_END_DATE",
        endDate: moment(0)
    })
});

describe("Should create valid setTextFilter action", () => {

    test("Should generate setTextFilter action with passed parameters", () => {
        const textFilter = "some crazy text!";
        const action = setTextFilter(textFilter);
        expect(action).toEqual({
            type: "SET_TEXT_FILTER",
            textFilter
        });
    });

    test("Should generate setTextFilter action with default values", () => {
        const action = setTextFilter();
        expect(action).toEqual({
            type: "SET_TEXT_FILTER",
            textFilter: ""
        });
    });
});

test("should generate a sortByAmount action object", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE"
    });
});

test("should generate a sortByAmount action object", () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: "SORT_BY_AMOUNT"
    })
});
