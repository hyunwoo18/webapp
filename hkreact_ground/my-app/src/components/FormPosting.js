import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect }  from 'react-redux';

//////////////////////////////////
const PostingPresenter = (props) => ( <div>  <ResponsiveResume {...props} />  </div>  );

const mapStateToPostingPresenterProps    = (state)    => ( { myresume: state.myresume, } );
const mapDispatchToPostingPresenterProps = (dispatch) => ( { onMessageClick: (post) => ( dispatch( addPosting(post) )  ), } );
function addPosting(post) {    return { type: 'ADD_POSTING',  newposting: post, };   }

const FormPostingContainer = connect( mapStateToPostingPresenterProps, mapDispatchToPostingPresenterProps )( PostingPresenter );

///////// PaymentForm materials 

// called by PostingPresenter
class ResponsiveResume extends Component {
    constructor(props) {
        super(props);
	this.jkfname  = null;
	this.jklname  = null;
	this.jkcompy  = null;
	this.state = { redirect: false, hkfname:this.jkfname, hklname:this.jklname, hkcompy:this.jkcompy, hkinputs: this.jkinputs };
    }

    baseSave = () => {
	let tempposting = { jobtitle: this.state.hkfname, location: this.state.hklname, description:this.state.hkcompy }
	this.props.onMessageClick( tempposting );
    }
    submitClick = () => {
	this.baseSave();
	this.setState( {redirect: true}  );
    };

    handleFnameChange = event => {	this.setState({ hkfname: event.target.value });    };
    handleLnameChange = event => {	this.setState({ hklname: event.target.value });    };
    handleCompyChange = event => {	this.setState({ hkcompy: event.target.value });    };

    renderRedirect = () => {	if (this.state.redirect) {	    return <Redirect to='/hirer/main1' />	}    }

    render() {
	return (
		<Container>  {this.renderRedirect()}    <form>   <h1> Basic Information </h1>

<Row><Col25> <Label for="fname">Job Title</Label></Col25>
<Col75>  <Input type="text" onChange={this.handleFnameChange} name="fname" value={this.state.hkfname} placeholder="first name" /></Col75></Row>

<Row><Col25> <Label for="fname">Location</Label></Col25>
<Col75>  <Input type="text" onChange={this.handleLnameChange} name="lname" value={this.state.hklname} placeholder="lirst name" /></Col75></Row>

<Row><Col25> <Label for="fname">Description</Label></Col25>
<Col75>  <Input type="text" onChange={this.handleCompyChange} name="compy" value={this.state.hkcompy} placeholder="compy name" /></Col75></Row>

<Row> <CheckoutButton  onClick={ ()=>this.submitClick() } /> </Row>

</form> </Container> );
    }
}

/// part 3
const CheckoutButton = (props) => (
 <CheckoutButtonStyled>  <button type="button" onClick={props.onClick} >Submit your resume</button>  </CheckoutButtonStyled> );
const CheckoutButtonStyled = styled.div`     padding: 0 20px; text-align: center;
button {
    background: #ffa181;    color: white;    border: 0;    border-radius: 2px;    font-family: 'Lato', sans-serif;
    width: 100%;    font-size: 13px;    text-transform: uppercase;    font-weight: 300;    outline: none;    padding: 10px 0;
    margin-bottom: 10px;
    &:hover {	background: #ff8e67;    }
    &:active {        -webkit-transform: scale(0.99);        transform: scale(0.99);    }
}
span { font-size: 11px; color: #bfbfbf;    font-weight: 300;    text-align: center;}
`;


// wmoore
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const Row = styled.div`        display: flex;    flex-wrap: wrap;    margin: 0 -16px; `;
const Col = styled.div`  padding: 0 16px; `;
const Col25 = Col.extend` flex: 25%; `;
const Col50 = Col.extend` flex: 50%; `;
const Col75 = Col.extend` flex: 75%; `;

const Container  = styled.div`     border-radius: 5px;    background-color: #f2f2f2;    padding: 20px; 
& h1 { text-align: left}
`;

const Label = styled.label`     padding: 12px 12px 12px 0;    display: inline-block; `;
const Input = styled.input`     width: 100%;padding: 12px;border: 1px solid #ccc;border-radius: 4px;resize: vertical; `;

////////////////////////////////////////////////////////////

export default FormPostingContainer;
