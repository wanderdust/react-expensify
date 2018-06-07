import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectExpenses from "./../selectors/expenses";
import selectExpensesTotal from "./../selectors/expenses-total";
import numeral from "numeral";

export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount !== 1 ? "expenses" : "expense";
    const formattedExpensesTotal = numeral(expensesTotal / 100).format("$0,0.00");
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">You have <span>{expensesCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
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