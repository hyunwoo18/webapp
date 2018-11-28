import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
//import ruiz from './Alameda.jpg'; import hats from './hats.jpg';
import { connect }            from 'react-redux';
import PostingsContainer     from './PostingsContainer';
import SlackContainer        from './SlackContainer';
import FormPostingContainer  from './FormPosting';
import ListPostingsContainer from './ListPostingsContainer';

import {Hkbtndanger}   from './ESGMainContainer';
import {Hside, Hcenter, Fnav, Fsidebarheader, Fsidebarmain, Ulnavflexcolumn, Specialli, Lii}   from './CommonContainer';
/////////////////////////////////////////////////////////////
//   <Route    path={path1}  component={Agatha1} />
//const Agatha1 = (props) => (  <img src={ruiz} /> ); //const Agatha2 = (props) => (  <img src={hats} /> ); 
const hklist=[ {id:1,tN:1,name:'mess',dM:1}, {id:2,tN:2,name:'inie',dM:2}, {id:3,tN:3,name:'xavi',dM:3}, ];

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
const Hpage = styled.div` position: absolute; top: 60px; bottom: 0; right: 0; left: 0;`; //const Hpage=styled.div` top:0; `;
const Entirepage = (props) => ( <div> {props.children} </div>  ); //const Entirepage = (props) => ( <Hpage> {props.children} </Hpage>  );
/////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

//		  <CenterSection  matchpath={this.props.matchpath} mylist={hklist} /> 
const Hcontainer = styled.div` display: flex; height: 100%; width: 100%; `;
class MainSection extends Component { 
    render() {
	return( 
		  <Hcontainer> 
		  <LeftBarSection matchpath={this.props.matchpath} />
		  <CenterSection  matchpath={this.props.matchpath} mylist={hklist} /> 
		  <RiteBarSection /> 
		  </Hcontainer> ); }
}
///////////////////////////////////////////////////////

const RiteBarSection = (props) => ( <Hside>   <h3> Right 2 </h3>  </Hside>   );
const LeftBarSection = (props) => {
    let path0=props.matchpath; let path1=path0.concat("/main1"); let path2=path0.concat("/main2"); 
    let path3=path0.concat("/main3"); let path4=path0.concat("/main4");
    return (
<Hside> 
<Fnav>
<Fsidebarheader> Sidebar </Fsidebarheader>

<Fsidebarmain>
<Ulnavflexcolumn>
<Specialli> My Links </Specialli>
<Lii>			       <Hkbtndanger> <Link to={path1}>List Postings</Link> </Hkbtndanger> </Lii>
<Lii>			       <Hkbtndanger> <Link to={path2}>New Posting</Link> </Hkbtndanger> </Lii>
<Lii>			       <Hkbtndanger> <Link to={path3}>Resume</Link> </Hkbtndanger> </Lii>
<Lii>			       <Hkbtndanger> <Link to={path4}>Slack</Link> </Hkbtndanger> </Lii>
</Ulnavflexcolumn>
</Fsidebarmain>

</Fnav>
</Hside> 
   );

};

const CenterSection  = (props) => {
    let path0=props.matchpath; let path1=path0.concat("/main1"); let path2=path0.concat("/main2"); 
    let path3=path0.concat("/main3"); let path4=path0.concat("/main4");
    // important: I need to understand  why ({match}) =>( <ListPostingsContainer fmatch={match}  />) works
    // i.e. why <ListPostingsContainer />) does not receive match in props
    return ( 
<Hcenter>    <h3> Center 2 </h3>  
<Switch>
   <Route    path={path1}  render={ ({match}) =>( <ListPostingsContainer fmatch={match}  />) } />
   <Route    path={path2}  render={ () =>( <FormPostingContainer                    /> ) } />
   <Route    path={path3}  render={ () =>( <PostingsContainer mylist={props.mylist} /> ) } />
   <Route    path={path4}  render={ () =>( <SlackContainer                          /> ) } />
</Switch>
</Hcenter> 
);
}
//<Route    path={path1}  render={ ({match}) =>{ console.log("f path"); console.log( path1 ); return <ListPostingsContainer fmatchpath={path1} />;  } } />

/////////////////////////////////////////////////////////////////
//<Route       path={`${path1}/:mid`} render={  () => ( <Onepost2 /> ) }       />
//const Onepost2  = (props) => ( <h1> Job Title </h1> );

///////// start redux jmay chat ////////////////


////////////////////////////////////////////////////////////
class HirerContainer extends Component {
    constructor(props) { super(props); }
    render() {	
	const matchPath = this.props.match.path;
	return (  <Entirepage>  <MainSection matchpath={matchPath} />  </Entirepage> );  }
}

export default HirerContainer;



