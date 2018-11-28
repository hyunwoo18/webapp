import React, { Component } from 'react';
import styled from 'styled-components';

import { connect }               from 'react-redux';

///////////// new display start
const StyledDL  = styled.dl` width: 100%; `;
const StyledDT  = styled.dt` font-style: italic; font-weight: bold; font-size: 18px; text-align: right; padding: 0 26px 0 0; width: 30%; 
                 float: left; height: 100px; border-right: 1px solid #999;  `;
const StyledDD =styled.dd` width:70%; float:right; text-align:left; padding-left:20px; `;
const StyledDDC=styled.dd` width:70%; float:right; text-align:left; padding-left:20px; float:none; margin:0; height:15px; clear:both`;

class DisplayPresenter extends Component {
    constructor(props) {
        super(props);	
	this.jkinputs = this.props.myresume.workarray;	
	this.jkfname  = this.props.myresume.fname;
	this.jklname  = this.props.myresume.lname;
	this.jkcmpy   = this.props.myresume.company; }
render_name           =(       )=>( <div> <StyledDT> Basic </StyledDT>   <StyledDD>  <h2> {this.jklname},{this.jkfname} </h2> </StyledDD> </div> );
render_current        =(       )=>( <div> <StyledDT> Current </StyledDT> <StyledDD>  <h2> {this.jkcmpy} </h2> </StyledDD> </div> );
renderItemOrEditField =(item,id)=>( <div key={id}> <h2> {item.title} </h2> <p> { item.period } </p> </div> );

    render() {  return (

<div>
<StyledDL>

<StyledDDC />
    {this.render_name()}

<StyledDDC />
    {this.render_current()}

<StyledDDC />
<StyledDT> Experience </StyledDT>
<StyledDD>  {  this.jkinputs.map(   ( item, i )    =>    { return this.renderItemOrEditField( item, i ); }       )        }  </StyledDD> 

</StyledDL>
</div>
        );
    }
}

const mapStateToDisplayPresenterProps    = (state)    => ( { myresume: state.myresume, } );
const mapDispatchToDisplayPresenterProps = (dispatch) => ( { onMessageClick: (resume) => (dispatch(showResume(resume))),     } );

function showResume(resume) { return { type: 'SHOW_RESUME',  myresume: resume, };   }

const DisplayContainer = connect( mapStateToDisplayPresenterProps, mapDispatchToDisplayPresenterProps )( DisplayPresenter );

export default DisplayContainer;