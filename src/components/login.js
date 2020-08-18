import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/logo.jpeg';
import { connect } from 'react-redux'

class Login extends React.Component {

    handleChange = (name, event) => {
        this.props.dispatch({ type: name, payload: event.target.value })

    };

    handleLogin = (e) => {
        var email = /\S+@\S+\.\S+/;
        var pass = /^(?=.*?[A-Z]).{8,}/
        e.preventDefault();
        if (this.props.email === "" || this.props.password === "" || this.props.role === "") {
            this.props.dispatch({ type: "dataMissing", payload: true })
        }
        else if (!(email.test(this.props.email))) {
            this.props.dispatch({ type: "emailFormatNotMatch", payload: true })
        }
        else if (!(pass.test(this.props.password))) {
            this.props.dispatch({ type: "passwordFormatNotMatch", payload: true })
        }
        else if (this.props.role === "admin" || this.props.role === "user") {
            this.props.history.push({
                pathname: '/allUsers',
                state: this.props.role
            })
        }
        else {
            this.props.dispatch({
                type: "loginError", payload: true
            })
        }
    }


    render() {
        return (
            <div className="row" style={{ "height": "100%", "width": "100%" }}>
                <div className="col-4"></div>
                <div className="col-4">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} className="mt-2" alt="logo" width="120px" height="120px" />
                    </Link>
                    <form>
                        <div className="form-group">
                            <label >Email</label>
                            <input type="email" value={this.props.email} onChange={(event) => this.handleChange("email", event)} class="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" value={this.props.password} onChange={(event) => this.handleChange("password", event)} class="form-control" />
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
                        <button type="submit" onClick={this.handleLogin} className="btn btn-dark mt-3 ml-3">Login</button>
                    </form>


                    {this.props.dataMissing ?
                        <div className="alert alert-warning alert-dismissible fade show  mt-2" role="alert">
                            Enter all detail !
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.dispatch({ type: "dataMissing", payload: false })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        : null}
                    {this.props.emailFormatNotMatch ?
                        <div className="alert alert-warning alert-dismissible fade show  mt-2" role="alert">
                            Enter email in valid format !
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.dispatch({ type: "emailFormatNotMatch", payload: false })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        : null}
                    {this.props.passwordFormatNotMatch ?
                        <div class="alert alert-warning alert-dismissible fade show  mt-2" role="alert">
                            Password Must contain at least one uppercase and at least 8 or more characters
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.dispatch({ type: "passwordFormatNotMatch", payload: false })}>
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
        password: state.password,
        role: state.role,
        dataMissing: state.dataMissing,
        emailFormatNotMatch: state.emailFormatNotMatch,
        passwordFormatNotMatch: state.passwordFormatNotMatch,
        loginError: state.loginError

    }

}
export default connect(mapStateToProps)(Login)