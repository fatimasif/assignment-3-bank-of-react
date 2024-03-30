/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/

import React, { useState } from 'react';
import AccountBalance from './AccountBalance';
import './Credits.css';

const Credits = ({ credits, accountBalance, addCredit }) => {
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
    const credit = { description, amount, date };
    addCredit(credit);
    // Resetting input fields
    setDescription('');
    setAmount('');
  };

  // Render credit history list
  const renderCredits = () => {
    return credits.slice().reverse().map((credit) => (
      <li key={credit.id} className="credit-item">
        <div className="credit-info">
          <div className="credit-amount">{credit.amount}</div>
          <div className="credit-description">{credit.description}</div>
          <div className="credit-date">{credit.date.slice(0, 10)}</div>
        </div>
      </li>
    ));
  };

  return (
    <div className="credits">
      <div className="credit-content">
        {/* Left section: Credit History */}
        <div className="credit-content-left">
          <h1>Credit History</h1>
          <ul className="credit-list">{renderCredits()}</ul>
        </div>

        {/* Right section: Account Balance and Add Credit Form */}
        <div className="credit-content-right">
          <h1 className="account-balance">
            <AccountBalance accountBalance={accountBalance} />
          </h1>
          {/* Add Credit Form */}
          <form onSubmit={handleSubmit} className="credit-form">
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

export default Credits;
