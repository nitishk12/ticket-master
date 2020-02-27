import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'
import Swal from 'sweetalert2'

class DepartmentList extends React.Component {
    constructor() {
        super()
        this.state = {
            departments: []
        }
    }
    componentDidMount() {
        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const departments = response.data
                this.setState({ departments })
            })
    }
    handleSubmit = (formData) => {
        axios.post('/departments', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    Swal.fire(
                        'Oops!',
                        'There was an error submitting the form',
                        'error'
                    )
                } else {
                    const department = response.data
                    this.setState((prevState => ({
                        departments: [...prevState.departments, department]
                    })))
                    Swal.fire(
                        'Good job!',
                        'Successfully added the department',
                        'success'
                    )
                }

            })
    }
    handleRemove = (id) => {
        axios.delete(`/departments/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                this.setState((prevState => ({
                    departments: prevState.departments.filter(department => department._id !== response.data._id)
                })))
            })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <h2>Listing Departments - {this.state.departments.length}</h2>
                    <ul className="list-group">
                        {this.state.departments.map(department => {
                            return <li key={department._id}
                                className="list-group-item"><span className="text-uppercase">{department.name}</span><button onClick={() => {
                                    this.handleRemove(department._id)
                                }} className="btn btn-danger btn-sm float-right">remove</button></li>
                        })}
                    </ul>
                </div>
                <div className="col-md-4">
                    <DepartmentForm handleSubmit={this.handleSubmit} />
                </div>


            </div>
        )
    }
}
export default DepartmentList