import React, { Component } from 'react';
import styled from 'styled-components';

const Hside   = styled.div` flex-grow: 1; height: 100%; text-align: center;`;
const Hcenter = styled.div` flex-grow: 5; height: 100%; text-align: center;`;

// sidebar implementation
const Fnav = styled.nav` margin-right: 40px; `;
const Fsidebarheader = styled.div`     position: relative;padding-bottom: 20px; 
&::after {     display: block;     clear: both;     content: ""; } `;

const Fsidebarmain = styled.div`    padding-bottom: 20px;    display: block !important;    height: auto !important;  `;

const Ulnavflexcolumn = styled.ul`
    display: -webkit-box;    display: -ms-flexbox;    display: flex;
    -ms-flex-wrap: wrap;    flex-wrap: wrap;    padding-left: 0;
    margin-bottom: 0;    list-style: none;

-webkit-box-orient: vertical !important;
-webkit-box-direction: normal !important;
-ms-flex-direction: column !important;
flex-direction: column !important;
`;

const Specialli = styled.li` padding-left: 15px; padding-right: 15px; margin-bottom: 5px; font-size: 85%; font-weight: normal; letter-spacing: 1px; color: #a2a9b1;
text-transform: uppercase;  `;

const Lii = styled.li`    margin-bottom:50px; margin-left:50px; `;

export {Hside, Hcenter, Fnav, Fsidebarheader, Fsidebarmain, Ulnavflexcolumn, Specialli, Lii};