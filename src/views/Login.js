import React, { Component } from 'react';
import 
{Container,
Row,
Col,
Form,
Button,
Spinner
}
from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../reducers/authReducer';
import {
  Redirect, Link
} from "react-router-dom";

class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      fields: {},
      errors: {}
    }
  }

  handleChange = (event) => {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value.trim();        
    this.setState({fields});
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields["email"]){
       formIsValid = false;
       errors["email"] = "Email cannot be empty";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPosition = fields["email"].lastIndexOf('@');
      let lastDotPosition = fields["email"].lastIndexOf('.');
      if (!(lastAtPosition < lastDotPosition && lastAtPosition > 0 && fields["email"].indexOf('@@') == -1 && lastDotPosition > 2 && (fields["email"].length - lastDotPosition) > 2)) {
         formIsValid = false;
         errors["email"] = "Email id is not valid";
       }
    } 

    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Password cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  handleLogin = (event) => {
    event.preventDefault();
    if(this.handleValidation()){
      this.props.login(this.state.fields.email, this.state.fields.password);
    }
  }


  render(){
    if(this.props.isLoginSuccess){
      return(
         <Redirect to='list'/>
      )
    }
    return(
      <Container>
      <Row style={{ marginTop:20}}>
        <Col>
          <div class="container1 d-flex justify-content-end" style={{ height:60, background:"rgb(243, 243, 243)", border:"1px solid #dad3d3", borderRadius:5, paddingRight:10}}>
            <div class="align-self-center">
            <Link to="/signup" style={{ color:"#000" }}>Signup</Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop:'20%'}}>
        <Col></Col>
        <Col>
              <h3 className="text-center">Login</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" name="email" placeholder="Enter email"  onChange={this.handleChange}/>
              {
              this.state.errors.email ? 
              <div style={{ color:"red"}} className="text-center" >{this.state.errors.email}</div> : 
              ''
              }
            </Form.Group>
            

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
              {
              this.state.errors.password ? 
              <div style={{ color:"red"}} className="text-center">{this.state.errors.password}</div> : 
              ''
              }
            </Form.Group>
            <Button
              variant="primary"
              block
              type="submit"
              onClick={this.handleLogin}
            >
              Submit
            </Button>
            
            {
              this.props.isLoginFailed ? 
              <div style={{ color:"red"}} className="text-center">Invalid Username/Password</div> : ''
            }
          </Form>
          
        </Col>
        <Col></Col>
      </Row>
      <Row>
      <Col></Col>
        <Col>
        {
          this.props.isLoginProcessing ?
          <div style={{ marginTop:10}} className="text-center"><Spinner animation="border" /></div> : ''
        }
        </Col>
      <Col></Col>
      </Row>
    </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
    return {
      isLoginProcessing: state.authReducer.isLoginProcessing,
      isLoginSuccess: state.authReducer.isLoginSuccess,
      isLoginFailed: state.authReducer.isLoginFailed
    };
  
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (email, password) => dispatch(login(email, password))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);
