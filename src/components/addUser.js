import React from 'react';
import { connect } from 'react-redux';

class AddUser extends React.Component {

    handleChange = (name, event) => {
        this.props.dispatch({ type: name, payload: event.target.value })
    };

    handleSubmit = (e) => {
        var email = /\S+@\S+\.\S+/;
        e.preventDefault();
        if (this.props.email === "" || this.props.password === "" || this.props.role === "", this.props.name === "" || this.props.phone === "", this.props.address === "") {
            this.props.dispatch({ type: "dataMissing", payload: true })
        }
        else if (!(email.test(this.props.email))) {
            this.props.dispatch({ type: "emailFormatNotMatch", payload: true })
        }
        else if (this.props.phone.length !== 10) {
            this.props.dispatch({ type: "phoneError", payload: true })
        }

        else if (this.props.role === "admin" || this.props.role === "user") {
            const user = {
                email: this.props.email,
                name: this.props.name,
                phone: this.props.phone,
                address: this.props.address,
                role: this.props.role
            }
            this.props.dispatch({ type: "addUser", payload: user })
            this.props.history.push({
                pathname: '/allUsers',
                state: "admin"
            })

        }
        else {
            this.props.dispatch({
                type: "submitError", payload: true
            })
        }
    }


    render() {
        return (
            <div className="row" style={{ "height": "100%", "width": "100%" }}>
                <div className="col-4"></div>
                <div className="col-4" >
                    <form style={{ "border": "2px solid black", "padding": "30px" }}>
                        <div className="form-group mt-3">
                            <label >Email</label>
                            <input type="email" value={this.props.email} onChange={(event) => this.handleChange("email", event)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" value={this.props.name} onChange={(event) => this.handleChange("name", event)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Address</label>
                            <textarea type="text" value={this.props.address} onChange={(event) => this.handleChange("address", event)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Mobile Number</label>
                            <input type="number" value={this.props.phone} onChange={(event) => this.handleChange("phone", event)} className="form-control" />
                        </div>
                        <div className="row">
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input" onChange={(event) => this.props.dispatch({ type: "role", payload: event.target.value })} type="radio" name="gridRadios" value="admin" checked={this.props.role === "admin"} />
                                    <label className="form-check-label"> Admin</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onChange={(event) => this.props.dispatch({ type: "role", payload: event.target.value })} type="radio" name="gridRadios" id="gridRadios2" value="user" checked={this.props.role === "user"} />
                                    <label className="form-check-label">
                                        User
          </label>
                                </div>

                            </div>

                        </div>
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-dark mt-3 ml-3">Submit</button>
                    </form>
                    {this.props.dataMissing ?
                        <div class="alert alert-warning alert-dismissible fade show  mt-2" role="alert">
                            Enter all detail !
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.dispatch({ type: "dataMissing", payload: false })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        : null}
                    {this.props.emailFormatNotMatch ?
                        <div class="alert alert-warning alert-dismissible fade show  mt-2" role="alert">
                            Enter email in valid format !
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.dispatch({ type: "emailFormatNotMatch", payload: false })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        : null}
                    {this.props.passwordFormatNotMatch ?
                        <div class="alert alert-warning alert-dismissible fade show  mt-2" role="alert">
                            Password Must contain at least one uppercase and at least 8 or more characters
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.dispatch({ type: "passwordFormatNotMatch", payload: false })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        : null}

                    {this.props.phoneError ?
                        <div class="alert alert-warning alert-dismissible fade show  mt-2" role="alert">
                            Mobile Number must be of 10 digit
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.dispatch({ type: "phoneError", payload: false })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        : null}
                </div>
            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        email: state.email,
        name: state.name,
        address: state.address,
        phone: state.phone,
        role: state.role,
        dataMissing: state.dataMissing,
        emailFormatNotMatch: state.emailFormatNotMatch,
        passwordFormatNotMatch: state.passwordFormatNotMatch,
        submitError: state.submitError,
        phoneError: state.phoneError,
        users: state.users
    }

}


export default connect(mapStateToProps)(AddUser)