import React, { Component } from 'react';
//import { Route, Redirect, withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';


const Havigation = styled.div` 
    height: 37px;
    ul {      display: flex;      height: 37px;      align-items: center;      padding: 0 10px;   }
`;

// Hader
const Sheader = styled.header` 
    //    background: linear-gradient(to bottom, black 0%, transparent 100%);
    background: transparent;
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 );
    padding-left: 60px;     padding-right: 60px;
    width: 100vw;    box-sizing: border-box;    z-index: 5;
`;

const Sul = styled.ul` display: flex;flex-wrap: wrap;padding-left: 0;margin-bottom: 0;list-style: none;     flex-direction: column;  `;
const Sli = styled.li` font-weight: 400; padding: 7px 10px; font-size: 14px; transition: background .125s ease; border-radius: 3px; `;


const Header = (props) => {

    const JSXchildren = React.Children.map( props.children, child => { return <Sli> {child} </Sli> }    );

    return (
<Sheader>
      <Havigation>

      <nav>            <Sul>        {JSXchildren}      </Sul>      </nav>

      </Havigation>
</Sheader>
	    );
};

export {Header};


//const ContainerFluid = styled.div` 
//	width: 100%;    padding-right: 10px;	padding-left: 10px;	margin-right: auto;	margin-left: auto;
//`;

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// position: sticky; not working
// padding: 20px;
//const Hheader = styled.div`  background-color: #F1F1F1; text-align: center;`;
//const Htopnav = styled.div` overflow: hidden;    background-color: #333;`;
//const Htopnava  = styled.a`    float: left;    color: #f2f2f2;    text-align: center;    padding: 14px 16px;    text-decoration: none;    font-size: 17px;
//    &:hover {    background-color: #ddd;    color: black; }
//`;
//const Htopnavaright  = Htopnava.extend`float: right;`;
//const Hul  = styled.ul`    list-style-type: none;    margin: 0;    padding: 0;overflow: hidden;background-color: #333;`;
//const Hlia = styled.li`    float: left;
//    a {	display: block;	color: white;	text-align: center;	padding: 14px 16px;	text-decoration: none;
//	&:hover {	    background-color: #ddd;	    color: black;	}
//    }
//`;
//const Hliaright  = Hlia.extend`    float: right; `;
// not used
//const HeaderSection = (props) => (
//<Hheader>
//<Htopnav>  <Htopnava>      link1 </Htopnava>  <Htopnavaright> link3 </Htopnavaright>  </Htopnav>
//<br />
//<Hul> <Hlia>      <a> Link1 </a> </Hlia> <Hliaright> <a> About </a> </Hliaright> </Hul>
//</Hheader>
//);
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

//////////////////////////////////////////
//const Appheader  = styled.div` background-color: hotpink; text-align: center;`;
//const Apptopnav  = styled.div` overflow: hidden;    background-color: #333;`;
//const Apptopnava = styled.a`   float: left;color: #f2f2f2;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 17px;
//&:hover {    background-color: #ddd;    color: black;  } `;
//const Apptopnavaright  = Apptopnava.extend`float: right;`;

//const AppHeaderSection = (props) => (
//<Appheader>
//<Apptopnav>  
//<Apptopnava>      <Link to='/temp'>  First Page </Link> </Apptopnava>  
//<Apptopnavaright> <Link to='/test'> Second Page </Link> </Apptopnavaright>  
//</Apptopnav>
//</Appheader>
// );

