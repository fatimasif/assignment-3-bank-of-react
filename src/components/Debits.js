/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
// import {Link} from 'react-router-dom';

// const Debits = (props) => {
//   // Create the list of Debit items
//   let debitsView = () => {
//     const { debits } = props;
//     return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
//       let date = debit.date.slice(0,10);
//       return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
//     });
//   }
//   // Render the list of Debit items and a form to input new Debit item
//   return (
//     <div>
//       <h1>Debits</h1>

//       {debitsView()}

//       <form onSubmit={props.addDebit}>
//         <input type="text" name="description" />
//         <input type="number" name="amount" />
//         <button type="submit">Add Debit</button>
//       </form>
//       <br/>
//       <Link to="/">Return to Home</Link>
//     </div>
//   );
// }

// export default Debits;

import React, { useState } from 'react';
import AccountBalance from './AccountBalance';
import './Debits.css';

const Debits = ({ debits, accountBalance, addDebit }) => {
  // State for description and amount inputs
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Event handler for input field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description') setDescription(value);
    else if (name === 'amount') setAmount(value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 10);
    const debit = { description, amount, date };
    addDebit(debit);
    // Resetting input fields
    setDescription('');
    setAmount('');
  };

  // Render debit history list
  const renderDebits = () => {
    return debits.slice().reverse().map((debit) => (
      <li key={debit.id} className="debit-item">
        <div className="debit-info">
          <div className="debit-amount">{debit.amount}</div>
          <div className="debit-description">{debit.description}</div>
          <div className="debit-date">{debit.date.slice(0, 10)}</div>
        </div>
      </li>
    ));
  };

  return (
    <div className="debits">
      <div className="debit-content">
        {/* Left section: Debit History */}
        <div className="debit-content-left">
          <h1>Debit History</h1>
          <ul className="debit-list">{renderDebits()}</ul>
        </div>

        {/* Right section: Account Balance and Add Debit Form */}
        <div className="debit-content-right">
          <h1 className="account-balance">
            <AccountBalance accountBalance={accountBalance} />
          </h1>
          {/* Add Debit Form */}
          <form onSubmit={handleSubmit} className="debit-form">
            <div className="form-row">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={handleFieldChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                onChange={handleFieldChange}
                className="form-input"
                required
                min="0.01"
                step="0.01"
              />
            </div>
            <button type="submit" className="form-button">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Debits;
