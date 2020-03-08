import React, { Component } from 'react';
import 
{Container,
Row,
Col,
Form,
Button,
Spinner,
Alert
}
from 'react-bootstrap';
import {
  Redirect, Link
} from "react-router-dom";
import Util from "../Util";
import axios from 'axios';

class Signup extends Component{

  constructor(props){
    super(props);
    this.state={
      fields: {},
      errors: {},
      isSignupProcessing:false,
      showSuccessMsg:false,
      showFailedMsg:false
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

    if(!fields["firstName"]){
      formIsValid = false;
      errors["firstName"] = "First Name cannot be empty";
    }
   if(!fields["lastName"]){
      formIsValid = false;
      errors["lastName"] = "Last Name cannot be empty";
    }
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

  handleSignup = (event) => {
    event.preventDefault();
    if(this.handleValidation()){
      this.setState({
        isSignupProcessing:true,
        showSuccessMsg:false,
        showFailedMsg:false
      });
      var current = this;
      var formData={};
      formData['first_name'] = this.state.fields.firstName
      formData['last_name'] = this.state.fields.lastName
      formData['email'] = this.state.fields.email
      formData['password'] = this.state.fields.password
      var url = new Util().getBaseUrl() + '/signup';
      const options = {
        method: 'POST',
        data: formData,
        url,
      };
      axios(options)
      .then(function (response) {
        current.setState({
          isSignupProcessing:false,
          showSuccessMsg:true
        });
        current.setAllFieldsToNull()
      })
      .catch(function (error) {
        current.setState({
          isSignupProcessing:false,
          showFailedMsg:true
        });
        current.setAllFieldsToNull()
      })
      .finally(function () {
      }); 
    }
  }

  setAllFieldsToNull = () => {
    let fields = this.state.fields;
    fields['firstName'] = '';        
    fields['lastName'] = '';        
    fields['email'] = '';        
    fields['password'] = ''; 
    this.setState({fields});
  }


  render(){

    return(
      <Container>
      <Row style={{ marginTop:20}}>
        <Col>
          <div class="container1 d-flex justify-content-end" style={{ height:60, background:"rgb(243, 243, 243)", border:"1px solid #dad3d3", borderRadius:5, paddingRight:10}}>
            <div class="align-self-center">
            <Link to="/" style={{ color:"#000" }}>Signin</Link>
            </div>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop:15}}>
        <Col>
        <Alert variant="success" style={{ display: this.state.showSuccessMsg ? "block" : "none" }} >
          User created successfully
        </Alert>
        <Alert variant="danger" style={{ display: this.state.showFailedMsg ? "block" : "none" }} >
          Email Id already exist
        </Alert>
        </Col>
      </Row>

      <Row style={{ marginTop:'15%'}}>
        <Col></Col>
        <Col>
              <h3 className="text-center">Signup</h3>
          <Form>

                <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" name="firstName" value={this.state.fields.firstName} placeholder="First Name"  onChange={this.handleChange}/>
                {
                this.state.errors.email ? 
                <div style={{ color:"red"}} className="text-center" >{this.state.errors.firstName}</div> : 
                ''
                }
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" name="lastName" value={this.state.fields.lastName} placeholder="Last Name"  onChange={this.handleChange}/>
                {
                this.state.errors.email ? 
                <div style={{ color:"red"}} className="text-center" >{this.state.errors.lastName}</div> : 
                ''
                }
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" name="email" value={this.state.fields.email} placeholder="Email"  onChange={this.handleChange}/>
              {
              this.state.errors.email ? 
              <div style={{ color:"red"}} className="text-center" >{this.state.errors.email}</div> : 
              ''
              }
            </Form.Group>
            

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" name="password" value={this.state.fields.password} placeholder="Password" onChange={this.handleChange}/>
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
              onClick={this.handleSignup}
            >
              Submit
            </Button>
          </Form>
          
        </Col>
        <Col></Col>
      </Row>
      <Row>
      <Col></Col>
        <Col>
        {
          this.state.isSignupProcessing ?
          <div style={{ marginTop:10}} className="text-center"><Spinner animation="border" /></div> : ''
        }
        </Col>
      <Col></Col>
      </Row>
    </Container>
    );
  }
}  
export default Signup;
