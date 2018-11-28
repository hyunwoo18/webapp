import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import Header from './Header';
import FormContainer from './FormContainer';
import ResuContainer from './ResuContainer';
import './main.css';

class MainContainer extends Component {

    constructor(props) {
        super(props);
	this.state = { resumebool: false, hktotaledit: false,
		       hkname:'',   hkcurrent:'', hkinputs: [ {period:null, title:null, description:null} ] 
	};
    }

    componentDidMount() {
	console.log( "main 1" );
	console.log( this.props.fuser.uid );
	console.log( "main 2" );
	firebase.database().ref( 'users/' + this.props.fuser.uid ).on('value', snapshot => {
		if ( snapshot.val() ) {

		    this.setState( { resumebool: true } );
		    this.setState( { hkname:    snapshot.val().name } );
		    this.setState( { hkcurrent: snapshot.val().current } );
		    this.setState( { hkinputs:  snapshot.val().past } );
		    console.log( "there is resume" );
		    console.log( snapshot.val().name );
		    //console.log( snapshot.val().current );
		    //console.log( snapshot.val().past );
		} else { console.log( "no resume" ); }
	    });
    };

    handleLogout = () => {
        firebase.auth().signOut().then(function() {
		console.log("Logout successful");
	    }, function(error) {
		console.log(error);
	    });

	this.props.hLogout();
    };
    handleTedit = () => {
        this.setState( {hktotaledit: true} );
    };
    revertTedit = () => {
	console.log("Revert successful");
	this.setState( {hktotaledit: false} );
    };

    /////////////////////////////////
    render() {	
	return (
		<div className="freqheight">

    { ( !this.state.resumebool || this.state.hktotaledit ) ? (
<header className="Hader">
<Header> 
<div className="hkbtn hkwarning">Hello,{this.state.hkname}!</div> 
{ this.state.hktotaledit && (<div className="hkbtn hkdanger" onClick={this.revertTedit.bind(this)}>Candel Editing</div>)} 
<div className="hkbtn hkinfo" onClick={this.handleLogout}>Logout</div> 
</Header>
</header>
	    ) : ( 
<header className="Hader">
<Header> 
<div className="hkbtn hkwarning">Hello, {this.state.hkname}!</div> 
{ !this.state.hktotaledit ? (<div className="hkbtn hkdanger" onClick={this.handleTedit.bind(this)}>Edit Resume</div>) : (null) } 
<div className="hkbtn hkinfo" onClick={this.handleLogout}>Logout</div> 
</Header>
</header>
		  ) }

<hr className="mt-5" />

<div className="container">
    <div className="row">
    {/* ========= LEFT ======================================= */}
      <div className="col-md-3 sidebar">
        <nav className="sidebar-nav">

          <div className="sidebar-header">
            <button className="nav-toggler nav-toggler-md sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-md">
              <span className="sr-only">Toggle nav</span>
            </button>
            <a className="sidebar-brand img-responsive" href="index.html"> <span className="icon icon-leaf sidebar-brand-icon"></span>  </a>
          </div>

          <div className="collapse nav-toggleable-md" id="nav-toggleable-md">
            <ul className="nav nav-pills nav-stacked flex-column">
              <li className="nav-header">Dashboards</li>
              <li className="nav-item"> <a className="nav-link active">Overview</a> </li>
              <li className="nav-item"> <a className="nav-link">Link 1</a>   </li>
              <li className="nav-item"> <a className="nav-link">Link 2</a>    </li>
              <li className="nav-item"> <a className="nav-link">Link 3</a>        </li>
              <li className="nav-header">More</li>
              <li className="nav-item"> <a className="nav-link">Menu 1</a>   </li>
            </ul>
          </div>

        </nav>
      </div>
    {/* ========= End LEFT ======================================= */}

      <div className="col-md-9 content">


    { ( !this.state.resumebool || this.state.hktotaledit ) ? (
<div>
          <div className="dashhead">
            <div className="dashhead-titles">
                <h6 className="dashhead-subtitle">Dashboards</h6>
                <h2 className="dashhead-title">New User Resume</h2>
            </div>
          </div>

   <FormContainer fuser={this.props.fuser}  hkname={this.state.hkname}  hkcurrent={this.state.hkcurrent}  hkinputs={this.state.hkinputs} hkrevert={this.revertTedit} />
</div>
	    ) : ( 

<div>
          <div className="dashhead">
            <div className="dashhead-titles">
                <h6 className="dashhead-subtitle">Dashboards</h6>
                <h2 className="dashhead-title">Existing User Resume</h2>
            </div>
          </div>

<ResuContainer fuser={this.props.fuser}  hkname={this.state.hkname} hkcurrent={this.state.hkcurrent} hkinputs={this.state.hkinputs} /> 
</div>
		  ) }

      </div>
 </div> 
</div>	

</div>	
		);
    }
}

export default MainContainer;
