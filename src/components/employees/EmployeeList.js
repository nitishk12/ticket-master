import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }
    componentDidMount() {
        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response => {
                const employees = response.data
                this.setState({ employees })
            }))
    }
    handleRemove = (id) => {
        axios.delete(`/employees/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                this.setState((prevState => ({
                    employees: prevState.employees.filter(emp => emp._id !== response.data._id)
                })))
            })
    }
    render() {
        return (
            <div >
                <h2>Listing Employees - {this.state.employees.length}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th> name </th>
                            <th> email </th>
                            <th> mobile </th>
                            <th> action </th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(emp => {
                                return (
                                    <tr key={emp._id}>
                                        <td>{emp.name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.mobile}</td>
                                        <td> <Link to={`/employees/${emp._id}`} className="btn btn-primary">Show</Link></td>
                                        <td><button onClick={() => {
                                            this.handleRemove(emp._id)
                                        }} className="btn btn-danger">remove</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
                <Link to="/employees/new" className="btn btn-primary">Add Employee</Link>
            </div>
        )
    }
}
export default EmployeeList