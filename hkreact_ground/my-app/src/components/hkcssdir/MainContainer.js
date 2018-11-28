import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';

import './sidebar.css';
import './nav-heading.css';
import './nav-bordered.css';
import './navs-custom.css';

class MainContainer extends Component {

  render() {
    return (
	    <Grid>
            <Row>

	    <Col sm={3} className="sidebar">

	    <h1> HK Test 1</h1>


                    <nav class="sidebar-nav">


          <div class="nav-toggleable-sm">

            <ul class="nav nav-pills nav-stacked">

              <li class="nav-header">Dashboards</li>

              <li class="active">
                <a href="index.html">Overview</a>
              </li>

              <li >
                <a href="order-history/index.html">Order history</a>
              </li>

            </ul>
           </div>

                    </nav>

            </Col>



	    <Col sm={9}>
	    <h1> HK Content </h1>
            </Col>

            </Row>
	    </Grid>
    );
  }
}

export default MainContainer;
