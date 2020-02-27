import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2'

class List extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: []
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
    }
    handleRemove = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                axios.delete(`/customers/${id}`, {
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                    .then(response => {
                        this.setState((prevState => ({
                            customers: prevState.customers.filter(customer => customer._id !== response.data._id)
                        })))
                    })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    render() {
        return (
            <div>
                <h2>Listing Customers - {this.state.customers.length} </h2>
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
                            this.state.customers.map(customer => {
                                return (
                                    <tr key={customer._id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                        <td><Link to={`/customers/${customer._id}`} className="btn btn-primary">Show</Link></td>
                                        <td><button onClick={() => {
                                            this.handleRemove(customer._id)
                                        }} className="btn btn-danger">remove</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Link to="/customers/new" className="btn btn-primary">Add Customer</Link>
            </div>


        )
    }
}

export default List
