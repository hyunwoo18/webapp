import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

import './main.css';

class FormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { user: this.props.fuser,
		       hkname: this.props.hkname, 
		       hkcurrent: this.props.hkcurrent,
		       hkinputs: this.props.hkinputs };

	//this.handleSubmit = this.handleSubmit.bind(this);
	//this.fireSubmit = this.fireSubmit.bind(this);
    }

    //////////////////////////
    handleNameChange = event => {
	this.setState(  { hkname: event.target.value }  );
    }
    handleCurrentChange = event => {
	this.setState(  { hkcurrent: event.target.value }  );
    }

    handleSubmit = event => {
	event.preventDefault();
	if ( this.state.hkname && this.state.hkcurrent ) {
	    console.log( "calling fire" );
	    this.fireSubmit();
	} else {
	    console.log( "error" );
	}
    }

    fireSubmit() {

        let uploadarray = [];
	this.state.hkinputs.map( (msg, id) => {
		// build each line consisting 3 fields
		let hktempobject = { period: this.refs[`period_${id}`].value, title: this.refs[`title_${id}`].value, description: this.refs[`description_${id}`].value };
		console.log( "constructed object" );
		console.log( hktempobject );
		uploadarray.push( hktempobject );
		return null;
	   } );

	console.log( "fire called" );
	firebase.database().ref('users/' + this.props.fuser.uid ).set( { name: this.state.hkname, current: this.state.hkcurrent, past: uploadarray} );
	console.log( "fire called 2" );
	this.props.hkrevert();
	//this.props.history.push("/connect");

    };

    //////////////////////////
    /////////////////////////////////////////////////////////////
    handleAdd = () => {
        let newarray = this.state.hkinputs.slice();
        newarray.push( 'third' )
        this.setState(  { hkinputs: newarray } );
    };
    handleDel = (param) => {
        console.log( param );
        console.log( this.state.hkinputs );
        let newarray2 = [...this.state.hkinputs];
        newarray2.splice( param, 1 );
        console.log( newarray2 );
        this.setState(  { hkinputs: newarray2 } );
    };
    /////////////////////////////////
    /////////////////////////////////
    render() {	
	// HK> This is very important, form onSubmit triggers the creation of a new page or something
	// HK> and this is why we need 	event.preventDefault(); in handleSubmit
	// to prevent this behavior, I had to move the invocation of {this.handleSubmit} to the button onClick
	//<form onSubmit={this.handleSubmit}>

return (
<div>
<form>
<dl>
<dd className="clear"></dd>
<dt> Basic </dt>
<dd> <label>Name: <input type="text" className="form-control" onChange={this.handleNameChange} value={this.state.hkname} placeholder="Your Name" /></label>  </dd>

<dd className="clear"></dd>
<dt> Current </dt>
<dd> <label> Current Company: <input type="text" className="form-control" onChange={this.handleCurrentChange} value={this.state.hkcurrent} placeholder="Your Current Position" /></label> </dd>

<dd className="clear"></dd>
<dt> Experience </dt>

<dd>
  { this.state.hkinputs.map( (msg, id) => { return (
<div key={id}> 
<label>Period: <input type="text" className="form-control" ref={ `period_${ id }` } defaultValue={ msg.period } placeholder="Period"/></label>
<label>Title: <input type="text" className="form-control" ref={ `title_${ id }` }   defaultValue={ msg.title }  placeholder="Title"/></label>
<label>Desc: <input type="text" className="form-control" ref={ `description_${id}`} defaultValue={ msg.description} placeholder="Description"/></label>
<button type="button" onClick={ this.handleDel.bind( this, id ) }> Del </button> 
</div>
) } ) }
</dd>
<dd className="clear"></dd>
</dl>
<div className="hkbtn hkdanger" onClick={this.handleSubmit} type="submit">Submit your resume</div>
  </form>
<div className="hkbtn hkwarning" onClick={this.handleAdd}>Add</div>
</div>

	);
    }
}

export default FormContainer;
// the following is working
//export default withRouter(FormContainer);
