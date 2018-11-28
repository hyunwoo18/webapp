import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import HireeContainer     from './HireeContainer';
import HirerContainer     from './HirerContainer';
import ESGLoginContainer  from './ESGLoginContainer';
import BinaryContainer    from './BinaryContainer';
import ChattContainer     from './ChattContainer';

import {Mainground, Hkbtndanger, Hhr} from './ESGMainContainer';
import {Header} from './VariousHeaders';
import {Hkform} from './SignupForms';

import * as firebase from 'firebase';

class HmainContainer extends Component {
    constructor(props) { 
	super(props); 	
        this.state = { hkname:'',   hkcurrent:'' };
	//console.log( "the match = " );	console.log( this.props.match.path );
    }

    componentDidMount() {
        console.log( "main 1" );
        console.log( this.props.fuser.uid );
        console.log( "main 2" );
        firebase.database().ref( 'users/' + this.props.fuser.uid ).on('value', snapshot => {
                if ( snapshot.val() ) {
                    this.setState( { hkname:    snapshot.val().name } );
                    this.setState( { hkcurrent: snapshot.val().current } );
                    console.log( "there is resume" );
                    console.log( snapshot.val().name );
                } else { console.log( "no resume" ); }
            });
    };

    render() {	
	//const matchPath = this.props.match.path;

	return ( 
<div>

<h1> Hello, {this.state.hkname} at {this.state.hkcurrent} </h1>

</div>
		 );


    } // end render
}
export default HmainContainer;
