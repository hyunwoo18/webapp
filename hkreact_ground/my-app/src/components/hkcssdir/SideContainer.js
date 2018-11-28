import React, { Component } from 'react';
import { Button, Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';

import './myside.css';
import './raul.css';

class SideContainer extends Component {

    state = { myrecords: [
    { title: "Title1.", artist: "Artist that produced the record1.", releaseYear: "Year the record was released3." },
    { title: "Title2.", artist: "Artist that produced the record2.", releaseYear: "Year the record was released3." },
    { title: "Title3.", artist: "Artist that produced the record3.", releaseYear: "Year the record was released3." } ],
	      editing: null
    };


    /////////////////////////////////
    handleEditField = ( event ) => {
	if ( event.keyCode === 13 ) {
	    let target = event.target,
	    update = {};
	    
	    update._id = this.state.editing;
	    update[ target.name ] = target.value;
	}
    };

    handleEditItem = () => {
	let itemId = this.state.editing;
    };

    /////////////
    toggleEditing = ( itemId ) => {
	this.setState( { editing: itemId } );
    };




    //////////////
    renderItemOrEditField = ( item, id ) => {
	console.log( id );
	if ( this.state.editing === id ) {
	    return(
		   <li key={ `editing-${ id }` }>
        <Grid>
        <Row>

          <Col>
            <input onKeyDown={ this.handleEditField } type="text" className="form-control" ref={ `title_${ id }` } name="title" defaultValue={ item.title }  />
          </Col>

          <Col>
            <input onKeyDown={ this.handleEditField } type="text" className="form-control" ref={ `artist_${ id }` } name="artist" defaultValue={ item.artist } />
          </Col>

          <Col>
 <input onKeyDown={ this.handleEditField } type="text" className="form-control" ref={`releaseYear_${ id }`} name="releaseYear" defaultValue={ item.releaseYear }
            />

          </Col>

          <Col>
		<Button onClick={ this.handleEditItem }> Update Item </Button>
          </Col>

        </Row>
        </Grid>
		   </li> )
	} else {
	    return ( 
		    <li onClick={ this.toggleEditing.bind( null, id ) }  key={ id } >
			{ `${ item.title } by ${ item.artist } (${ item.releaseYear })` }
		    </li> )
	}
    }

    render() {
	return (
		<ul>
		{  this.state.myrecords.map(        ( item, i ) => { return this.renderItemOrEditField( item, i ); }  
					     )  }
		</ul>
		);
    }

}

export default SideContainer;

