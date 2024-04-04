/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  async componentDidMount() {
    try {
      // Fetch credit and debit data 
      const [creditsResponse, debitsResponse] = await Promise.all([
        fetch('https://johnnylaicode.github.io/api/credits.json'),
        fetch('https://johnnylaicode.github.io/api/debits.json')
      ]);
  
      // Convert responses to JSON
      const [creditsData, debitsData] = await Promise.all([
        creditsResponse.json(),
        debitsResponse.json()
      ]);
  
      // Calculate total credits and debits using reduce
      const totalCredits = creditsData.reduce((total, credit) => total + credit.amount, 0);
      const totalDebits = debitsData.reduce((total, debit) => total + debit.amount, 0);
  
      // Update state with credit and debit data and calculate account balance
      this.setState({
        creditList: creditsData,
        debitList: debitsData,
        accountBalance: totalCredits - totalDebits
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
    // Adding a new credit and updating the account balance
    addCredit = (credit) => {
      const newCredits = [...this.state.creditList, credit];
      this.setState({
        creditList: newCredits,
        accountBalance: this.state.accountBalance + Number(credit.amount),
      });
    };

  // Adding a new debit and updating the account balance
  addDebit = (debit) => {
    const newDebits = [...this.state.debitList, debit];
    this.setState({
      debitList: newDebits,
      accountBalance: this.state.accountBalance - Number(debit.amount),
    });
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit = {this.addCredit} accountBalance = {this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit = {this.addDebit} accountBalance = {this.state.accountBalance} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="assignment-3-bank-of-react">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;