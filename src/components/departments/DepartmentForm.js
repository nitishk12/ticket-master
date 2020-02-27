import React from 'react'

class DepartmentForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.props.handleSubmit(formData)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type='text' name='name' value={this.state.name} onChange={this.handleChange} className="form-control" />
                    </div>


                    <input type='submit' value='add department' className="btn btn-info" />
                </form>
            </div>
        )
    }
}
export default DepartmentForm