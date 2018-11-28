import React, { Component } from 'react';
//import { Button, Grid, Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';
import Header from './Header';
import ReactDOMServer from 'react-dom/server';
import './toolkit.css';

const fetch = require("node-fetch");

var divStyle = {    'borderStyle': 'solid',    'borderWitdh': '5px' };

function Mycomp(props) {
    const sidebar = (
<dl>
<dd className="clear"></dd>
<dt> Basic </dt>
<dd> Name: {props.limObject.name} </dd>

<dd className="clear"></dd>
<dt> Current </dt>
<dd> Company: {props.limObject.current} </dd>

<dd className="clear"></dd>
<dt> Experience </dt>
<dd>
    { props.limObject.past.map( (item,i) => { return (<div key={i} style={divStyle}> <h2> {item.title} <span>{item.period}</span> </h2><p>{item.description}</p> </div> );})}
</dd>
</dl>   );
    return (    <div>    {sidebar}    </div> );
}

class FreqContainer extends Component {
    constructor(props) {
	super(props);
	this.showResume     = this.showResume.bind(this);
	this.handleRequest  = this.handleRequest.bind(this);
	this.handleResponse = this.handleResponse.bind(this);
        this.state = {user: this.props.fuser, myusers: null,  myusersids:[], myfriendsids: [],
                      myCopy: null, requestbool: false,
                      myRequest: null,    myPendings: [{name:"dummy"}]    };
    }

    componentDidMount() {
	//let userlist;
	var hkref_allusers = firebase.database().ref( 'users/' );
	hkref_allusers.on( 'value', snapshot => {
		if ( snapshot.val() ) {
		    const local_object = snapshot.val();
		    this.setState( { myusers:                local_object   } );
		    this.setState( { myusersids: Object.keys( local_object ) } );
		}
	    });
	//////////////////////////////////////////////////////
        firebase.database().ref(  'users/' + this.state.user.uid + '/friendrequests'  ).on('value', snapshot => {

		snapshot.forEach(  childSnapshot => {
		    let localKey = childSnapshot.key;
		    let localObj = childSnapshot.val();

		    if ( localObj.answer === 'maybe' &&  this.state.user.uid !== localObj.inviter ) {
			var hkref_oneuser = firebase.database().ref( 'users/' + localObj.invitee);			
			hkref_oneuser.once( 'value', snapshot2 => {
				if ( snapshot2.val() ) {
				    let newarray = this.state.myPendings.slice();
				    let newObj = snapshot2.val();
				    newObj.inviteeKey = localKey;
				    newObj.inviterKey = localObj.inviterkey;
				    newObj.inviter    = localObj.inviter;
				    newarray.push( newObj );
				    this.setState(  { myPendings : newarray } );
				}
			    } );

		    } else if ( (localObj.answer === 'yes') &&  (this.state.user.uid === localObj.inviter))  {
			let newarray1 = this.state.myfriendsids.slice();
			newarray1.push( localObj.invitee );
			this.setState(  { myfriendsids : newarray1 } );
		    } else if ( (localObj.answer === 'yes') &&  (this.state.user.uid === localObj.invitee) ) {
			let newarray2 = this.state.myfriendsids.slice();
			newarray2.push( localObj.inviter );
			this.setState(  { myfriendsids : newarray2 } );
		    }

		    }); // end of forEach
	    });
    }

    handleLogout = () => {
        firebase.auth().signOut();
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    postData = (url, data) => {
	return fetch( url, { body: JSON.stringify(data),  headers: { 'content-Type': 'application/json' }, method: 'POST' } )
    };
    handleRequest(param) {
	var hkref = firebase.database().ref( 'users/' + this.state.user.uid + '/friendrequests');
	var newrequest = hkref.push();
        var uploadarray2 = {
	    inviter: this.state.user.uid,
	    invitee: param,
	    inviterkey: newrequest.key,
	    answer: 'maybe',
	    level: 1
	};
	newrequest.set( uploadarray2 );

	this.postData('https://us-central1-hkact1-22444.cloudfunctions.net/hkHello', uploadarray2 )
	    .then(   data => console.log(   data  )  )
	     .catch( error => console.error( error )  )
    };

    showResume( hkkey ) {  
	let hkobject = this.state.myusers[hkkey];

	// need to reset this boolean for each click
	this.setState(  {requestbool: false } );

	this.setState(  {myCopy: <Mycomp limObject={hkobject} /> } );

	if ( ! this.state.myfriendsids.includes( hkkey ) ) {
	    this.setState(  {requestbool: true } );
	}
	this.setState(  {myRequest: hkkey } );
    }

    handleResponse(id, inviteeKey, inviterKey, inviterId,  param_answer ) {
	var hkref = firebase.database().ref( 'users/' + this.state.user.uid + '/friendrequests/' + inviteeKey );
	hkref.update(  {answer: param_answer } );

	let answer2 = {
	    inviter:    inviterId,
	    inviterkey: inviterKey,
	    answer: param_answer
	};
	this.postData('https://us-central1-hkact1-22444.cloudfunctions.net/hkResponse', answer2 )
	    .then(   data => console.log(   data  )  )
	    .catch( error => console.error( error )  );

	let newarray2 = [...this.state.myPendings];
        newarray2.splice( id, 1 );
	this.setState(  { myPendings: newarray2 } );
    };

    /////////////////////////////////
    render() {	

return (

<div className="freqheight">
<header className="Hader">
<Header> <div className="hkbtn hkinfo" onClick={this.handleLogout}>Logout</div>  </Header>
</header>

<hr className="mt-5" />

    {/* ================================================ */}

<div className="container">
    <div className="row">

    {/* ========= LEFT ======================================= */}
      <div className="col-md-3 sidebar">
        <nav className="sidebar-nav">

          <div className="sidebar-header">
            <button className="nav-toggler nav-toggler-md sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-md">
              <span className="sr-only">Toggle nav</span>
            </button>
            <a className="sidebar-brand img-responsive" href="index.html"> <span className="icon icon-leaf sidebar-brand-icon"></span>  </a>
          </div>

          <div className="collapse nav-toggleable-md" id="nav-toggleable-md">
            <ul className="nav nav-pills nav-stacked flex-column">
              <li className="nav-header">Dashboards</li>
              <li className="nav-item"> <a className="nav-link active">Overview</a> </li>
              <li className="nav-item"> <a className="nav-link">Link 1</a>   </li>
              <li className="nav-header">Users</li>

    { this.state.myusersids.map( (key, id) => {  
        let tempElement;
	if ( this.state.user.uid !== key) {
  tempElement=(<li key={id} className="nav-item" onClick={this.showResume.bind(this,key)}>
<a className="nav-link"> {this.state.myusers[key].name}({this.state.myusers[key].current}) </a> </li>);
	}
	return tempElement;
	    } ) }

              <li className="nav-header">Friends</li>

    { this.state.myusers && this.state.myfriendsids.map( (key, id) => {  
return (<li className="nav-item"> <a className="nav-link"> {this.state.myusers[key].name} </a> </li>);
	    }  ) }

            </ul>
          </div>


    { this.state.myPendings.map( (item, id) => {  
		let tempElement2;
		if ( item.name !== "dummy" ) {
		    let locInviteeKey = item.inviteeKey;
		    let locInviterKey = item.inviterKey;
		    let locInviterId  = item.inviter;
		    tempElement2 =( 
<div className="well">    
<p> {item.name} ( {item.current} ) </p>  
<div className="hkbtn hkwarning" onClick={ this.handleResponse.bind(this,id,locInviteeKey,locInviterKey,locInviterId,'yes') }>Accept</div> 
<div className="hkbtn hkdanger"  onClick={ this.handleResponse.bind(this,id,locInviteeKey,locInviterKey,locInviterId,'no' ) }>Decline</div>
</div>
);
		}
		    return tempElement2;
	    }  ) }

        </nav>
      </div>
    {/* ========= End LEFT ======================================= */}


    {/* ========== MAIN ====================================== */}
      <div className="col-md-9 content">

          <div className="dashhead">
            <div className="dashhead-titles">
                <h6 className="dashhead-subtitle">Dashboards</h6>
                <h2 className="dashhead-title">User Resume Window</h2>
            </div>
          </div> 

          <div>
            <div dangerouslySetInnerHTML={ {__html: ReactDOMServer.renderToStaticMarkup( this.state.myCopy ) } } />   
	  {this.state.requestbool && 
		  <div className="hkbtn hkinfo" onClick={ this.handleRequest.bind(this, this.state.myRequest) }>Friend Request</div>}
            </div>
         </div>
    </div>
    {/* ================End Main ================================ */}

</div>
</div>

	);    }
}

export default FreqContainer;
