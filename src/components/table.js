import React from 'react';
import { connect } from 'react-redux'
import Users from './users';


class Table extends React.Component {

    handleAddUser = () => {
        this.props.history.push({
            pathname: '/addUser',
        })
    }

    render() {
        return (
            <div>
                {console.log(this.props.history.location.state)}
                {this.props.history.location.state === "admin" ? <div>
                    <button className="btn btn-info m-2" type="submit" onClick={this.handleAddUser}>Add User</button>
                </div> : null}
                <Users />
            </div>
        )
    };
}


const mapStateToProps = (state) => {
    return {}

}
export default connect(mapStateToProps)(Table)