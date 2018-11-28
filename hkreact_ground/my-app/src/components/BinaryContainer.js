import React, { Component } from 'react';
//import { Route, Redirect, withRouter, Link } from 'react-router-dom';
//import hat from './header-bg.jpg';
import styled from 'styled-components';

const FlexContainer = styled.div`
    display: flex;

position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

width: 60%;
flex-wrap: norwap;
background-color: DodgerBlue;
`;

const FlexBox = styled.div`
    background-color: #f1f1f1;
width: 50%;
height: 300px;
margin: 10px;
text-align: center;
line-height: 300px;

font-size: 30px;

color: black;
//padding-top: 30px;
//padding-bottom: 30px;

//    position: absolute;
//    top: 50%;
    //    left: 50%;
    //    transform: translate(-50%, -50%);
    //    margin-right: -50%;
    //transform: translate(0, -50%);
    //    margin-left: auto;
    //    margin-right: auto;
`;

//https://www.w3schools.com/css/css3_box-sizing.asp

class BinaryContainer extends Component {

    //    constructor(props) {        super(props);    }

    render() { 	return (

<FlexContainer>

<FlexBox>

Job Seeker

</FlexBox>



<FlexBox>

Employer

</FlexBox>


</FlexContainer>

		       );

    }


}

export default BinaryContainer;


















