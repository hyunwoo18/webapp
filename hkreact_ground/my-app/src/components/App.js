import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider }            from 'react-redux';

import uuid from 'uuid';
import HireeContainer     from './HireeContainer';
import HirerContainer     from './HirerContainer';
import ESGLoginContainer  from './ESGLoginContainer';
import BinaryContainer    from './BinaryContainer';
import ChattContainer     from './ChattContainer';
import FrekContainer      from './FrekContainer';

import HmainContainer     from './HmainContainer';

import {Mainground, Hkbtndanger, Hhr} from './ESGMainContainer';
import {Header} from './VariousHeaders';
import {Hkform} from './SignupForms';

import * as firebase from 'firebase';
import 'firebase/auth';

//// begin reducer
const reducer = combineReducers( { 
				    activeThreadId: activeThreadIdReducer, 
				    threads:        threadsReducer, 
				    myresume:       resumeReducer, 
                                    postings:       postingsReducer,
				    uploadmessage:  uploadmsgReducer,
				    fbuser:         fbuserReducer,
				    allusers:       allusersReducer,
				    allfriends:     allfriendsReducer,
				    allpending:     allpendingReducer,
    } );

// take current state and an action AND return a new state
function activeThreadIdReducer(state = '1-fca2', action) {
    if ( action.type === 'OPEN_THREAD' ) { return action.id; } 
    else                                 { return state;  }
}
function resumeReducer(state={ fname: 'messi', lname: 'iniesta', company: 'apple', workarray:[ {period: "1970", title: "engineer"} ], }, action) {
    if ( action.type === 'UPDATE_RESUME' ) { console.log("update resume dispatch called");  return action.myresume; } 
    else                                   { return state;  }
}
function postingsReducer(state=[], action) {
    if ( action.type === 'ADD_POSTING' ) { 
	console.log("add new post dispatch called");  
	
        let newarray = state.slice();
        newarray.push( action.newposting );

	let newerarray = newarray.map( (onepost, id) => { onepost.hkid = id; return onepost; } );
	console.log( newerarray );
	return newerarray;
    } 
    else                                   { return state;  }
}
// take current state and an action AND return a new state
function threadsReducer(state = [
 {  id: '1-fca2',    title: 'Aldrin',  messages: messagesReducer(undefined, {}), },
 {  id: '2-be91',    title: 'Colins',  messages: messagesReducer(undefined, {}), },  ], action) {
    switch (action.type) {
    case    'ADD_MESSAGE':
    case 'DELETE_MESSAGE': {
      const threadIndex = findThreadIndex(state, action);
      const oldThread = state[threadIndex];
      const newThread = {	  ...oldThread,	  messages: messagesReducer(oldThread.messages, action),       };
      return [	      ...state.slice(0, threadIndex),	      newThread,	      ...state.slice( threadIndex + 1, state.length ),	      ];
    }
    default: { return state; }
    } // end switch
}
function findThreadIndex(threads, action) {
    switch (action.type) {
      case    'ADD_MESSAGE': { return threads.findIndex( (t) => t.id === action.threadId );      }
      case 'DELETE_MESSAGE': { return threads.findIndex( (t) => t.messages.find((m) => ( m.id === action.id )) ); }
    default: { console.log("what"); }
    }
}
function messagesReducer(state = [], action) {
    switch (action.type) {
      case 'ADD_MESSAGE': {
	const newMessage = { text: action.text, timestamp: Date.now(), id: uuid.v4(), };
	return state.concat( newMessage );
      }
      case 'DELETE_MESSAGE': { return state.filter( m => m.id !== action.id );     }
      default:               { return state; }
    } // end switch
}
//// end reducer //////////////////////////////

///////////////// begin Chatt Reducer
function uploadmsgReducer(state = 'initial message', action) {
    if ( action.type === 'UPLOAD_MESSAGE' ) { 

	console.log("upload msg reducer called");

	const newMessage = {
	    timestamp: Date.now(),
	    mid:       uuid.v4(),
	    msg:    action.mymessage,
	    author: action.email,
	    uid:    action.uid,
	    fid:    action.fid,
	}

	console.log( newMessage );

	console.log("upload msg reducer called end");

	//let mid1 = newMessage.uid;
	//let mid2 = mid1.concat('-').concat(newMessage.fid);
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	let mid1 = newMessage.uid;
	let mid2 = newMessage.fid;;
        var months = [mid1, mid2];
	months.sort();
	let mid3 = months[0];
	let mid4 = months[1];
        let mid5 = mid3.concat('-').concat(mid4);

	console.log( mid5 );

	//firebase.database().ref('users/' + uid ).set( { name: hkname, current: current, past: uploadarray} );

	//handleRequest(param) {
	//    var hkref = firebase.database().ref( 'users/' + this.state.user.uid + '/friendrequests');
	//    var newrequest = hkref.push();
	//    var uploadarray2 = {
	//	inviter: this.state.user.uid,
	//   };
	//   newrequest.set( uploadarray2 );

	var hkref = firebase.database().ref( 'messages/' + mid5);
	var newrequest = hkref.push();
	newrequest.set( newMessage );
	//firebase.database().ref('messages/' + mid2).push(newMessage);
	return newMessage; 
    } 
    else                                    { return state;  }
}

function fbuserReducer(state = 'initial message', action) {
    if ( action.type === 'SET_FBUSER' ) { 
	console.log("fbuser reducer called");
	console.log(action.fbuser.uid);
	// by returning action.fbuser here, the following line is made possible
	// const mapStateToThreadProps    = (state)    => ( { fbuser: state.fbuser, } );
	return action.fbuser; 
    } 
    else                                    { return state;  }
}
function allusersReducer(state = [], action) {
    if ( action.type === 'SET_ALLUSERS' ) { 
	console.log("all users reducer called");
	console.log(action.allusers);
	return action.allusers; 
    } 
    else                                    { return state;  }
}
function allfriendsReducer(state = [], action) {
    if ( action.type === 'SET_ALLFRIENDS' ) { 
	console.log("all friendss reducer called");
	console.log(action.allfriends);
	return action.allfriends; 
    } 
    else                                    { return state;  }
}
function allpendingReducer(state = [], action) {
    if ( action.type === 'SET_ALLPENDING' ) { 
	console.log("all pendings reducer called");
	console.log(action.allpending);
	return action.allpending; 
    } 
    else                                    { return state;  }
}
///////////////// enddd Chatt Reducer


//const store = createStore(reducer);
class App extends Component {
    constructor(props) { 
       	super(props);
	this.state = { user:null,  myfriendsids: [],   myusers: [] };      
	//this.state = { user: this.props.fbuser,	    newMessage: '' ,      };
    };
    // action
    setUserfb     = (fbuser) => {    return { type: 'SET_FBUSER',     fbuser:     fbuser }; }
    setAllUsers   = (aluser) => {    return { type: 'SET_ALLUSERS',   allusers:   aluser }; }
    setAllFriends = (alfrid) => {    return { type: 'SET_ALLFRIENDS', allfriends: alfrid }; }
    setAllPending = (alfrid) => {    return { type: 'SET_ALLPENDING', allpending: alfrid }; }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(  user => {
                if (user) {
                    console.log( user.email )
                    console.log( user.uid )
		    // this works! great finding!
		    store.dispatch( this.setUserfb( user ) );
                    this.setState(  { user }  );

		    ////////////
		    ////////////
		    let newarray2 = [];
		    let newarray3 = [];
		    firebase.database().ref(  'users/' + user.uid + '/friendrequests'  ).on('value', snapshot => {

			    snapshot.forEach(  childSnapshot => {
				    let localKey = childSnapshot.key;
				    let localObj = childSnapshot.val();
				    
				    if (        (localObj.answer === 'yes') &&  (this.state.user.uid === localObj.inviter) ) {
					newarray2.push( localObj.invitee );
				    } else if ( (localObj.answer === 'yes') &&  (this.state.user.uid === localObj.invitee) ) {
					newarray2.push( localObj.inviter );
				    } else if ( localObj.answer === 'maybe' &&  (this.state.user.uid !== localObj.inviter) ) {
					var hkref_oneuser = firebase.database().ref( 'users/' + localObj.invitee);
					hkref_oneuser.once( 'value', snapshot2 => {
						if ( snapshot2.val() ) {
						    let newarray = this.state.myPendings.slice();
						    let newObj = snapshot2.val();
						    newObj.inviteeKey = localKey;
						    newObj.inviterKey = localObj.inviterkey;
						    newObj.inviter    = localObj.inviter;
						    newarray3.push( newObj );
						    //this.setState(  { myPendings : newarray } );
						}
					    } );

				    } 

				}); // end of forEach
			    store.dispatch( this.setAllFriends( newarray2 )   );
			    store.dispatch( this.setAllPending( newarray3 )   );

			});	//this.setState(  { myfriendsids : newarray2 } );
		    ////////////
		    ////////////

                } else {  this.props.history.push('/login');     }
            }  );
	////////////



	///////////////////
	let newarray1 = [];
        var hkref_allusers = firebase.database().ref( 'users/' );
        hkref_allusers.on( 'value', snapshot => {
                snapshot.forEach(  childSnapshot => {
			let localKey = childSnapshot.key;
			let localObj = childSnapshot.val().name;
			let newentry = { thekey: localKey, thename: localObj };
			newarray1.push( newentry );
		    } );
		store.dispatch( this.setAllUsers( newarray1 )   );
		//this.setState(  { myusers : newarray1 } );
            });
	//this.setState(  { myusers : newarray1 } );


	////////////////////////

    }

    handleLogout = () => {        firebase.auth().signOut();        this.setState( {user:null} );    };

    onLogin =() => { this.props.history.push("/");    }

    render() {	
	return ( <div> 	 

<Mainground>
		 { this.state.user &&
<div>
<Header>
<Hkbtndanger> <Link to='/hiree'> Hiree </Link> </Hkbtndanger>
<Hkbtndanger> <Link to='/hirer'> Hirer </Link> </Hkbtndanger>
<Hkbtndanger> <Link to='/chatt'> Chatt </Link> </Hkbtndanger>
<Hkbtndanger> <Link to='/binary'> FriendRequest </Link> </Hkbtndanger>
<Hkbtndanger onClick={this.handleLogout}> Logout </Hkbtndanger>
</Header>
<Hhr />
</div>						       
    }

		 <Route   path="/binary"  component={FrekContainer} />

{this.state.user?(<Route path="/hiree" render={({match})=> {return (<HireeContainer match={match}/>);}} />):(<Route path="/hiree" render={()=>(<Redirect to='/login' />)} />)}
		 <Route   path="/hirer"  component={HirerContainer} />
		 <Route   path="/chatt"  component={ChattContainer} />

		 <Route       path="/login" render={ () => ( <ESGLoginContainer onLogin={this.onLogin} /> ) } />
{this.state.user && <Route exact path="/"   render={ () => ( <HmainContainer fuser={this.state.user} handleOut={this.handleLogout}  />) }  />  }
		 
</Mainground>
		 </div>    );
    } // end render
}

//		 <Route   path="/binary"  render={ ()=>(<FrekContainer/>) } />
//		 <Route   path="/hiree"   render={ ()=> { 
//			 let raul18;
//			 if (this.state.user)  { raul18 = <HireeContainer />; } else { raul18 = <Redirect to='/' />; }  
//                       let raul = this.state.user ? (<HireeContainer />) : (<Redirect to='/' />);
//			 return ( 		     {raul18}				 );
//		     } } />


//		 <Route   path="/hiree"   render={ () => { 
//<Route   path="/hiree"  component={HireeContainer} />

/////////////////////////////
// https://github.com/rt2zz/redux-persist
//https://stackblitz.com/edit/redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

// withRouter(App) should be inside <BrowserRouter>
// and <Provider store={store}> should be also inside <BrowserRouter>
// update:<Provider store={store}> should include <PersistGate loading={null} persistor={persistor}> which then includes  <BrowserRouter>
const Apphk = withRouter(App);
const WrappedApp = () => (

    <Provider store={store}>  
        <PersistGate loading={null} persistor={persistor}>

<BrowserRouter basename='/'>
 	    <Apphk />  
</BrowserRouter>

        </PersistGate>
    </Provider> 

 );

export default WrappedApp;
