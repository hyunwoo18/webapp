import React, { Component } from 'react';
import styled from 'styled-components';

import { Redirect, withRouter } from 'react-router-dom';  

import * as firebase from 'firebase';

///////////////////////////////////////
const Navbar   = styled.nav` position: relative; min-height: 50px;  border: 1px solid transparent;  `;
const ConFluid = styled.div` padding-right:15px; padding-left:15px; margin-right:auto; margin-left:auto; height: 50px; background-color: white`;

const NaviForm = styled.form`     float: right;    padding: 10px 15px;
    margin-top: 8px;    margin-right: -15px;    margin-bottom: 8px;    margin-left: -15px;
    border-top: 1px solid transparent;    border-bottom: 1px solid transparent;
    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);   `;


// using inline-table makes them alingned in a line //const InputGroup = styled.div`   display: table;
const InputGroup = styled.div`     display: inline-table;  vertical-align: middle;  `;
const InputGroupAdd = styled.span` display: table-cell; 
padding: 6px 12px; font-size: 14px; font-weight: normal; line-height: 1; color: #555;
text-align: center; background-color: #eee; border: 1px solid #ccc; border-radius: 4px;  `;

const CInput = styled.input`    display: table-cell; width: 100%;
height: 34px; padding: 6px 12px; font-size: 14px; line-height: 1.42857143; color: #555;
background-color: #fff; background-image: none; border: 1px solid #ccc; border-radius: 4px;
-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
   transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;  `;


class LoginPresenter extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '' };
        this.onLogin = this.onLogin.bind(this);
    }

    login() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
		    console.log("login called")
                    this.onLogin();
                })
            .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        this.signup();
                    } else {
                        this.setState({ error: 'Error logging in.' });
                    }
                });
    };

    signup() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                    this.onLogin();
                })
            .catch(error => {
                    console.log(error);
                    this.setState({ error: 'Error signing up.' });
                });
    };

    handleEmailChange = event => {      this.setState({ email: event.target.value });    };
    handlePasswordChange = event => {   this.setState({ password: event.target.value });  };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ error: '' });
        if (this.state.email && this.state.password) {
	    console.log("submit clicked")
            this.login();
	} else {
            this.setState({ error: 'Please fill in both fields.' });
        }
    };

    onLogin = () => {
	console.log("onLogin called")
        this.props.onLogin();
    };


    render () {

    return (
	    <Navbar> 	    
	    <ConFluid>
	    <NaviForm>

	    <div>
<InputGroup>
 <InputGroupAdd>  <i className="glyphicon glyphicon-user"></i> </InputGroupAdd>
	    <CInput id="email" type="email" name="email" placeholder="Email Address"  onChange={this.handleEmailChange}  /> 
</InputGroup>

<InputGroup>
<InputGroupAdd>  <i className="glyphicon glyphicon-lock"></i> </InputGroupAdd>
	    <CInput id="passd" type="password" name="password" placeholder="Email Address" onChange={this.handlePasswordChange} /> 
</InputGroup>

  <button type="submit" className="btn btn-primary"  onClick={this.handleSubmit}>Sign-in</button>


	    </div>

	    </NaviForm>
	    </ConFluid> 
	    </Navbar>

	    );

    }
};

export default withRouter(LoginPresenter);
