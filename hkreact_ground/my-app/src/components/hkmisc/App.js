import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';
//import ChatContainer from './ChatContainer';
import MainContainer from './MainContainer';
import NavContainer from './NavContainer';
//import logo from './images/logo.svg';
import fire from './fire';
import './App.css';

class App extends Component {
    state = { user: null, messages: [], messagesLoaded: false };

    componentDidMount() {
	fire.auth().setPersistence( 'local' ).then( function() { console.log("persistence success"); } );
	//fire.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

	fire.auth().onAuthStateChanged(  user => {
		if (user) {
		    console.log( user.email )
		    //this.setState(  { user }  );
		    //var hkuser = fire.auth().currentUser;
		} else {  this.props.history.push('/login');     }
	    }  );
    };

  render() {
    return (
      <div className="App">
        <Route       path="/login" component={LoginContainer} /> 
        <Route exact path="/"  render={() => (<MainContainer /> )} />
      </div>

    );
  }
}

export default withRouter(App);
