import React from "react";
import { Link } from "react-router-dom"

export const ExpenseListItem = ({ description, createdAt, amount, id }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>Created at: {createdAt}, amount: {amount}</p>
    </div>
);



export default ExpenseListItem;