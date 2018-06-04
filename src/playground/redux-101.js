import {createStore} from "redux";

//Destructuring in functions example:
const add = ({a: foo = 1, b: bar = 1}) => (foo + bar);
console.log(add({a:6, b:12}));

//Action generators.

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: "INCREMENT",
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: "DECREMENT",
    decrementBy
});

const resetCount = () => ({
    type: "RESET",
    resetTo: 0
});

const setCount = ({setCount}) => ({
    type: "SET",
    setCount
});

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };
        case "RESET":
            return {
                count: action.resetTo
            }
        case "SET":
            return {
                count: action.setCount
            }
        default: 
            return state
    }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//Increment the count.
store.dispatch(incrementCount({ incrementBy: 5 }))
store.dispatch(incrementCount());

//Reset
store.dispatch(resetCount());

//Decrease it
store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 10}));

//Set
store.dispatch(setCount({ setCount: 101 }));