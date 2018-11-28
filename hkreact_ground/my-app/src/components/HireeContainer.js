import React, { Component } from 'react';
import styled from 'styled-components';

import { Route, Link, Redirect } from 'react-router-dom';

import ModalContainer   from './ModalContainer';
import ResumeContainer  from './ResponsiveResume';
import DisplayContainer from './DisplayContainer';

import {Hkbtndanger}   from './ESGMainContainer';
import {Hside, Hcenter, Fnav, Fsidebarheader, Fsidebarmain, Ulnavflexcolumn, Specialli, Lii}   from './CommonContainer';

// not used  //const Title = styled.h1`    font-size: 1.5em;    text-align: center;    color: palevioletred;`;
// not used  //const Wrapper = styled.section`    padding: 4em;    background: papayawhip;`;

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//const Hpage = styled.div` position: absolute; top: 60px; bottom: 0; right: 0; left: 0;`;
//const Entirepage = (props) => ( <Hpage> {props.children} </Hpage>  );
const Entirepage = (props) => ( <div> {props.children} </div>  );


const Hcontainer = styled.div` display: flex; height: 100%; width: 100%;`;
const MainSection = (props) => (
		<Hcontainer>

<LeftBarSection matchpath={props.matchpath} />

<CenterSection  matchpath={props.matchpath} />

<RiteBarSection />

		</Hcontainer> );
///////////////////////////////////////////////////////
const LeftBarSection=(props)=> {
    let path0=props.matchpath; let path1=path0.concat("/main1"); let path2=path0.concat("/main2"); let path3=path0.concat("/main3");
    return (
<Hside> 
<Fnav>
<Fsidebarheader> Sidebar </Fsidebarheader>

<Fsidebarmain>
<Ulnavflexcolumn>
<Specialli> My Links </Specialli>
<Lii>			       <Hkbtndanger> <Link to={path1}>Main1</Link> </Hkbtndanger> </Lii>
<Lii>			       <Hkbtndanger> <Link to={path2}>Main2</Link> </Hkbtndanger> </Lii>
<Lii>			       <Hkbtndanger> <Link to={path3}>Main3</Link> </Hkbtndanger> </Lii>
</Ulnavflexcolumn>
</Fsidebarmain>

</Fnav>
</Hside> 
); }

const RiteBarSection=(props) => ( <Hside>   <h3> Right  </h3>  </Hside>   );
const CenterSection  = (props) => {
    let path0=props.matchpath; let path1=path0.concat("/main1"); let path2=path0.concat("/main2"); let path3=path0.concat("/main3");
return ( 
   <Hcenter>  <h3> Center </h3>  
   <Route    path={path1}  component={ModalContainer}   />
   <Route    path={path2}  component={ResumeContainer}  />
   <Route    path={path3}  component={DisplayContainer} />
  </Hcenter> 
);
}

///////////// new display end


///////////// End new resume s

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

class HireeContainer extends Component {
    constructor(props) { super(props); 	console.log( "the match = " );	console.log( this.props.match.path ); }
    render() {	
	const matchPath = this.props.match.path;
	return (  <Entirepage> <MainSection matchpath={matchPath} />  </Entirepage> );  
    } // end render
}
export default HireeContainer;

//{/*  			<HeaderSection /> */}

