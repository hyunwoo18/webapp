import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect }  from 'react-redux';

///////////// new resume start
//const StyledCheckout=styled.div` margin:auto; background: transparent; width: 80%; `;
//const Checkout = (props) => (      <StyledCheckout>      <WorkExperience {...props} />      </StyledCheckout>  );
// <PaymentForm onSubmit={props.paySubmit} />

const Checkout = (props) => ( <div>  <ResponsiveResume {...props} />  </div>  );

const mapStateToCheckoutProps    = (state)    => ( { myresume: state.myresume, } );
const mapDispatchToCheckoutProps = (dispatch) => ( { onMessageClick: (resume) => ( dispatch( updateResume(resume) )  ), } );
function updateResume(resume) {    return { type: 'UPDATE_RESUME',  myresume: resume, };   }
const ResumeContainer = connect( mapStateToCheckoutProps, mapDispatchToCheckoutProps )( Checkout );

///////// PaymentForm materials 
const Ritle=styled.div` font-family: 'Playfair Display';font-size: 18px;padding: 20px; `;

const BasicInputStyled = styled.div` text-align: center;    padding: 0 20px;  margin-bottom: 20px;
label {    display: block;    text-transform: uppercase;    margin-bottom: 5px;    font-size: 11px;    font-weight: 600; }
input {
    width: 100%;    border: 0;    border-bottom: 1px solid #17183B;    font-family: 'Lato', sans-serif;    padding: 5px 0;
    font-size: 18px;    font-weight: 300;    outline: none;
    &:focus { border-bottom: 1px solid #FFB49A; }
}
textarea {
    width: 100%;    border: 0;    border-bottom: 1px solid #17183B;    font-family: 'Lato', sans-serif;    padding: 5px 0;
    font-size: 18px;    font-weight: 300;    outline: none;
    &:focus { border-bottom: 1px solid #FFB49A; }
} `;
const JkInputStyled = styled.div`  border-style: solid;  border-color: red; `;

class ResponsiveResume extends Component {
    constructor(props) {
        super(props);
	this.jkinputs = this.props.myresume.workarray;
	this.jkfname  = this.props.myresume.fname;
	this.jklname  = this.props.myresume.lname;
	this.jkcompy  = this.props.myresume.company;
	this.fnameRef = null;
	this.lnameRef = null;
	this.compyRef = null;
	//this.state = { redirect: false }; // just for the purpose of implementing a redirect
	this.state = { redirect: false, hkfname:this.jkfname, hklname:this.jklname, hkcompy:this.jkcompy, hkinputs: this.jkinputs };
		       //hkinputs:[{period: "1970", title: "engineer"}] };
	//this.handleDel = this.handleDel.bind(this);
    }
    //componentDidMount() { }
    baseSave = () => {
	//console.log( "name" );	console.log( this.fnameRef.value );	console.log( "company" );	console.log( this.compyRef.value );
	//hkarray.forEach( (i) => { 		console.log( i.periodRef.value ); 		console.log( i.titleRef.value );    } );
	//const result = this.state.hkinputs.map( (jkinput, id) => ( {period: jkinput.periodRef.value, title: jkinput.titleRef.value} ) );
	const result = this.state.hkinputs.map( (jkinput, id) => ( {period: jkinput.period, title: jkinput.title} ) );
	//let tempresume = { fname: this.fnameRef.value,  lname: this.lnameRef.value,     company: this.compyRef.value, workarray: result }
	let tempresume = { fname: this.state.hkfname, lname: this.state.hklname,  company:this.state.hkcompy, workarray: result }
	this.props.onMessageClick( tempresume );
    }
    submitClick = () => {
	this.baseSave();
	this.setState( {redirect: true}  );
    };

    handleFnameChange = event => {	this.setState({ hkfname: event.target.value });    };
    handleLnameChange = event => {	this.setState({ hklname: event.target.value });    };
    handleCompyChange = event => {	this.setState({ hkcompy: event.target.value });    };

    handleAdd = ( ) => {
	let tempinput= {period: 'test', title: 'temp'};
	let newarray = this.state.hkinputs.slice();
        newarray.push( tempinput )
        this.setState(  { hkinputs: newarray } );
    };

    handleDel = ( id ) => {
        let newarray2 = [...this.state.hkinputs];
	var removed = newarray2.splice( id, 1 );
	this.setState( { hkinputs: newarray2 }  );
	// printing state values here is not reliable information because setState is asynchronous operation
	//console.log( this.state.hkinputs );
    };

    funcone = (id, key, value) => {
	let newinput = this.state.hkinputs[id];
	newinput[key] = value;
	let newinputs = [ ...this.state.hkinputs.slice(0, id), newinput, ...this.state.hkinputs.slice(id+1, this.state.hkinputs.length) ];
	this.setState( {hkinputs: newinputs} );
    }

    renderRedirect = () => {	if (this.state.redirect) {	    return <Redirect to='/hiree/main3' />	}    }

    render() {
    const raul = this.state.hkinputs.map( (jkinput, id) => {	    
	    return (
<fieldset key={id}>
<legend> Past </legend>

<Row><Col25> <Label for="period">Period</Label></Col25> 
<Col75> <Hkinput hkid={id} hkinput={jkinput.period} name="period" onChange={this.funcone} /></Col75></Row>

<Row><Col25> <Label for="title">Title</Label></Col25> 
<Col75> <Hkinput hkid={id} hkinput={jkinput.title} name="title" onChange={this.funcone} /></Col75></Row>

<Row> <button type="button" onClick={ ()=>this.handleDel(id) }> Delete </button>   </Row>
</fieldset>		    ); } );
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
	return (
		<Container>  {this.renderRedirect()}    <form>   <h1> Basic Information </h1>

<Row><Col25> <Label for="fname">First Name</Label></Col25>
<Col75>  <Input type="text" onChange={this.handleFnameChange} name="fname" value={this.state.hkfname} innerRef={el=>this.fnameRef=el} placeholder="first name" /></Col75></Row>

<Row><Col25> <Label for="fname">Last  Name</Label></Col25>
<Col75>  <Input type="text" onChange={this.handleLnameChange} name="lname" value={this.state.hklname} innerRef={el=>this.lnameRef=el} placeholder="lirst name" /></Col75></Row>

<Row><Col25> <Label for="fname">CurCompany</Label></Col25>
<Col75>  <Input type="text" onChange={this.handleCompyChange} name="compy" value={this.state.hkcompy} innerRef={el=>this.compyRef=el} placeholder="compy name" /></Col75></Row>

<h1> Career Information <Span onClick={()=>this.handleAdd()}>Add</Span>  </h1>
    {raul}

<Row> <CheckoutButton  onClick={ ()=>this.submitClick() } /> </Row>

</form> </Container> );
    }
}

class Hkinput extends Component {

    handleChange = (event) => {
        this.props.onChange( this.props.hkid, event.target.name, event.target.value );
    }

	render () {
            return (
                    <div>
		    <input name={this.props.name} type='text' onChange={this.handleChange} value={this.props.hkinput} />
                    </div>
                    ) ;
        }
}









const BaseInput = (props) => (
<BasicInputStyled>
<label htmlFor={props.name}>  {props.label}  </label>
<input id={props.name}  defaultValue={props.value} type={props.type} ref={props.testref} placeholder={props.placeholder} />
</BasicInputStyled>     );


const Formleft = styled.form`    text-align: left; `;

//<Hkbtndanger onClick={()=>this.handleAdd()}>Add</Hkbtndanger>  
const Button2 = styled.button`    background: transparent;
display: table-cell;height: 44px;width: 100px;color: red;margin-left:10px;margin-bottom:10px;box-sizing: border-box;border: 2px solid rgba(245, 245, 241, 0.2);
font-size: 14px;font-weight: 500;transition: border .125s ease, background .125s ease;
&:hover                      { border: 2px solid #f5f5f1; }
&[data-primary='true']       { border: 2px solid #e50914; }
&[data-primary='true']:hover {    background: #e50914; }
`;

class HeroButton2 extends Component {
    render() {    return (   <Button2 data-primary={this.props.primary} onClick={this.props.onClick}>{this.props.text}</Button2>  );    }
}
const Tempdiv = styled.div`    display: table; & h3 {    display: table-cell; } `;

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

const HiddenRow = styled.div`  display: none; `;
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

//<Row> <Submit type="submit" value="Submit" /> </Row>
const Submit = styled.input`    background-color: #4CAF50;color: white;padding: 12px 20px;border: none;border-radius: 4px;cursor: pointer;float: right; `;
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
const Span = styled.span` display:inline-block; border: 1px solid red; padding: 2px 4px; &:hover {background-color:red; color:black;} `;

export default ResumeContainer;
