import React from 'react'
import axios from '../../config/axios'
import Form from './Form'

class CustomerNew extends React.Component {
    handleSubmit = (formData) => {
        axios.post('/customers', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                if (response.data.hasOwnProperty('error')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push('/customers')
                }
            })
    }
    render() {
        return (
            <div className="w-50 mx-auto">
                <h1>Add Customer</h1>
                <Form handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default CustomerNew
