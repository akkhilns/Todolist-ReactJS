import React, { Component } from 'react';
import 
{
Modal,
Button,
Form
}
from 'react-bootstrap';
import {
  Redirect, Link
} from "react-router-dom";
import { store } from '../store';

class EventForm extends Component{
    constructor(props){
        super(props);
        this.state={
          errors:{}
        }
    }

    close = (event) => {
        event.preventDefault();
        this.props.eventFormCancelled();
    }

    add = (event) => {
        event.preventDefault();
        if(this.handleValidation()){
          this.props.addEventFormClicked();
        }
    }

    handleEventFormChange = (event) =>{
        event.preventDefault();
        this.props.eventFormChange(event);
    }

    handleValidation(){
      // let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
  
      if(!this.props.title){
         formIsValid = false;
         errors["title"] = "Title cannot be empty";
      }

      if(!this.props.description){
        formIsValid = false;
        errors["description"] = "Description cannot be empty";
      }
  
      this.setState({errors: errors});
      return formIsValid;
    }

    render(){
        return(
            <>
            <Modal show={this.props.showEventFormModal}>
            <Modal.Header>
            <Modal.Title>{this.props.heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" defaultValue={this.props.title} onChange={this.handleEventFormChange} />
                    {
                      this.state.errors.title ? 
                      <div style={{ color:"red"}} className="text-center" >{this.state.errors.title}</div> : 
                      ''
                    }
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" name="description" defaultValue={this.props.description} onChange={this.handleEventFormChange} />
                    {
                      this.state.errors.description ? 
                      <div style={{ color:"red"}} className="text-center" >{this.state.errors.description}</div> : 
                      ''
                    }
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.close}>
                Close
              </Button>
              <Button variant="primary" onClick={this.add}>
                {this.props.btnLabel}
              </Button>
            </Modal.Footer>
            </Modal>
            </>
        )
    }
}
export default EventForm;