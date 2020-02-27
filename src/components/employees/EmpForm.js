import React from 'react'
import axios from '../../config/axios'

class EmpForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            mobile: '',
            departments: [],
            department: {}
        }
    }
    componentDidMount() {
        axios.get(`/departments`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const departments = response.data
                this.setState({ departments })
            })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department
        }
        this.props.handleSubmit(formData)
    }
    handleDept = (e) => {
        const department = this.state.departments.find(dep => dep.name === e.target.value)
        this.setState({ department })
        console.log(department)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type='text' name="name" value={this.state.name} onChange={this.handleChange} id="name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type='text' name="email" value={this.state.email} onChange={this.handleChange} id="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input type='text' name="mobile" value={this.state.mobile} onChange={this.handleChange} id="mobile" className="form-control" />
                    </div>
                    <div className="dropdown">
                        <select onChange={this.handleDept}>
                            <option value="">Select</option>
                            {this.state.departments.map(dep => {
                                return (
                                    <option key={dep._id} value={dep.name}>{dep.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <input type='submit' value="submit" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}
export default EmpForm