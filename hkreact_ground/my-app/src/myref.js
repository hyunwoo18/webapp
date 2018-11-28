class Jkinput extends Component { render () { return ( <div> <BaseInput testref={this.props.refPeriod} /> <BaseInput testref={this.props.refTitle} /> </div> );	 }   }

const BaseInput = ( props ) => ( <input ref={props.testref} /> );

class WorkExperience extends Component {
    constructor(props) {
	this.nameRef = null;
	this.cmpyRef = null;
    }

    submitClick = () => {
	const result = jkinputs.map( jkinput => ( {period: jkinput.periodRef.value, title: jkinput.titleRef.value} ) );
	let tempresume = { name: this.nameRef.value, company: this.cmpyRef.value, workarray: result }
	this.props.onMessageClick( tempresume );
    }

    render() {
return (

<form> 

<BaseInput  testref={ elem => this.nameRef=elem } />
<BaseInput  testref={ elem => this.cmpyRef=elem } />

{  jkinputs.map( jkinput => { return ( <Jkinput refPeriod={elem => jkinput.periodRef=elem} refTitle={elem => jkinput.titleRef=elem} /> ); } )   }

</form>

<CheckoutButton  onClick={ () => this.submitClick() } />

	); // end return
    } // end render
}

<Jkinput periodVal={jkinput.period} titleVal={jkinput.title} refPeriod={elem => jkinput.periodRef=elem} refTitle={elem => jkinput.titleRef=elem} /> 