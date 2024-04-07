/*==================================================
src/components/UserProfile.js

The UserProfile component is used to demonstrate the use of Route and Link.
Note: You don't need to work on this file for the Assignment.
==================================================*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './UserProfile.css';

class UserProfile extends Component {
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
        <h1>User Profile</h1>

        <div>Username: {this.props.userName}</div>
        <div>Member Since: {this.props.memberSince}</div>
        <br/>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default UserProfile;