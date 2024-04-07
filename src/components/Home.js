/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        {/* NAV BAR */}
        <nav>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fas fa-bars"></i>
          </label>
          <label className="logo">Bank of React</label>
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/userProfile">User Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/credits">Credits</Link></li>
            <li><Link to="/debits">Debits</Link></li>
          </ul>
        </nav>
        {/* END NAV BAR */}

        <h1>Welcome to the Bank of React!</h1>
        <AccountBalance accountBalance={this.props.accountBalance}/>
      </div>
    );
  }
}

export default Home;