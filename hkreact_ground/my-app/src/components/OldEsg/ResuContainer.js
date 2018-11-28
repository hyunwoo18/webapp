import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';
import './main.css';
var divStyle = {    'borderStyle': 'solid',    'borderWitdh': '5px'};

class ResuContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { user:      this.props.fuser,
                       hkname:    this.props.hkname,
                       hkcurrent: this.props.hkcurrent,
                       hkinputs:  this.props.hkinputs,
		       name_editing: false, current_editing:false, past_editing:false, hktotaledit: false
                       //hkinputs: [ {period:null, title:null, description:null} ] 
	};
	console.log( "from Resu" );
	console.log( this.state.hkname );
	console.log( "from Resu 2" );
    }

    //////////////////////////
    toggle_name_editing    = () => { this.setState( { name_editing:    true } ); };
    toggle_current_editing = () => { this.setState( { current_editing: true } ); };

    handleNameTotal = () => {
	firebase.database().ref(  'users/' + this.state.user.uid  ).update(  { name: this.refs['name'].value }  );
	this.setState( { name_editing: false } );
    };

    handleCurrentTotal = () => {
	firebase.database().ref(  'users/' + this.state.user.uid  ).update(  { current: this.refs['current'].value }  );
	this.setState( { current_editing: false } );
    };

    /////////////////////////////////
    togglePastEditing = ( itemId ) => {        this.setState( { past_editing: itemId } );    };

    handlePastTotal = (id) => {
	firebase.database().ref(  'users/' + this.state.user.uid + '/past/' + id  ).update( { period: this.refs[`period2_${ id }`].value, 
		    title: this.refs[`title2_${ id }`].value,  description: this.refs[`description2_${ id }`].value } );
	this.setState( { past_editing: false } );
    };
    /////////////////////////////////
    ////////////////////////////////
    render_name = () => {	if ( this.state.name_editing ) {	    return ( 
<div> 
<dt> Basic </dt>
<dd>
<label>Name: <input type="text" className="form-control" name="name" defaultValue={this.props.hkname} ref={'name'} /></label>
<div className="hkbtninline hkdanger" type="submit" onClick={this.handleNameTotal}>Submit your change</div>
</dd>
</div>  );
	} else {	    return (   
<div onClick={this.toggle_name_editing}> 
<dt> Basic </dt>
<dd>
<h2> Basic Information </h2> <p> <strong> Name: </strong> { this.props.hkname } </p>
</dd>
</div>
      )	}  };
    ////////////////////////////////
    ////////////////////////////////
    render_current = () => {	if ( this.state.current_editing ) {	    return ( 
<div> 
<dt> Current Position </dt>
<dd>
<label> Current Company: <input type="text" className="form-control" name="current" defaultValue={ this.props.hkcurrent } ref={ 'current'} /></label>
<div className="hkbtninline hkdanger" type="submit" onClick={this.handleCurrentTotal}>Submit your change</div> 
</dd>
</div>  );
	} else {	    return (   
<div onClick={this.toggle_current_editing}> 
<dt> Current Position </dt>
<dd> <h2> {this.props.hkcurrent}  </h2> </dd> 
</div>     )	}    };
    ////////////////////////////////
    /////////////////////////////////
    renderItemOrEditField = ( item, id ) => {        console.log( id );
       if ( this.state.past_editing === id ) {

 return(  <p className="hktmpli" key={ `editing-${ id }` }>
<label> period <input type="text" className="form-control" ref={`period2_${ id }`} name="period" defaultValue={item.period} /></label>
<label> title <input type="text" className="form-control" ref={`title2_${ id }`}      name="title"       defaultValue={ item.title }     /></label>
<label> Description <input type="text" className="form-control" ref={`description2_${id}`} name="description" defaultValue={item.description} /></label>
<div className="hkbtn hkinfo" onClick={this.handlePastTotal.bind(null,id)}> Update Item </div>
	 </p> )
     } else {
	   return ( 
		   <div key={id} style={divStyle}  onClick={ this.togglePastEditing.bind( null,id ) } >
		   <h2> {item.title} ( {item.period} )</h2>
		   <p> { item.description } </p>
                   </div>
		    )        }         };

    ////////////////////////////////

    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    render() {	return (

<div>
<dl>
<dd className="clear"></dd>
{this.render_name()}

<dd className="clear"></dd>
{this.render_current()}

<dd className="clear"></dd>

<dt> Experience </dt>
<dd>
{  this.props.hkinputs.map(   ( item, i )    =>    { return this.renderItemOrEditField( item, i ); }       )        }
</dd>
</dl>
</div>

			);
    }
}

export default ResuContainer;
