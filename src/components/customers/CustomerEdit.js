import React from 'react'
import Form from './Form'
import axios from '../../config/axios'

class CustomerEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            customer: {}
        }
    }
    handleSubmit = (formData) => {
        axios.put(`/customers/${this.props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const customer = response.data
                this.props.history.push(`/customers/${customer._id}`)
            })
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
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Edit Customer</h2>
                {
                    Object.keys(this.state.customer).length !== 0 && <Form {...this.state.customer} handleSubmit={this.handleSubmit} />
                }
            </div>
        )
    }
}
export default CustomerEdit