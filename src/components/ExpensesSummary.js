import React from "react";
import { connect } from "react-redux";
import selectExpenses from "./../selectors/expenses";
import selectExpensesTotal from "./../selectors/expenses-total";
import numeral from "numeral";

export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount > 1 ? "expenses" : "expense";
    const formattedExpensesTotal = numeral(expensesTotal / 100).format("$0,0.00");
    return (
        <div>
            <h1>You have {expensesCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters);
    const expensesTotal = selectExpensesTotal(expenses);
    return {
        expensesCount: expenses.length,
        expensesTotal
    };
};

export default connect(mapStateToProps)(ExpensesSummary);