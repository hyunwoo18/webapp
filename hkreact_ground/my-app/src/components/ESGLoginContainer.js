import React, { Component } from 'react';
import styled from 'styled-components';

import LoginPresenter from './LoginPresenter';

import hat from './header-bg.jpg';

const        Hero=styled.div` color:white; width:100%; position:relative; background-size:cover; min-height:800px; background-image:url(${hat});`;
const HeroContent=styled.div` position: relative;  z-index: 4;  width: 500px;  left: 10vw;  top: 10vw; `;

const HeroOverlay = styled.div`
  background: -webkit-linear-gradient(top, #221f1f 0%, rgba(34, 31, 31, 0) 100%);
  background: linear-gradient(to bottom, #221f1f 0%, rgba(34, 31, 31, 0) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 );
  height: 100%;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
`;

//const Button = styled.a`
const Button = styled.button`
    background: transparent;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 200px;
    height: 44px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-decoration: none;
    color: #ffffff;
padding: 20px;
//padding: 10px;
    box-sizing: border-box;
    border: 2px solid rgba(245, 245, 241, 0.2);
    border-radius: 44px;
    font-size: 14px;
    font-weight: 600;
    -webkit-transition: border .125s ease, background .125s ease;
    transition: border .125s ease, background .125s ease;

    &:hover {    border: 2px solid #f5f5f1; }
    &[data-primary='true'] {    border: 2px solid #e50914; }
    &[data-primary='true']:hover {    background: #e50914; }
    &:first-child {    margin-right: 10px;  }
`;

const Button2 = styled.button`
    margin-left: 400px;
    background: transparent;
    height: 44px;
    width: 100px;
    color: #ffffff;
//    padding: 20px; this is causing the text to sink
    box-sizing: border-box;
    border: 2px solid rgba(245, 245, 241, 0.2);
//    border-radius: 44px;
    font-size: 14px;
    font-weight: 500;
    transition: border .125s ease, background .125s ease;

    &:hover                      { border: 2px solid #f5f5f1; }
    &[data-primary='true']       { border: 2px solid #e50914; }
    &[data-primary='true']:hover {    background: #e50914; }
    &:first-child {    margin-right: 10px;  }
`;

//    render() {    return (   <a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>  );    }
class HeroButton extends Component {
    render() {    return (   
  <Button onClick={this.props.onClick} data-primary={this.props.primary}> {this.props.text} </Button>  
//<Button href="#"  className="Button" data-primary={this.props.primary}> {this.props.text} </Button>  
    );    }
}
class HeroButton2 extends Component {
    render() {    return (   <Button2 data-primary={this.props.primary} onClick={this.props.onClick}>{this.props.text}</Button2>  );    }
}

const ButtonWrapper = styled.div` display:-webkit-box; display:-webkit-flex; display:-ms-flexbox; display:flex; width:400px; margin-top: 30px; `;

/////////////////////////////////////////////
class ESGLoginContainer extends Component {

    constructor(props) {
        super(props);
    }

    onLogin = () => { 
	console.log("onLogin in ESGLogin called" );
	this.props.onLogin();    
    }

    render() { 	return (
<div>
<LoginPresenter   onLogin={this.onLogin}  />

<Hero>

    <HeroContent>
       <h2>Jobs Site!</h2>
    </HeroContent>

    <HeroOverlay>      </HeroOverlay>

</Hero>
</div>
     );
    }
}

export default ESGLoginContainer;
