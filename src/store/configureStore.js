import {createStore, combineReducers} from "redux";
import expensesReducer from "./../reducers/expenses";
import filtersReducer from "./../reducers/filters";

/*
* Store creation.
* We export it in a function so when we import it it gets called right away
* and it is ready to use.
*/
export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}