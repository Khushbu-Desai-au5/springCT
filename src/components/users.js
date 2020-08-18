import React, { Component } from 'react';
import { connect } from 'react-redux';


class Users extends Component {
    state = {
        users: ''
    }

    componentDidMount() {
        const users = JSON.parse(localStorage.getItem('users'))
        this.props.dispatch({
            type: "users", payload: users
        })

    }

    render() {
        return (
            <div style={{ "padding": "40px" }}>
                <table class="table table-striped">
                    <thead className="thead-dark">
                        <tr className="table table-striped">
                            <th>sr</th>
                            <th >Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Mobile Number</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users ? this.props.users.map((user, index) => {
                            return (
                                < tr >
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                </tr>

                            )
                        }) : null}
                    </tbody>
                </table >
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Users)