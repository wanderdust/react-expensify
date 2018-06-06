import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push("/");
    };
    handleOnRemove = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push("/");
     };
    render () {
        return (
            <div>
            <ExpenseForm
                expense={this.props.expense}
                onSubmit={this.onSubmit}
            />  
            <button onClick={this.handleOnRemove}>Remove</button>
        </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
};

const mapDispatchToProps = (dispatch) => ({
    editExpense: (expense) => dispatch(editExpense(expense.id, expense)),
    startRemoveExpense: ({id}) => dispatch(startRemoveExpense({id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);