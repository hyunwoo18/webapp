import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import { connect }     from 'react-redux';

//////////////////////////////////////////
class PostingPresenter extends Component {
    constructor(props) {        super(props);   
	this.postings = this.props.postings;    
    };
    render() { 	
	const matchPath = this.props.match.path;
	let path0=matchPath;  //let path1=path0.concat("/:postId");
return (
<div>

<div> {
   this.postings.map( (post)=>( 
      <div key={post.hkid}> <NavLink to={`${matchPath}/${post.hkid}`} > {post.jobtitle} </NavLink> <br /> </div> ) )
} </div>

<hr />
<Switch>
<Route       path={`${matchPath}/:id`} render={  ({ match }) => {
		//console.log( match.params.id );
		//const oneposting = this.postings.find( (a) => a.hkid == match.params.id  ); using ===(three =) errors
		const oneposting = this.postings.find( (a) => a.hkid == match.params.id  );
		return ( <Onepost post={oneposting} /> ); } } />

<Route exact path={matchPath} render={ ()=>( <div> <h3>Please select an album on the left</h3> </div>   )} />
</Switch>
</div>
	); // end return
    } // end render
}
//		return ( <Onepost post={oneposting} postingsPathname={matchPath} /> ); } } />
const Onepost2  = (props) => ( <h1> Job Title {props.f}</h1> );
const Onepost  = (props) => (
<div>
<h1> Job Title </h1>
<h2> {props.post.jobtitle} </h2>
<h1> Job Location </h1>
<h2> {props.post.location} </h2>
<h1> Job Description </h1>
<h2> {props.post.description} </h2>
</div>
	     );
//https://medium.com/mofed/reduxs-mysterious-connect-function-526efe1122e4
//https://github.com/reduxjs/react-redux/blob/master/docs/api.md
const mapStateToPostingPresenterProps    = (state, props)    => ( { postings: state.postings, match:props.fmatch } );
const mapDispatchToPostingPresenterProps = (dispatch) => ( { onMessageClick: (post) => ( dispatch( addPosting(post) ) )  } );
function addPosting(post) {    return { type: 'ADD_POSTING',  newposting: post, };   }

const ListPostingsContainer = connect( mapStateToPostingPresenterProps, mapDispatchToPostingPresenterProps )( PostingPresenter );

//const mergePostingPresenterProps = (stateProps, dispatchProps, ownProps) => ( { ...stateProps,  ...dispatchProps, ...ownProps, } );
//const ListPostingsContainer = connect( mapStateToPostingPresenterProps, mapDispatchToPostingPresenterProps, mergePostingPresenterProps )( PostingPresenter );

export default ListPostingsContainer;
//return (
//<div>
//     <table>  
//      <thead> <tr>  <th> Job Title </th>  <th> Location </th>  <th> Description </th>  </tr>  </thead>
//        <tbody>
//     {
//	this.postings.map( (track) => ( <tr key={track.id}> <td>{track.jobtitle}</td> <td>{track.location}</td> <td>{track.description}</td> </tr> ))  }
//        </tbody>
//     </table>
//</div>
//  )  
