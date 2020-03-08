import React, { Component } from 'react';
import 
{
Row,
Col,
Button
}
from 'react-bootstrap';
import {
  Redirect, Link
} from "react-router-dom";
import { store } from '../store';

class Header extends Component{
    constructor(props){
        super(props);
    }

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('persist:root');
        window.location = '/';
    }

    addEvent = (event) => {
        event.preventDefault();
        this.props.showEventForm();
    }

    render(){
        return(
            <Row style={{ marginTop:20}}>
              <Col style={{ padding:0}}>
                <div class="" style={{ height:60, background:"rgb(243, 243, 243)", border:"1px solid #dad3d3", borderRadius:5, paddingRight:10}}>
                <div style={{position:"absolute", paddingLeft:10, top:18}}>
                    Welcome <b>{ store.getState().authReducer.loggedInUserData.first_name }</b>
                </div>
                <div style={{position:"absolute", paddingRight:10, right:0, top:11}}>
                  <Button variant="secondary" onClick={this.addEvent} >Add Events</Button>
                  &nbsp;<Button variant="secondary" onClick={this.handleLogout}>Logout</Button>
                </div>
                </div>
              </Col>
            </Row>
        )
    }
}
export default Header;