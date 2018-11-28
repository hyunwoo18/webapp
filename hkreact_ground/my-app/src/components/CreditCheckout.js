import React, { Component } from 'react';
//import * as firebase from 'firebase';
import styled from 'styled-components';

import {Okaybtn, Cancelbtn, Cleardiv} from './SignupForms';

const StyledCheckout=styled.div` background: white; width: 50%; `;
const Checkout = (props) => ( 
      <StyledCheckout>

      <PaymentForm onSubmit={props.paySubmit} />

      <Cleardiv>  <Cancelbtn type="button" onClick={props.handle} >Cancel</Cancelbtn>   <Okaybtn>Submit</Okaybtn>  </Cleardiv>

      </StyledCheckout>
);


// this following attempt did not work
//const BasicInput = (props) => ( 
//<div>
//      <label htmlFor={props.name}>  {props.label}  </label>
//      <input id={props.name} type={props.type} placeholder={props.placeholder} />
//</div> ); 
//const BasicInputStyled = styled(BasicInput)`       `;
//const PaymentForm = (props) => (
//          <BasicInputStyled name="name" label="Name on credit card" type="text"   placeholder="John Smith" />

// but this worked...

const PaymentForm = (props) => (
      <div className="PaymentForm">
      <form onSubmit={props.onSubmit}>

          <Title>Payment information</Title>

          <BasicInput name="name" label="Name on credit card" type="text"   placeholder="John Smith" />
          <BasicInput name="card" label="Credit card number"  type="number" placeholder="0000 0000 0000 0000" />

          <ExpiryDate />

          <CheckoutButton />

        </form>
      </div>
	    );

// child 0
const Title=styled.div` font-family: 'Playfair Display';font-size: 18px;padding: 20px; `;

// child 1
const BasicInputStyled = styled.div`     padding: 0 20px; margin-bottom: 20px;
label {    display: block;    text-transform: uppercase;    margin-bottom: 5px;    font-size: 11px;    font-weight: 600; }
input {
    width: 100%;    border: 0;    border-bottom: 1px solid #17183B;    font-family: 'Lato', sans-serif;    padding: 5px 0;
    font-size: 18px;    font-weight: 300;    outline: none;
    &:focus {	border-bottom: 1px solid #FFB49A;    }
} `;
const BasicInput = (props) => ( 
<BasicInputStyled>
      <label htmlFor={props.name}>  {props.label}  </label>
      <input id={props.name} type={props.type} placeholder={props.placeholder} />
</BasicInputStyled>
); 



// child 2
const ExpiryDate = (props) => ( 
      <div className="ExpiryDate">
        <div>
          <label>Expires on</label>
          <div className="Expiry">
            <select>  <option value="">Jan</option>   <option value="">Feb</option>  </select>
            <select> <option value="">2016</option>   <option value="">2017</option> </select>
          </div>
        </div>

        <div className="CVCField">
          <label>CVC</label>
          <input placeholder="000" type="number" />
        </div>

     </div>
 );

// child 3
const CheckoutButton = (props) => (
      <CheckoutButtonStyled>
        <button>Book securely</button>
        <span>Your credit card information is encrypted</span>
      </CheckoutButtonStyled>
	    );

const CheckoutButtonStyled = styled.div`    padding: 0 20px;text-align: center;
button {    background: #ffa181;    color: white;    border: 0;    border-radius: 2px;    font-family: 'Lato', sans-serif;
    width: 100%;    font-size: 13px;    text-transform: uppercase;    font-weight: 300;    outline: none;    padding: 10px 0;
    margin-bottom: 10px;
    &:hover {       background: #ff8e67;    }
    &:active {	-webkit-transform: scale(0.99);	transform: scale(0.99);    }
}
span {	font-size: 11px;	color: #bfbfbf;	font-weight: 300;	text-align: center; }
`;

////
export {Checkout};