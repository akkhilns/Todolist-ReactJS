import React, { Component } from 'react';
import 
{
Modal,
Button
}
from 'react-bootstrap';
import {
  Redirect, Link
} from "react-router-dom";
import { store } from '../store';

class ConfirmModal extends Component{
    constructor(props){
        super(props);
    }

    close = (event) => {
        event.preventDefault();
        this.props.confirmCanceled();
    }

    confirm = (event) => {
        event.preventDefault();
        this.props.confirmed();
    }

    render(){
        return(
            <>
            <Modal show={this.props.showConfirmModal}>
            <Modal.Header>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to delete this event ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.close}>
                Close
              </Button>
              <Button variant="primary" onClick={this.confirm}>
                Delete
              </Button>
            </Modal.Footer>
            </Modal>
            </>
        )
    }
}
export default ConfirmModal;