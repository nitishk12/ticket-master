import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Register from './components/users/Register'
import Login from './components/users/Login'

import List from './components/customers/List'
import CustomerNew from './components/customers/CustomerNew'
import CustomerShow from './components/customers/CustomerShow'
import CustomerEdit from './components/customers/CustomerEdit'

import DepartmentList from './components/departments/DepartmentList'

import EmployeeList from './components/employees/EmployeeList'
import EmpNew from './components/employees/EmpNew'
import EmpShow from './components/employees/EmpShow'

import TicketList from './components/tickets/TicketList'
import TicketNew from './components/tickets/TicketNew'
import TicketShow from './components/tickets/TicketShow'
// import Navigation from './components/Navigation'



function App(props) {
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/account/login'
    // props.history.push('/account/login')
  }
  return (
    <div>
      <BrowserRouter>
        {
          localStorage.getItem('authToken') ?
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
              <a className="navbar-brand" href="/">TICKET MASTER</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link to="/home" className="nav-link">HOME</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/customers" className="nav-link">CUSTOMERS</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/departments" className="nav-link">DEPARTMENTS</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/employees" className="nav-link">EMPLOYEES</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/tickets" className="nav-link">TICKETS</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/home" className="nav-link" onClick={handleLogout}>LOGOUT</Link>
                  </li>
                </ul>
              </div>
            </nav> :
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
              <a className="navbar-brand" href="/">TICKET MASTER</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link to="/home" className="nav-link">HOME</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/account/login" className="nav-link">LOGIN</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/account/register" className="nav-link" onClick={handleLogout}>REGISTER</Link>
                  </li>
                </ul>
              </div>
            </nav>
        }

        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/account/register" component={Register} />
          <Route path="/account/login" component={Login} />

          <Route path="/customers" component={List} exact={true} />
          <Route path="/customers/new" component={CustomerNew} />
          <Route path="/customers/edit/:id" component={CustomerEdit} />
          <Route path="/customers/:id" component={CustomerShow} />

          <Route path="/departments" component={DepartmentList} exact={true} />

          <Route path="/employees" component={EmployeeList} exact={true} />
          <Route path="/employees/new" component={EmpNew} />
          <Route path="/employees/:id" component={EmpShow} />

          <Route path="/tickets" component={TicketList} exact={true} />
          <Route path="/tickets/new" component={TicketNew} />
          <Route path="/tickets/:id" component={TicketShow} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
