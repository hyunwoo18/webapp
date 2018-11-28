import React, { Component } from 'react';
import styled from 'styled-components';


///////////////////////////////////
const Styledform=styled.form`    background-color: #fefefe;margin: 5% auto 15% auto;border: 1px solid #888;width: 50%; `;
const Fcontainer=styled.div` padding: 16px;`;

const Label=styled.label` text-align: left `;
const Input=styled.input` width:100%; padding:15px; margin: 5px 0 22px 0; display:inline-block; border:none; background:#f1f1f1;`;

const Cleardiv=styled.div`    &:after {    content: "";    clear: both;    display: table; }  `;

const Mmbutton=styled.button`background-color:#4CAF50;color:white;padding: 14px 20px;margin: 8px 0;border:none;cursor:pointer;width:100%;opacity:0.9;`;
const Okaybtn=Mmbutton.extend` float: left; width: 50%;`;
const Cancelbtn=Okaybtn.extend` padding: 14px 20px;background-color: #f44336;`;

function Hkform(props) {
    return (
  <Styledform>
    <Fcontainer>
      <Label for="email"><b>Email</b></Label>     <Input type="text"     placeholder="Enter Email"    name="email" />
      <Label for="psw"><b>Password</b></Label>     <Input type="password" placeholder="Enter Password" name="psw" />
  <Cleardiv>  <Cancelbtn type="button" onClick={props.handle} >Cancel</Cancelbtn>   <Okaybtn>Submit</Okaybtn>  </Cleardiv>
    </Fcontainer>
  </Styledform>     ); }

/////////////////////////////////////////////////////////////////
class Hform extends Component {
    state = {	fields: {	    name: '',	    email: ''	},    };
    onFormSubmit = evt => {
	console.log("on form submit");
	evt.preventDefault();
    };
    onInputChange = evt => {
	console.log("on Input Change");
	//const fields = Object.assign({}, this.state.fields);
	//fields[evt.target.name] = evt.target.value;
	//this.setState({fields});
    };
    render() { return (
    <div>      <h1>Sign Up Sheet</h1>
      <form onSubmit={this.onFormSubmit}>
          <input placeholder="Name"   name="name"  value={this.state.fields.name}   onChange={this.onInputChange} />
          <input placeholder="Email"  name="email" value={this.state.fields.email}  onChange={this.onInputChange} />
          <input type="submit" />
        </form>
      </div> ); }
}

export {Hkform, Hform, Cleardiv, Okaybtn, Cancelbtn};
