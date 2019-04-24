import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedInTrueAction } from '../actions';
import './login.css';

const Login = ({ 
  onSubmitForm, 
  classNames, 
  onLabelChange, 
  loginEmail, 
  loginPassword,
  errorMessage,
  submitError
}) => {
  return (
    <div className="container">
      <div className="login-window row justify-content-center align-items-center" >
        <div className="col-6">
          <h3>Login</h3>
          <div className="card">
            <div className="card-body">
              <form 
                autoComplete="off"
                onSubmit={onSubmitForm}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classNames} 
                    name="loginEmail"
                    placeholder="Enter username"
                    onChange={onLabelChange}
                    value={loginEmail}/>
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classNames} 
                    name="loginPassword"
                    placeholder="Enter password"
                    onChange={onLabelChange}
                    value={loginPassword}/>
                      <small 
                      className={submitError ? "text-danger" : "hidden" }>
                        {errorMessage}
                      </small>
                </div>
                <button type="submit"  className="btn btn-primary">login</button>
              </form>
            </div>
          </div>
          <Link to="/" className="bottom-link">or return to main page</Link>
        </div>
      </div>
    </div>
  )
}

class LoginContainer extends Component {
  constructor() {
    super();

    this.state = {
      loginEmail: '',
      loginPassword: '',
      submitError: false,
      errorMessage: ''
    }
  }

  onLabelChange = ({target: {name, value}}) => {
    this.setState({[name]:value})
  }
  
  onSubmitForm = (event) => {
    const { loginEmail, loginPassword } = this.state;
    event.preventDefault();
    
    if ( loginEmail === 'admin' && loginPassword === '123' ) {
      this.props.isLoggedInTrue();
      this.setState({
        submitError: false
      })
    }
    
    this.setState({
      loginEmail: '',
      loginPassword: '',
      submitError: true,
      errorMessage: 'Username or password is invalid'
    });
  }
  
  render() {
    const { submitError } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/"/>
    }

    const classNames = submitError ? "form-control is-invalid" : "form-control";
    
    return (
      <Login
        onSubmitForm={this.onSubmitForm}
        classNames={classNames} 
        onLabelChange={this.onLabelChange} 
        loginEmail={this.state.loginEmail}
        loginPassword={this.state.loginPassword}
        errorMessage={this.state.errorMessage}
        submitError={submitError}
      />
    )
  }
}

const mapStateToProps = ({ isLoggedIn }) => {
  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedInTrue: () => dispatch(isLoggedInTrueAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);