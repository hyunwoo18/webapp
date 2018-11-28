import React, { Component } from 'react';
import styled from 'styled-components';
import { connect }  from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import {Hside, Hcenter, Fnav, Fsidebarheader, Fsidebarmain, Ulnavflexcolumn, Specialli, Lii}   from './CommonContainer';
import {Hkbtndanger}   from './ESGMainContainer';

import * as firebase from 'firebase';
// jmay

class FrekContainer extends Component {
    constructor(props) {  
	super(props);    
    }
    render() {
	const matchPath = this.props.match.path;
	return ( <Entirepage> <MainContainer {...this.props}  matchpath={matchPath}  />  </Entirepage>    );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Entirepage = (props) => ( <div> {props.children} </div>  );
const Hcontainer = styled.div` display: flex; height: 100%; width: 100%;`;
////////////////////////////

class MainSection extends Component {
    constructor(props) {  
	super(props);
	this.state = { user: this.props.fbuser,	 newMessage: '' };
    }

    render () {

	let tempbool1 = this.props.allusers;
	// the solution that I finally discovered in the hard way was wrapping any JS logic with <div> inside return ()
	return (
<div>
		{  tempbool1 ? (

                <Hcontainer>

<LeftBarSection matchpath={this.props.matchpath} hkusers={this.props.allusers} hkmyself={this.state.user}  />
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

const mapStateToMainProps    = (state,props) => ( { 
	fbuser:     state.fbuser, 
	allusers:   state.allusers,
	allfriends: state.allfriends,
	//allpending: state.allpending,
	matchpath:  props.matchpath  
    } );
const mapDispatchToMainProps = (dispatch)    => ( { sendMsg: (message,email,uid,fid) => ( dispatch( updateMessages(message, email, uid, fid) )  )  } );
function updateMessages(message, email, uid, fid) {    return { type: 'UPLOAD_MESSAGE',  mymessage: message, email:email,  uid:uid, fid:fid };   }
const MainContainer = connect( mapStateToMainProps, mapDispatchToMainProps )( MainSection );



//////////////////////////
class LeftBarSection extends Component {

    render() {

    return (

<Hside><Fnav> <Fsidebarheader> Sidebar </Fsidebarheader>
<Fsidebarmain> <Ulnavflexcolumn>
<Specialli> My Links </Specialli>
{
    this.props.hkusers.map(  (hkfriend) => {

	    //const onematch = this.props.hkusers.find( (a) => a.thekey == hkfriend );
	    const thename = hkfriend.thename;

	    return <Lii key={hkfriend.thekey}>  <Hkbtndanger> <Link  to={`${this.props.matchpath}/${hkfriend.thekey}`}> {hkfriend.thename} </Link> </Hkbtndanger> </Lii>
	} )

}

</Ulnavflexcolumn> </Fsidebarmain> </Fnav> </Hside>
	    );
    } // end render
}


const RiteBarSection=(props) => ( <Hside>   <h3> Right  </h3>  </Hside>   );
////////////////////////////////////////////////////////////////////////////////////


//<CenterSection  matchpath={this.props.matchpath} hkfriends={this.props.allfriends} hkusers={this.props.allusers} hkmyself={this.state.user} onSubmit={this.props.sendMsg} />
const CenterSection  = (props) => {
    return (
   <Hcenter>

   <Route       path={`${props.matchpath}/:id`} 
   render={  ({ match }) => {
	   return ( <ThreadContainer hkfriends={props.hkfriends}  hkusers={props.hkusers}  frid={match.params.id}   myself={props.hkmyself}   onSubmit={props.onSubmit} />  );
       }
   } />


   <Route exact path={props.matchpath} render={ ()=>( <div> <h3>Please select a User on the left</h3> </div>   )} />
   </Hcenter>
  );
}

export default FrekContainer;
//////////////////////

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


class ThreadContainer extends Component {
    constructor(props) {
        super(props);
	this.state = { user: this.props.myself, };
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

    render() {

	let friendid   =  this.props.frid;
	const onematch =  this.props.hkusers.find( (a) => a.thekey == friendid );
	let thename    = onematch.thename;
	
	console.log( this.state.currentmessages );

	return (
<div>
<h2> Showing messages with the friend number {thename} </h2>

{ !this.props.hkfriends.includes( friendid ) && <Hkbtndanger onClick={ this.handleRequest.bind(this, friendid) }>  Friend Request  </Hkbtndanger> }

</div>
		);

    }

}
