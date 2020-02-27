import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class CustomerShow extends React.Component {
    constructor() {
        super()
        this.state = {
            customer: {}
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const customer = response.data
                this.setState({ customer })
            })

    }
    render() {
        return (
            <div>
                <h2>Customer Show</h2>
                <span className="text-uppercase">{this.state.customer.name}-{this.state.customer.mobile}-{this.state.customer.email}</span>
                <Link to={`/customers/edit/${this.props.match.params.id}`} className="btn btn-primary float-md-right">Edit</Link>
                <div> <Link to="/customers" className="btn btn-primary float-md-left">Back</Link></div>

            </div>
        )
    }
}

export default CustomerShow
