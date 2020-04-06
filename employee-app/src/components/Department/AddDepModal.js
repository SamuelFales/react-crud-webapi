import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import Snakbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import {departmentService} from '../../services/departmentService'
import { connect } from 'react-redux'


 export class AddDepModal extends Component
{
    constructor(props){
        super(props);
        this.state = {snackbaropen: false, snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event) => {
      this.setState({snackbaropen:false});
    }

    handleSubmit(event){
      event.preventDefault();

      departmentService.post(event.target.DepartmentName.value)
      .then((result) =>
      {
        if (result.status === 201)
          this.setState({snackbaropen:true, snackbarmsg:"Departamento adicionado."});
        else
        this.setState({snackbaropen:true, snackbarmsg:"Opss.. algum problema ao adicionar departament!"});
      },
      (error) => {
        this.setState({snackbaropen:true, snackbarmsg:'Error!'});
      })

    }

    render(){
        return(

          <div className="container">
            <Snakbar
              anchorOrigin={{vertical:'bottom',horizontal:'center'}}
              open= {this.state.snackbaropen}
              autoHideDuration ={3000}
              onClose={this.snackbarClose}
              message ={<span id="message-id">{this.state.snackbarmsg}</span>}
              action={[
                <IconButton 
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.snackbarClose} 
                > X
                </IconButton>
              ]}

            />
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Department
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <Row>
                    <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="DepartmentName">
                          <Form.Label>Name:</Form.Label>
                          <Form.Control
                            type="text"
                            name="DepartmentName"
                            required 
                            placeholder="DepartmentName" 
                          />
                        </Form.Group>
                        <Form.Group>
                          <Button variant="primary" type="submit">Add</Button>
                        </Form.Group>
                      </Form>
                    </Col>
                    </Row>    
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}



