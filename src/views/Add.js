import React, { Component } from 'react';
import 
{Container,
Row,
Col,
Form,
Button
}
from 'react-bootstrap';

class Login extends Component{

  


  render(){
    return(
      <Container>
        
        <Row style={{marginTop:'25%'}}>
          <Col>
          </Col>
          <Col>
          <Form>
  <Form.Group controlId="formBasicEmail">
    {/* <Form.Label>Email address</Form.Label> */}
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    {/* <Form.Label>Password</Form.Label> */}
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary"  block type="button">
    Submit
  </Button>
</Form>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Login;
