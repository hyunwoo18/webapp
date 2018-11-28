import React, { Component } from 'react';
//import * as firebase from 'firebase';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import {Hkform, Hform, Okaybtn, Cancelbtn} from './SignupForms';

import {Checkout} from './CreditCheckout';

/////////////////////////////////////////////////////////////////
const Modalbox=styled.div` display:none;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#474e5d;padding-top:50px;`;
const Closebutton=styled.span`position:absolute;right:35px;top:15px;font-size:40px;font-weight:bold;color:#f1f1f1; &:hover{color:#f44336;cursor:pointer;}  `;

/////////////////////////////////////////////////////////////////
//////////////////////////////////////////
class PostingsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { resumeOne: null };
	this.modalref = React.createRef();
	this.mdnewref = React.createRef();
	this.choutref = React.createRef();
	this.handleModal = this.handleModal.bind(this);
    };

    handleModal = ( openbool, hkref, mid ) => {
	if ( mid ) {
	    const resm = this.props.mylist.find( (a) => a.id === mid );
	    this.setState( { resumeOne: resm } );
	}
	if ( openbool ) {
	    hkref.current.style.display='block';
	} else {
	    hkref.current.style.display='none';
	}
    };
    
    paySubmit = () => {	    console.log("temp") 	};

    render() { return (
<div>

     <button onClick={ () => this.handleModal( true, this.mdnewref, null ) }>New Posting</button>

     <table>  
      <thead> <tr>  <th> number </th>  <th> Song </th>  <th> Seconds </th>  <th> Open Link </th>   <th> Pay Link </th>  </tr>  </thead>
        <tbody>
     {
	this.props.mylist.map( (track) => (
              <tr key={track.id}>
	      <td> {track.tN}   </td>	      <td> {track.name} </td>	      <td> {track.dM}  </td>	      
	      <td>  <button onClick={ () => this.handleModal( true, this.modalref, track.id ) }>open</button>  </td>
	      <td>  <button onClick={ () => this.handleModal( true, this.choutref, null     ) }>payy</button>  </td>
              </tr>         ))
     }
        </tbody>
     </table>

    <Modalbox innerRef={this.mdnewref}> 
       <Closebutton onClick={ () => this.handleModal(false, this.mdnewref, null) }> &times; </Closebutton>
       <Hform handle={()=>this.handleModal(false, this.mdnewref, null) }/>
    </Modalbox>

     <Modalbox innerRef={this.modalref}> 
        <Closebutton onClick={ () => this.handleModal(false, this.modalref, null) }> &times; </Closebutton>
        <h1> {this.state.resumeOne && this.state.resumeOne.name } </h1>
        <Hkform handle={() => this.handleModal(false, this.modalref, null) }/>
     </Modalbox>

    <Modalbox innerRef={this.choutref}> 
        <Closebutton onClick={ () => this.handleModal(false, this.choutref, null) }> &times; </Closebutton>
        <h1> {this.state.resumeOne && this.state.resumeOne.name } </h1>
        <Checkout paySubmit={this.paySubmit} handle={()=>this.handleModal(false, this.choutref, null) }    />
    </Modalbox>

</div>
  )  }
}

// jmay /////// payment //////////

export default PostingsContainer;