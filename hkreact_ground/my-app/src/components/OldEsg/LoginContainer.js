import React, { Component } from 'react';
import './Netflix.css';
import hat from './header-bg.jpg';
import * as firebase from 'firebase';

class WorkingNavigation extends Component {
    //https://bootsnipp.com/snippets/featured/horizontal-login-form-in-navbar
    // https://www.w3schools.com/bootstrap/bootstrap_navbar.asp
    render() {
	return (

<nav class="navbar navbar-inverse">
  <div class="container-fluid">

    <div class="navbar-header">      WebSiteName    </div>

    <ul class="nav navbar-nav">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
    </ul>

    <form class="navbar-form navbar-left" action="/action_page.php">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search" />
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>

  </div>
</nav>

		    );
    }
}


class Navigation extends Component {

    render() {
	return (
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li>Browse</li>
            <li>My list</li>
          </ul>
        </nav>
      </div>
		    );
    }
}

class UserLogin extends Component {
    // <form id="signin" class="navbar-form navbar-right" role="form">

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '' };
	this.onLogin = this.onLogin.bind(this);
    }

    handleEmailChange = event => {
	this.setState({ email: event.target.value });
	console.log( this.state.email );
    };

    handlePasswordChange = event => {
	this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
	event.preventDefault();
	this.setState({ error: '' });
	if (this.state.email && this.state.password) {
	    this.login();
	} else {
	    this.setState({ error: 'Please fill in both fields.' });
	}
    };

    onLogin() {
	console.log("push 1");
	this.props.onLogin();
	//this.props.history.push("/");
    }

    login() {
	firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
	    .then(res => {
		    this.onLogin();
		})
	    .catch(error => {
		    if (error.code === 'auth/user-not-found') {
			this.signup();
		    } else {
			this.setState({ error: 'Error logging in.' });
		    }
		});
    }

    signup() {
	firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
	    .then(res => {
		    this.onLogin();
		})
	    .catch(error => {
		    console.log(error);
		    this.setState({ error: 'Error signing up.' });
		});
    }

    render() {
	    return (
      <div id="navigation" className="Navigation">
        <nav>
          <div className="container-fluid">

            <ul className="nav navbar-nav">
               <li>temp</li>
            </ul>

		    <form className="navbar-right navbar-form" role="form"  onSubmit={this.handleSubmit}>
                    <div>
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
		            <input id="email" type="email" onChange={this.handleEmailChange} className="form-control" name="email" placeholder="Email Address" />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                           <input id="password" type="password" onChange={this.handlePasswordChange} className="form-control" name="password" placeholder="Password"/ >
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                   </div>
                   </form>

  </div> </nav>  </div>
		    );
    }
}

class Hero extends Component {
    //<div id="hero" className="Hero" style={{backgroundImage: `url(${hat})`}}>
    render() {
	return (
		<div id="hero" className="Hero" style={{backgroundImage: `url(${hat})`}}>
		<div className="content">
		<h2>Jobs Site!</h2>
		<div className="button-wrapper">
		<HeroButton primary={true} text="Jobs Now" />
		<HeroButton primary={false} text="Upload Jobs" />
		</div>
		</div>
		<div className="overlay"></div>
		</div>
		);
    }
}
class HeroButton extends Component {
    render() {
	return (
		<a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
		);
    }
}



class LoginContainer extends Component {
    constructor(props) {
        super(props);
	this.onLogin = this.onLogin.bind(this);
    }

    onLogin() {
	console.log("fucking push 2");
	this.props.history.push("/");
    }


    render() {
	return (
		<div>
              <header className="Header">
		   <UserLogin onLogin={this.onLogin}/>
		</header>
		<Hero />
		</div>
		);
    }
}

export default LoginContainer;
