import React, { Component } from 'react';
import styled from 'styled-components';
import {Header} from './VariousHeaders';

//const Mainground = styled.div`
//    background-color: #252830;  position: absolute;  top: 0;    right: 0;    bottom: 0;    left: 0; margin: 0;
//font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 0.9rem; font-weight: 300;
//line-height: 1.5; color: #cfd2da; text-align: left;  `;
const Mainground = styled.div`
    position: absolute;  top: 0;    right: 0;    bottom: 0;    left: 0; margin: 0;
font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 0.9rem; font-weight: 300;
line-height: 1.5; color: black; text-align: left;  `;


const Hkbtn = styled.div`     border: 2px solid black;    background: transparent;    color: black;
    padding: 14px 28px;    font-size: 16px;    float: left;    cursor: pointer; `;

//const Hkbtnwarning = Hkbtn.extend` border-color: #ff9800; color: orange;    &:hover { background: #ff9800; color: white; } `;
const Hkbtninfo    = Hkbtn.extend` border-color: #2196F3; color: dodgerblue &:hover { background: #2196F3; color: white; } `;
const Hkbtndanger  = Hkbtn.extend` border-color: #f44336; color: red  &:hover { background: #f44336; color: white; } `;

const Hhr = styled.hr` margin-top: 3rem !important; `;

const Scontainer = styled.div`    width: 100%;    padding-right: 10px;    padding-left: 10px;    margin-right: auto;    margin-left: auto;
    @media (min-width: 768px) {	.container {    max-width: 880px; } }
    @media (min-width: 992px) { .container {	max-width: 950px; } }
    @media (min-width: 1200px) {.container {	max-width: 1100px; }
    `;

const Srow = styled.div`
	display: -webkit-box;	display: -ms-flexbox;	display: flex;	-ms-flex-wrap: wrap;	flex-wrap: wrap;
	margin-right: -10px;	margin-left: -10px; 
`;

const Scolmdbase =styled.div`;  position: relative;    width: 100%;    min-height: 1px;    padding-right: 10px;padding-left: 10px; `;
const Scolmd3 = Scolmdbase.extend`; -webkit-box-flex: 0; -ms-flex: 0 0 25%;    flex: 0 0 25%; max-width: 25%; `;
const Scolmd9 = Scolmdbase.extend`; -webkit-box-flex: 0; -ms-flex: 0 0 75%;    flex: 0 0 75%; max-width: 75%; `;

const Dashhead = styled.div`; float: left; 
  &::after {    display: block;    clear: both;    content: ""; }
`;

const Dashheadsubtitle = styled.div`;
    margin-top: 0;    margin-bottom: 5px;    font-weight: normal;    font-size: 85%;    color: #434857;
    letter-spacing: 1px;    text-transform: uppercase;
`;

const Dashheadtitle = styled.div`;margin-top: 0; `;


class ESGMainContainer extends Component {
    constructor(props) {        super(props);        this.state = { test:false };    }
    componentDidMount() {        console.log( "main 1" );    };
    render() { return (  

		<Mainground>

<Header>
		<Hkbtndanger>Edit Resume</Hkbtndanger>
		<Hkbtninfo onClick={this.props.onClick}>Logout</Hkbtninfo>

</Header>


<Hhr />

<Scontainer>
<Srow>


<Scolmd3>
<h1> colmd3 </h1>
</Scolmd3>


<Scolmd9>

<Dashhead>
  <Dashheadsubtitle>  Dashboards  </Dashheadsubtitle>
  <Dashheadtitle>    Existing User Resume  </Dashheadtitle>
</Dashhead>

<h1> colmd9 </h1>

</Scolmd9>

</Srow>
</Scontainer>

		</Mainground>
		  );
    }

}

export {Mainground, Hkbtndanger, Hhr};
export default ESGMainContainer;