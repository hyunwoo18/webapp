import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import { connect }            from 'react-redux';

const Slackdiv = styled.div` position: relative; background: #FFFFFF; box-shadow: 0px 1px 2px 0 rgba(34, 36, 38, 0.15);
margin: 1rem 0em; padding: 1em 1em; border-radius: 0.28571429rem; border: 1px solid rgba(34, 36, 38, 0.15); `;

const SlackContainer = () => (
  <Slackdiv>
    <ThreadTabs />
    <ThreadDisplay />
  </Slackdiv>
);

///////// 1 //////////////

const Activeitem = styled.div`
    float: left;
    width: 50%;
    background: none #FFFFFF;
    color: rgba(0, 0, 0, 0.95);
    font-weight: bold;
//    border-top-width: 1px;
//    border-color: #D4D4D5;
//    margin-bottom: -1px;
//    box-shadow: none;
//    border-radius: 0.28571429rem 0.28571429rem 0px 0px !important;
`;

const Nctiveitem = styled.div`
    float: left;
    width: 50%;
    background: transparent;
    color: rgba(0, 0, 0, 0.87);
//    border-top: 2px solid transparent;
//    border-bottom: none;
//    border-left: 1px solid transparent;
//    border-right: 1px solid transparent;
//    padding: 0.92857143em 1.42857143em;
`;

const Stab = styled.div`
    //'ui top attached tabular menu'
    //.ui.tabular.menu {
    border-radius: 0em;
    box-shadow: none !important;
    border: none;
    background: none transparent;
    border-bottom: 1px solid #D4D4D5;

    margin-left: 0;
    margin-right: 0;
    width: 100%;
`;

const mapStateToTabsProps = (state) => {
    const tabs = state.threads.map( t => ( { title: t.title, active: t.id === state.activeThreadId, id: t.id, }  ));
    return { tabs, };
};
const mapDispatchToTabsProps = (dispatch) => (   {      onClick: (id) => (  dispatch(openThread(id))  ),    }    );
function openThread(id) {  return {    type: 'OPEN_THREAD',    id: id,  };  }
//        <div key={index} className={tab.active?'active item':'item'} onClick={() => props.onClick(tab.id)}  >
const Tabs = (props) => (
  <Stab>
  { props.tabs.map(  (tab, index) => { 
	      if (tab.active) { 
		  return <Activeitem  key={index} onClick={ () => props.onClick(tab.id) }>  {tab.title} </Activeitem>
	      } else {
 		  return <Nctiveitem  key={index} onClick={ () => props.onClick(tab.id) }>  {tab.title} </Nctiveitem>
	      }
	  } ) }
  </Stab>
);

// jmay
const ThreadTabs = connect(  mapStateToTabsProps,  mapDispatchToTabsProps)(Tabs);

/////////// 2 /////////////////
const mapStateToThreadProps    = (state)    => ( {  thread: state.threads.find( t => t.id === state.activeThreadId ),          } );
const mapDispatchToThreadProps = (dispatch) => ( { onMessageClick: (id) => (dispatch( deleteMessage(id))), dispatch: dispatch, } );
const mergeThreadProps = (stateProps, dispatchProps) => (
 {
    ...stateProps,
    ...dispatchProps,
    onMessageSubmit: (text) => ( dispatchProps.dispatch( addMessage(text, stateProps.thread.id) ) ),
  }
 );

function deleteMessage(id)          { return { type: 'DELETE_MESSAGE',  id: id,                     }; }
function addMessage(text, threadId) { return { type: 'ADD_MESSAGE', text: text, threadId: threadId, }; }

const Stthread = styled.div`
    //.ui.basic.segment {
    background: none transparent;
    box-shadow: none;
    border: none;
    border-radius: 0px;
`;
//  <div className='ui center aligned basic segment'>
const Thread = (props) => (
  <Stthread>
    <MessageList      messages={props.thread.messages}      onClick={props.onMessageClick}    />
    <TextFieldSubmit                                       onSubmit={props.onMessageSubmit}    />
  </Stthread>
);

// jmay
const ThreadDisplay = connect(  mapStateToThreadProps,  mapDispatchToThreadProps,  mergeThreadProps)(Thread);

//////////////
const Uicomments        = styled.div`  margin: 1.5em 0em;    max-width: 650px;`;
const Uicommentscomment = styled.div`  position: relative; background: none; margin: 0.5em 0em 0em; padding: 0.5em 0em 0em;
    border: none;     border-top: none;     line-height: 1.2; `;
const Uicommentscommenttext = styled.div`
    margin: 0.25em 0em 0.5em;
    font-size: 1em;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.87);
    line-height: 1.3;
`;
const Uicommentscommentmetadata = styled.span`
    display: inline-block;
    margin-left: 0.5em;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.875em;
`;

const MessageList = (props) => (
  <Uicomments>
    {
      props.messages.map( (m, index) => (

        <Uicommentscomment      key={index}   onClick={() => props.onClick(m.id)}>
          <Uicommentscommenttext>
            {m.text}
            <Uicommentscommentmetadata>@{m.timestamp}</Uicommentscommentmetadata>
          </Uicommentscommenttext>
        </Uicommentscomment>

      ) )
    }
  </Uicomments>
 );

const Uiinput = styled.div`
    position: relative;
    font-weight: normal;
    font-style: normal;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    color: rgba(0, 0, 0, 0.87);
  input {
    margin: 0em;
    max-width: 100%;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    outline: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    text-align: left;
    line-height: 1.21428571em;
    font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    padding: 0.67857143em 1em;
    background: #FFFFFF;
    border: 1px solid rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.28571429rem;
    -webkit-transition: box-shadow 0.1s ease, border-color 0.1s ease;
    transition: box-shadow 0.1s ease, border-color 0.1s ease;
    box-shadow: none;
  }
`;

const Uiprimarybutton = styled.button`
    background-color: #2185D0;
    color: #FFFFFF;
    text-shadow: none;
    background-image: none;
    box-shadow: 0px 0em 0px 0px rgba(34, 36, 38, 0.15) inset;
    &:hover {
      background-color: #1678c2;
      color: #FFFFFF;
      text-shadow: none;
    }
`;

class TextFieldSubmit extends React.Component {
  state = { value: '', };

  onChange = (e) => {  this.setState( { value: e.target.value, } )  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.value);
    this.setState({      value: '',    });
  };

  render() {
    return (
      <Uiinput>

        <input           type='text'   onChange={this.onChange}   value={this.state.value} />
        <Uiprimarybutton type='submit' onClick={this.handleSubmit}> Submit </Uiprimarybutton>

      </Uiinput>
    )
  }
}
///////// finish redux chat ////////////////
export default SlackContainer;