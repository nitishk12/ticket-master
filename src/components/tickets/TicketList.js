import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class TicketList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: []
        }
    }
    componentDidMount() {
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response => {
                const tickets = response.data
                this.setState({ tickets })
            }))
    }
    handleRemove = (id) => {
        axios.delete(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                this.setState((prevState => ({
                    tickets: prevState.tickets.filter(tkt => tkt._id !== response.data._id)
                })))
            })
    }
    render() {
        return (
            <div >
                <h2>Listing Tickets - {this.state.tickets.length}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th> code </th>
                            <th> message </th>
                            <th> priority </th>
                            <th> action </th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tickets.map(tkt => {
                                return (
                                    <tr key={tkt._id}>
                                        <td>{tkt.code}</td>
                                        <td>{tkt.message}</td>
                                        <td>{tkt.priority}</td>
                                        <td> <Link to={`/tickets/${tkt._id}`} className="btn btn-primary">Show</Link></td>
                                        <td><button onClick={() => {
                                            this.handleRemove(tkt._id)
                                        }} className="btn btn-danger">remove</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
                <Link to="/tickets/new" className="btn btn-primary">Add Ticket</Link>
            </div>
            // <div>
            //     <h2>Listing Tickets - {this.state.tickets.length}</h2>
            //     <ul>
            //         {this.state.tickets.map(tkt => {
            //             return <li key={tkt._id}>
            //                 <Link to={`/tickets/${tkt._id}`}>{tkt.code}</Link>{tkt.message}-{tkt.priority}
            //                 <Link to={`/tickets/${tkt._id}`}>Show</Link>
            //                 <button onClick={() => {
            //                     this.handleRemove(tkt._id)
            //                 }}>remove</button>
            //             </li>
            //         })}
            //     </ul>
            //     <Link to="/tickets/new">Add Ticket</Link>
            // </div> 
        )
    }
}
export default TicketList