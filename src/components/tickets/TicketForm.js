import React from 'react'
import axios from '../../config/axios'

class TicketForm extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            customers: [],
            customer: {},
            departments: [],
            department: {},
            employees: [],
            employee: {},
            message: '',
            priority: {},
            prorities: ['High', 'Medium', 'Low']
        }
    }
    componentDidMount() {
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const customers = response.data
                this.setState({ customers })
            })
        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const departments = response.data
                this.setState({ departments })
            })
        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const employees = response.data
                this.setState({ employees })
            })
        axios.get('/prorities', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const prorities = response.data
                this.setState({ prorities })
            })
    }
    handlechange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customer,
            department: this.state.department,
            employee: this.state.employee,
            message: this.state.message,
            priority: this.state.priority
        }
        this.props.handleSubmit(formData)
    }
    handleCustomer = (e) => {
        const customer = this.state.customers.find(cust => cust.name === e.target.value)
        this.setState({ customer })
    }
    handleDept = (e) => {
        const department = this.state.departments.find(dept => dept.name === e.target.value)
        this.setState({ department })
    }
    handleEmp = (e) => {
        const employee = this.state.employees.find(emp => emp.name === e.target.value)
        this.setState({ employee })
    }
    handlePrority = (e) => {
        const priority = this.state.prorities.find(pror => pror === e.target.value)
        this.setState({ priority })
    }

    render() {
        return (
            <div className="container mb-5">
                <h1 className="text-center text-capitalize pt-5"> Tickets</h1>
                <hr className="w-25 mx-auto pt-5" />
                <div className="w-50 mx-auto ">
                    <form action="/action_page.php" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="code">Code</label>
                            <input type='text' name="code" value={this.state.code} onChange={this.handleChange} id="name" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Customer</label><br />
                            <select onChange={this.handleCustomer} className="form-control">
                                <option value="">Select</option>
                                {this.state.customers.map(cust => {
                                    return (
                                        <option key={cust._id} value={cust.name}>{cust.name}</option>
                                    )
                                })}
                            </select>
                            <br />
                        </div>
                        <div className="form-group" >
                            <label>Customer</label><br />
                            <select onChange={this.handleCustomer} className="form-control">
                                <option value="">Select</option>
                                {this.state.customers.map(cust => {
                                    return (
                                        <option key={cust._id} value={cust.name}>{cust.name}</option>
                                    )
                                })}
                            </select>
                            <br />
                        </div>
                        <div className="form-group">
                            <label>Department</label><br />
                            <select onChange={this.handleDept} className="form-control">
                                <option value="">Select</option>
                                {this.state.departments.map(dep => {
                                    return (
                                        <option key={dep._id} value={dep.name}>{dep.name}</option>
                                    )
                                })}
                            </select>
                            <br />
                        </div>
                        <div className="form-group">
                            <label>Employee</label><br />
                            <select onChange={this.handleEmp} className="form-control">
                                <option value="">Select</option>
                                {this.state.employees.map(emp => {
                                    return (
                                        <option key={emp._id} value={emp.name}>{emp.name}</option>
                                    )
                                })}
                            </select>
                            <br />
                        </div>
                        <div className="form-group">
                            <label htmlFor='message'>Message</label><br />
                            <textarea name='message' value={this.state.message} onChange={this.handlechange} id='message' className="form-control"></textarea><br />
                        </div>
                        <div className="form-group" >
                            <label>Prority</label><br />
                            <label className="form-control">
                                <input
                                    value='High'
                                    checked={this.state.priority === 'High'}
                                    onChange={this.handlePrority}
                                    type='radio' />High
                            <br />
                                <input
                                    value='Medium'
                                    checked={this.state.priority === 'Medium'}
                                    onChange={this.handlePrority}
                                    type='radio' />Medium
                            <br />
                                <input
                                    value='Low'
                                    checked={this.state.priority === 'Low'}
                                    onChange={this.handlePrority}
                                    type='radio' />Low
                    </label>
                            <br />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form><br />
                </div>
            </div>
        )
    }
}
export default TicketForm