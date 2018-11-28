//////// not used
class Hkinput extends Component {
    handleChange = (event) => {	this.props.onChange( this.props.hkid, event.target.name, event.target.value );    }
    
    render () {	    return (
<div>
   <input name="period" type='text' onChange={this.handleChange} value={this.props.hkinput.period} placeholder="period"    /> 
   <input name="title"  type='text' onChange={this.handleChange} value={this.props.hkinput.title}  placeholder="Title"    /> 
</div>
   );	}
}
//class WorkExperience0 extends Component {
//    constructor(props) {
//        super(props);
//        this.state = { hkinputs: [ {period: "1970", title: "engineer"} ]  };
//    }
//    funcone = (id, key, value) => {
//	let newinput = this.state.hkinputs[id];
//	newinput.key = value;
//	let newinputs = [ ...this.state.hkinputs.slice(0, id), newinput, ...this.state.hkinputs.slice(id+1, this.state.hkinputs.length) ];
//	this.setState( {hkinputs: newinputs} );
//   }
//    render() {
//	const raul = this.state.hkinputs.map( (hkinput, id) => { return ( <Hkinput hkid={id} hkinput={hkinput}  onChange={this.funcone} /> ); } );
//	return raul;
