import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
//import fire   from './fire';
import * as firebase from 'firebase';
import Header from './Header';
import './main.css';
import hat from './images/hat.jpg';
var divStyle = {
    'border-style': 'solid',
    'border-witdh': '5px'
};

class MainContainer extends Component {
    state = { user: null, hkname:'',   hkcurrent:'',   resumebool: false,     
	      name_editing: false, current_editing:false, past_editing:false, hktotaledit: false,
	      hkinputs: [ {period:null, title:null, description:null} ],           name:'',company:'' };
    componentDidMount() {
        firebase.auth().onAuthStateChanged(  user => {
                if (user) {
		    console.log( user.uid );
		    this.setState( { user }  );

		    firebase.database().ref(  'users/' + user.uid  ).on('value', snapshot => {
			    if ( snapshot.val() ) {
				this.setState( { resumebool: true } );
				this.setState( { hkname: snapshot.val().name } );
				this.setState( { hkcurrent: snapshot.val().current } );
				this.setState( { hkinputs: snapshot.val().past } );
				console.log( "there is resume" );
				console.log( snapshot.val() );
			    } else { console.log( "no resume" ); }
			});
		} else {
		    console.log( "new user?" );
		    this.props.history.push('/login');
		}
	    } );
    };

    //////////////////////////
    handleLogout = () => {
	firebase.auth().signOut();
    };
    handleTedit = () => {
	this.setState( {hktotaledit: true} );
    };

    //////////////////////////
    handleNameChange = event => {
	this.setState(  { hkname: event.target.value }  );
    };
    handleCurrentChange = event => {
	this.setState(  { hkcurrent: event.target.value }  );
    };
    handleSubmit = event => {
	event.preventDefault();
	if ( this.state.hkname && this.state.hkcurrent ) {
	    this.fireSubmit();
	} else {
	    console.log( "error" );
	}
    };
    fireSubmit() {
        let uploadarray = [];

	this.state.hkinputs.map( (msg, id) => {
		// build each line consisting 3 fields
		let hktempobject = { period: this.refs[`period_${ id }`].value, 
		  title: this.refs[`title_${ id }`].value,  description: this.refs[`description_${ id }`].value };
		console.log( "constructed object" );
		console.log( hktempobject );
		uploadarray.push( hktempobject );
	    } );

	firebase.database().ref(  'users/' + this.state.user.uid  ).set(  { name: this.state.hkname, current: this.state.hkcurrent,
		    past: uploadarray} );

    };
    //////////////////////////
    toggle_name_editing = () => {	this.setState( { name_editing: true } );    };
    toggle_current_editing = () => {	this.setState( { current_editing: true } );    };
    handleNameTotal = () => {
	firebase.database().ref(  'users/' + this.state.user.uid  ).update(  { name: this.refs['name'].value }  );
	this.setState( { name_editing: false } );
    };
    handleCurrentTotal = () => {
	firebase.database().ref(  'users/' + this.state.user.uid  ).update(  { current: this.refs['current'].value }  );
	this.setState( { current_editing: false } );
    };
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
    togglePastEditing = ( itemId ) => {        this.setState( { past_editing: itemId } );    };
    handlePastTotal = (id) => {
	firebase.database().ref(  'users/' + this.state.user.uid + '/past/' + id  ).update( { period: this.refs[`period2_${ id }`].value, 
		    title: this.refs[`title2_${ id }`].value,  description: this.refs[`description2_${ id }`].value } );
	this.setState( { past_editing: false } );
    };
    /////////////////////////////////
    /////////////////////////////////
    renderItemOrEditField = ( item, id ) => {        console.log( id );
       if ( this.state.past_editing === id ) {

 return(  <li key={ `editing-${ id }` }>
        <Grid>        <Row>
 <Col> <input  type="text" className="form-control" ref={`period2_${ id }` } name="period" defaultValue={ item.period }  />        </Col>
 <Col> <input  type="text" className="form-control" ref={`title2_${ id }` } name="title" defaultValue={ item.title } />      </Col>
 <Col> <input  type="text" className="form-control" ref={`description2_${ id }`} name="description" defaultValue={item.description} /> </Col>
	  <Col> <Button onClick={ this.handlePastTotal.bind( null, id ) }> Update Item </Button>    </Col>
        </Row>  </Grid> </li> )
     } else {
	   return ( 
		   <div style={divStyle}  onClick={ this.togglePastEditing.bind( null,id ) } >
		   <h2> {item.title} <span> {item.period} </span> </h2>
		   <p> { item.description } </p>
                   </div>
		    )        }         };
    ////////////////////////////////
    render_name = () => {	if ( this.state.name_editing ) {	    return ( 
<div> 
<dt> Basic </dt>
<dd>
Name: <input type="text" name="name" defaultValue={ this.state.hkname } ref={ 'name'}  />  
		     <button className="red light" type="submit" onClick={this.handleNameTotal}>   Submit a change   </button> 
</dd>
</div>  );
	} else {	    return (   
<div onClick={this.toggle_name_editing}> 
<dt> Basic </dt>
<dd>
<h2> Basic Information </h2> <p> <strong> Name: </strong> { this.state.hkname } </p>
</dd>
</div>
      )	}  };
    ////////////////////////////////
    render_current = () => {	if ( this.state.current_editing ) {	    return ( 
<div> 
<dt> Current Position </dt>
<dd>
Current Company: <input  type="text" name="current" defaultValue={ this.state.hkcurrent } ref={ 'current'}  />  
		     <button className="red light" type="submit" onClick={this.handleCurrentTotal}>   Submit a change   </button> 
</dd>
</div>  );
	} else {	    return (   
<div onClick={this.toggle_current_editing}> 

<dt> Current Position </dt>
<dd> <h2> {this.state.hkcurrent}  </h2> </dd> 

</div>     )	}    };
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    render() {	return (
<div>  <Header>    
<Button bsStyle="primary" onClick={this.handleLogout}> Logout </Button>

    { !this.state.hktotaledit ? (<Button bsStyle="warning" onClick={this.handleTedit}> Edit Resume </Button>) : (null) }

</Header>
<Grid fluid={true} className="text-center"> <Row>

<Col sm={2} className="well">

<div className="well">
 <p><a href="#">My Profile</a></p>
 <img src={hat} className="img-circle" height="55" width="55" alt="Avatar" />
</div>

<div className="well">
 <p> <a href="#">Interests</a> </p>
 <p>   <span className="label label-default">News</span>   <span className="label label-primary">W3Schools</span>
   <span className="label label-success">Labels</span> <span className="label label-info">Football</span>  
   <span className="label label-warning">Gaming</span> <span className="label label-danger">Friends</span>  </p>
</div>

<p><a href="#">Link</a></p>
<p><a href="#">Link</a></p>
<p><a href="#">Link</a></p>
</Col>

     {/* ================================================ */}
<Col sm={7} className="page-wrap">

    { (this.state.resumebool && !this.state.hktotaledit) ?   ( 

<dl>

<dd className="clear"></dd>
{this.render_name()}

<dd className="clear"></dd>
{this.render_current()}

<dd className="clear"></dd>
<dt> Experience </dt>

<dd>
{  this.state.hkinputs.map(   ( item, i )    =>    { return this.renderItemOrEditField( item, i ); }       )        }
</dd>

</dl>

) : (

<div>
  <form onSubmit={this.handleSubmit}>

    <Button bsStyle="warning" type="submit"> Submit your resume </Button>
<dl>
<dd className="clear"></dd>
<dt> Basic </dt>
<dd> Name:  <input type="text" onChange={this.handleNameChange}    value={this.state.hkname}    placeholder="Your Name"          />  </dd>

<dd className="clear"></dd>
<dt> Current </dt>
<dd> Current: <input type="text" onChange={this.handleCurrentChange} value={this.state.hkcurrent} placeholder="Your Current Position" /> </dd>

<dd className="clear"></dd>
<dt> Experience </dt>
<dd>

  { this.state.hkinputs.map( (msg, id) => { return (
<div>
<input type="text" ref={ `period_${ id }` }      defaultValue={ msg.period } placeholder="Period"/>
<input type="text" ref={ `title_${ id }` }       defaultValue={ msg.title }  placeholder="Title"/>
<input type="text" ref={ `description_${ id }` } defaultValue={ msg.description} placeholder="Description"/>
<button type="button" onClick={ this.handleDel.bind( this, id ) }> Del </button> 
</div>
) } ) }

</dd>

</dl>
  </form>

 <Button bsStyle="warning" onClick={this.handleAdd}>  Add </Button>
</div>

     )  }
</Col>

     {/* ================================================ */}
<Col sm={2} className="well">
      <div class="thumbnail">
        <p>Upcoming Events:</p>        <img src={hat} alt="Paris" width="400" height="300" />
        <p><strong>Paris</strong></p>        <p>Fri. 27 November 2015</p>         <Button bsStyle="primary">Info</Button>
      </div>      
      <div className="well">        <p>ADS</p>      </div>
      <div className="well">        <p>ADS</p>      </div>
</Col>

</Row> </Grid>  </div>

		);
    }
}

export default MainContainer;
