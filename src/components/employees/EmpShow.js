import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class EmpShow extends React.Component {
    constructor() {
        super()
        this.state = {
            employee: {}
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const employee = response.data
                this.setState({ employee })
            })
    }
    render() {
        return (
            <div>
                <h2>Employee Show - {this.props.match.params.id}</h2>
                <p>{this.state.employee.name} - {this.state.employee.email}- {this.state.employee.email}</p>
                <Link to="/employees">back</Link>
            </div>
        )
    }
}
export default EmpShow