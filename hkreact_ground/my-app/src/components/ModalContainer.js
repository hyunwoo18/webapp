import React, { Component } from 'react';
import styled from 'styled-components';
//const Modalopenbutton = styled.button`    width: auto; `;

import {Hkform} from './SignupForms';

const Modalbox=styled.div` 
    display:none;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#474e5d;padding-top:50px; `;
const Closebutton=styled.span`
    position:absolute;right:35px;top:15px;font-size:40px;font-weight:bold;color:#f1f1f1; &:hover{color:#f44336;cursor:pointer;}  `;
const Button = styled.button`
background: ${props => props.primary ? 'palevioletred' : 'white'};
     color: ${props => props.primary ? 'white' : 'palevioletred'};
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;`;


////////////////////////////////////////////////////
function ModalContainer(props) {

    let modalref = React.createRef();

    function handleOpene() {modalref.current.style.display='block';}

    function handleClose() {modalref.current.style.display='none';}

    return (
	    <div>

	    <Button onClick={handleOpene}>Sign Up</Button>  <Button primary> Normal </Button>

	    <Modalbox innerRef={modalref}>
                 <Closebutton onClick={handleClose}> &times; </Closebutton> 
                 <Hkform handle={handleClose}/>
	    </Modalbox>

	    </div>
	    );
};

export default ModalContainer;
