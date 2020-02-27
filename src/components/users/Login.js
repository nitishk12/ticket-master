import React from 'react'
import axios from '../../config/axios'

class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/login', formData)
            .then((response) => {
                // console.log(response)
                if (response.data.hasOwnProperty('error')) {
                    alert(response.data.error)
                } else {
                    const token = response.data.token
                    localStorage.setItem('authToken', token)
                    this.props.history.push("/")
                    window.location.reload()
                }
            })
            .catch((err) => {
                alert(err)
            })
    }
    render() {
        return (
            <div className="container mb-5">
                <h1 className="text-center text-capitalize pt-5"> Login</h1>
                <hr className="w-25 mx-auto pt-5" />
                <div className="w-50 mx-auto ">
                    <form action="/action_page.php" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type='text' className="form-control" placeholder="Enter email" name='email' id="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type='password' className="form-control" placeholder="Enter password" name='password' id="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form><br />
                </div>
            </div>
        )
    }
}

export default Login
