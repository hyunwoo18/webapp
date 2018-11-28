import React, { Component } from 'react';
import styled from 'styled-components';
import { connect }  from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import {Hside, Hcenter, Fnav, Fsidebarheader, Fsidebarmain, Ulnavflexcolumn, Specialli, Lii}   from './CommonContainer';
import {Hkbtndanger}   from './ESGMainContainer';

import * as firebase from 'firebase';
// jmay

//const Checkout = (props) => ( <div>  <ChattPresenter {...props} />  </div>  );
//const mapStateToCheckoutProps    = (state)    => ( { fbuser: state.fbuser, } );
//const mapDispatchToCheckoutProps = (dispatch) => ( { onMessageClick: (resume) => ( dispatch( updateResume(resume) )  ), } );
//function updateResume(resume) {    return { type: 'UPDATE_RESUME',  myresume: resume, };   }
//const ChattContainer = connect( mapStateToCheckoutProps, mapDispatchToCheckoutProps )( Checkout );
//class ChattPresenter extends Component {

// HK. I don't understand but 
// the existence of fmatch={this.props.match} in
// return ( <Entirepage> <MainContainer fmatch={this.props.match}  matchpath={matchPath} hkfriends={this.friends} />  </Entirepage>    );
// makes it work..
// it turns out it doesn't have to be fmatch={this.props.match}, the following also works
// return ( <Entirepage> <MainContainer {...this.props}  matchpath={matchPath} hkfriends={this.friends} />  </Entirepage>    );
// so, what is important is, the flow from ChattContainer MainContainer to MainSection to LeftBarSection and CenterSection
// is somehow severed in terms of how Route works and this is resolved if I put {...this.props} explicitly...
// Also, I need to modify the code such that it waits fully until the data from firebase is fully loaded
// Otherwise, I from time to time keep getting Cannot read property 'thename' of undefined
// because the array is empty which is filled when the firebase DB is fully downloaded..

class ChattContainer extends Component {
    constructor(props) {  
	super(props);    
	//this.friends = [ {id:1, name:'kim1', messages:[{id:1, msg:"fuck you"}] }, {id:2, name:'kim2', messages:[{id:2, msg:"dick head"}] } ]
    }
    render() {
	const matchPath = this.props.match.path;
	return ( <Entirepage> <MainContainer {...this.props}  matchpath={matchPath} hkfriends={this.friends} />  </Entirepage>    );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Entirepage = (props) => ( <div> {props.children} </div>  );
const Hcontainer = styled.div` display: flex; height: 100%; width: 100%;`;
////////////////////////////
//const MainSection = (props) => (

//{this.state.myusers && <LeftBarSection matchpath={this.props.matchpath}  hkfriends={this.state.myfriendsids} hkusers={this.state.myusers} />}
//{this.state.myusers &&  <CenterSection  matchpath={this.props.matchpath} hkfriends={this.state.myfriendsids} hkusers={this.state.myusers} hkmyself={this.state.user} onSubmit={this.props.sendMsg}  /> }

class MainSection extends Component {
    constructor(props) {  
	super(props);
	this.state = { user: this.props.fbuser,	 newMessage: '' };
	//this.tempbool1 = false;
    }

    //componentDidMount() {    };
    render () {
	//console.log( this.state.myfriendsids );
	//console.log("checking all users")
	//console.log( this.state.myusers );
	//console.log("checking all users end")

	let tempbool1 = this.props.allfriends && this.props.allusers;
	// the solution that I finally discovered in the hard way was wrapping any JS logic with <div> inside return ()
	return (
<div>
		{  tempbool1 ? (

                <Hcontainer>

<LeftBarSection matchpath={this.props.matchpath} hkfriends={this.props.allfriends} hkusers={this.props.allusers} hkmyself={this.state.user} hkpending={this.props.allpending} />
<CenterSection  matchpath={this.props.matchpath} hkfriends={this.props.allfriends} hkusers={this.props.allusers} hkmyself={this.state.user} onSubmit={this.props.sendMsg} />

                <RiteBarSection />
                </Hcontainer>
				) : (
<h1> Loading </h1>
				     )
			}
</div>

		);
    }
}

//const mapStateToMainProps    = (state,props)    => ( { fbuser: state.fbuser, matchpath: props.matchpath, match: props.fmatch } );

const mapStateToMainProps    = (state,props) => ( { 
	fbuser:     state.fbuser, 
	allusers:   state.allusers,
	allfriends: state.allfriends,
	allpending: state.allpending,
	matchpath:  props.matchpath  
    } );
const mapDispatchToMainProps = (dispatch)    => ( { sendMsg: (message,email,uid,fid) => ( dispatch( updateMessages(message, email, uid, fid) )  )  } );
function updateMessages(message, email, uid, fid) {    return { type: 'UPLOAD_MESSAGE',  mymessage: message, email:email,  uid:uid, fid:fid };   }
const MainContainer = connect( mapStateToMainProps, mapDispatchToMainProps )( MainSection );



//////////////////////////
class LeftBarSection extends Component {

    handleResponse(id, inviteeKey, inviterKey, inviterId,  param_answer ) {
        var hkref = firebase.database().ref( 'users/' + this.props.hkmyself.uid + '/friendrequests/' + inviteeKey );
        hkref.update(  {answer: param_answer } );

        let answer2 = {
            inviter:    inviterId,
            inviterkey: inviterKey,
            answer: param_answer
        };
        this.postData('https://us-central1-hkact1-22444.cloudfunctions.net/hkResponse', answer2 )
            .then(   data => console.log(   data  )  )
            .catch( error => console.error( error )  );

        //let newarray2 = [...this.state.myPendings];
        //newarray2.splice( id, 1 );
        //this.setState(  { myPendings: newarray2 } );
    };



    render() {
	//this.props.hkfriends && this.props.hkfriends.map(  (hkfriend) => {

    return (

<Hside><Fnav> <Fsidebarheader> Sidebar </Fsidebarheader>
<Fsidebarmain> <Ulnavflexcolumn>
<Specialli> My Links </Specialli>
{
    this.props.hkfriends.map(  (hkfriend) => {

	    const onematch = this.props.hkusers.find( (a) => a.thekey == hkfriend );
	    const thename = onematch.thename;

	    return <Lii key={hkfriend}>  <Hkbtndanger> <Link   to={`${this.props.matchpath}/${hkfriend}`}> {thename} </Link> </Hkbtndanger> </Lii>
	} )

}

<hr />

{ this.props.hkpending.map( (item, id) => {
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


</Ulnavflexcolumn> </Fsidebarmain> </Fnav> </Hside>
	    );
    } // end render
}


const RiteBarSection=(props) => ( <Hside>   <h3> Right  </h3>  </Hside>   );
////////////////////////////////////////////////////////////////////////////////////

//   <Route path={`${props.matchpath}/18`} render={ ()=>( <div> <h3>Matched</h3> </div>   )} />
const CenterSection  = (props) => {
    return (
   <Hcenter>

   <Route       path={`${props.matchpath}/:id`} 
   render={  ({ match }) => {
	   return ( <ThreadContainer   hkusers={props.hkusers}  frid={match.params.id}   myself={props.hkmyself}   onSubmit={props.onSubmit} />  );
       }
   } />


   <Route exact path={props.matchpath} render={ ()=>( <div> <h3>Please select an album on the left</h3> </div>   )} />
   </Hcenter>
  );
}

export default ChattContainer;
//////////////////////


const Author = styled.p`
background-color: white;
font-size: .8em;
display: block;
text-decoration: none;
`;


//const divStyle = {
//    color: 'blue',
//    backgroundImage: 'url(' + imgUrl + ')',
//};
//<div style={divStyle}>   Hello World!   </div>

const msgStyle = {
    margin: '7px 0',
    textAlign: 'right',
    textColor: 'blue',
};

const minStyle = {
    margin: '7px 0',
    textAlign: 'left',
    textColor: 'red',
};



//class ThreadPresenter extends Component {
class ThreadContainer extends Component {
    constructor(props) {
        super(props);
	this.state = { user: this.props.myself, currentmessages: [], newMessage: '' };
    };

    componentDidMount() {

	//var months = ['March', 'Jan', 'Feb', 'Dec'];
	//months.sort();
	//console.log(months);

	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	let mid1 = this.state.user.uid;
	let mid2 = this.props.frid;

	var months = [mid1, mid2];
	months.sort();

	let mid3 = months[0];
	let mid4 = months[1];

	let mid5 = mid3.concat('-').concat(mid4);


	let messageArray = [];

	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
	//https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
	firebase.database().ref( 'messages/' + mid5 ).on('value', snapshot => {

		if ( snapshot.val() ) {

		    snapshot.forEach(      childSnapshot => {
			    let localKey = childSnapshot.key;
			    let localObj = childSnapshot.val();

			    messageArray.push( localObj );

			} ); // end of forEach

		    this.setState( { currentmessages: messageArray }  );

		} // end of if
	    } );

    }

    handleInputChange = e  => {	this.setState({ newMessage: e.target.value });    };
    handleSubmit      = () => {
	this.props.onSubmit( this.state.newMessage, this.state.user.email, this.state.user.uid, this.props.frid );
	this.setState(  {newMessage:''} );    
    };

    //handleKeyDown = () => {  console.log("test2") }

    getAuthor = (msg, nextMsg) => {
	if ( !nextMsg || nextMsg.author !== msg.author ) {
	    return (         <Author>      {msg.author}   </Author> );
	}
    };

    //<div key={msg.mid} className={ (this.state.user.email === msg.author)?msgStyle:minStyle }  > 

    render() {

	let friendid   =  this.props.frid;
	const onematch =  this.props.hkusers.find( (a) => a.thekey == friendid );
	let thename    = onematch.thename;
	
	console.log( this.state.currentmessages );

	return (
<div>
<h2> Showing messages with the friend number {thename} </h2>


<div> 
{ this.state.currentmessages ?	(

<div>
{

this.state.currentmessages.map( (msg,i) => ( 
   <div key={msg.mid} style={ (this.state.user.email === msg.author) ? msgStyle : minStyle}  > 

<p>{msg.msg}</p>

    {this.getAuthor(msg, this.state.currentmessages[i + 1])  }

</div> 

) )
    }
</div>
				 ) : ( 
<h1> Loading </h1> 

)

}



</div>



<div id="chat-input">
<input  placeholder="Add your message..." onChange={this.handleInputChange}  />
<button onClick={this.handleSubmit}>
<svg viewBox="0 0 24 24">   <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />  </svg>
</button>
</div>

</div>
		);

    }

}

//const mapStateToThreadProps    = (state)    => ( { fbuser: state.fbuser, } );
//const mapDispatchToThreadProps = (dispatch) => ( { onMessageClick: (message) => ( dispatch( updateMessages(message) )  ), } );
//function updateMessages(message) {    return { type: 'UPLOAD_MESSAGE',  mymessage: message, };   }
//const ThreadContainer = connect( mapStateToThreadProps, mapDispatchToThreadProps )(  ThreadPresenter  );

