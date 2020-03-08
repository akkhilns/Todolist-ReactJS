import React, { Component } from 'react';
import 
{Container,
Row,
Col,
Form,
Button,
Table,
Badge,
Spinner,
Modal
}
from 'react-bootstrap';
import {
  Redirect, Link
} from "react-router-dom";
import { store } from '../store';
import Util from "../Util";
import axios from 'axios';
import Header from '../component/Header';
import ConfirmModal from '../component/ConfirmModal';
import EventForm from '../component/EventForm';

class List extends Component{

  constructor(props){
    super(props);
    this.state={
      eventData:null,
      isDataLoaded:false,
      showConfirmModal:false,
      showEventFormModal:false,
      fields: {},
      errors: {},
      formType:'create',
      editEventId:null,
      heading:'Add Event',
      btnLabel:'Create'
    }
  }

  componentDidMount(){
    if(store.getState().authReducer.loggedInUserData.token == undefined){
      window.location = '/';
    }
    this.getEventsData();
  }

  /*********************************
   * List Event
   ********************************/

  getEventsData = () =>{
    var current = this;
    var url = new Util().getBaseUrl() + '/listEvent';
    const options = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + store.getState().authReducer.loggedInUserData.token },
      url,
    };
    axios(options)
    .then(function (response) {
      current.setState(
        {
          eventData:response.data,
          isDataLoaded:true
        }
      );
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
  }

  /*********************************
   * Add Event
   ********************************/

  showEventForm = (event) => {
    let fields = this.state.fields;
    fields['title'] = '';        
    fields['description'] = ''; 
    this.setState({
      showEventFormModal:true,
      formType:'create',
      fields,
      heading:'Add Event',
      btnLabel:'Create'
    });
  }

  cancelEventForm = () => {
    this.setState({
      showEventFormModal:false
    });
  }

  handleEventFormInputChange = (event) =>{
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value.trim();        
    this.setState({fields});
  }

  addEvent = () => {
    var current = this;
    var url = '';
    var formData={};
    formData['title'] = this.state.fields.title;
    formData['description'] = this.state.fields.description;
    formData['eventId'] = this.state.editEventId;

    if(this.state.formType == 'create'){
      url = new Util().getBaseUrl() + '/addEvent';
    }else{
      url = new Util().getBaseUrl() + '/editEvent';
    }
    const options = {
      method: 'POST',
      headers: { 'Authorization': 'Token ' + store.getState().authReducer.loggedInUserData.token },
      data: formData,
      url,
    };
    axios(options)
    .then(function (response) {
      current.cancelEventForm();
      current.getEventsData();
    })
    .catch(function (error) {
    })
    .finally(function () {
    }); 
  }


  /*********************************
   * Edit Event
   ********************************/

  editEvent = (id, title, description) => {
    let fields = this.state.fields;
    fields['title'] = title;        
    fields['description'] = description;        
    this.setState({fields, showEventFormModal:true, formType:'edit', editEventId:id, heading:'Edit Event', btnLabel:'Update'});
  }

  /*********************************
   * Delete Event
   ********************************/

  deleteEvent = (id) => {
    this.setState({
      showConfirmModal:true,
      deleteEventId:id
    })
  }

  confirmCanceled = () => {
    this.setState({
      showConfirmModal:false,
      deleteEventId:''
    })
  }

  handleEventDelete = () => {
    var current = this;
    var url = new Util().getBaseUrl() + '/deleteEvent';
    const options = {
      method: 'POST',
      headers: { 'Authorization': 'Token ' + store.getState().authReducer.loggedInUserData.token },
      data: { eventId:this.state.deleteEventId },
      url,
    };
    axios(options)
    .then(function (response) {
      current.confirmCanceled();
      current.getEventsData();
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
  }




  render(){
      var eventData = this.state.eventData;
      var isDataLoaded = this.state.isDataLoaded;

      if(isDataLoaded == false && eventData == null){
        return(
          <Container>
            <Header showEventForm={this.showEventForm}/>
            <div style={{ textAlign: "center",width: "100%",marginTop:25 }}> <Spinner animation="border" variant="secondary" style={{ width: '8rem',height: '8rem'}}/> </div>
          </Container>
        )
        }else if(isDataLoaded == true && eventData.length == 0){
        return(
          <Container>
            <Header showEventForm={this.showEventForm}/>
            <div style={{ textAlign: "center",width: "100%",marginTop:25 }}> No Record found </div>

            {/* Event form modal */}
            <EventForm heading={this.state.heading} btnLabel={this.state.btnLabel} title={this.state.fields.title} description={this.state.fields.description} showEventFormModal={this.state.showEventFormModal} eventFormCancelled={this.cancelEventForm} addEventFormClicked={this.addEvent} eventFormChange={ e => this.handleEventFormInputChange(e)}/>
          </Container>
        )
      }else if(isDataLoaded == true && eventData != null){
        return(
          <Container>
            <Header showEventForm={this.showEventForm}/>
            <Row style={{ marginTop:50}}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(eventData).map((key, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{eventData[index].title}</td>
                        <td>{eventData[index].description}</td>
                        <td>
                          <Button variant="link" onClick={ e => this.editEvent(eventData[index].id, eventData[index].title, eventData[index].description)}>Edit</Button>&nbsp;
                          <Button variant="link" onClick={ e => this.deleteEvent(eventData[index].id)}>Delete</Button>
                        </td>
                      </tr>
                        )
                      )
                    }
                  </tbody>
                </Table>
            </Row>

            {/* Event form modal */}
            <EventForm heading={this.state.heading} btnLabel={this.state.btnLabel} title={this.state.fields.title} description={this.state.fields.description} showEventFormModal={this.state.showEventFormModal} eventFormCancelled={this.cancelEventForm} addEventFormClicked={this.addEvent} eventFormChange={ e => this.handleEventFormInputChange(e)}/>
            
            {/* Delete confirm Modal */}
            <ConfirmModal showConfirmModal={this.state.showConfirmModal} confirmed={this.handleEventDelete} confirmCanceled={this.confirmCanceled}/>
          </Container>
        )
      }
  }
}
export default List;
