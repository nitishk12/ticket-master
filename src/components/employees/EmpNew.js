import React from 'react'
import axios from '../../config/axios'
import EmpForm from './EmpForm'

class EmpNew extends React.Component {
    handleSubmit = (formData) => {
        axios.post('/employees', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response)
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push('employees')
                }
            })
    }
    render() {
        return (
            <div className="w-50 mx-auto">
                <h2>Add Employee</h2>
                <EmpForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}
export default EmpNew