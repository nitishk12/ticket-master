import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class TicketShow extends React.Component {
    constructor() {
        super()
        this.state = {
            ticket: []
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const ticket = response.data
                this.setState({ ticket })
            })
    }
    render() {
        return (
            <div>
                <h2>Ticket Show - {this.props.match.params.id}</h2>
                <p>{this.state.ticket.code}-{this.state.ticket.message}-{this.state.ticket.priority}</p>
                <Link to='/tickets'>Back</Link>
            </div>
        )
    }
}
export default TicketShow