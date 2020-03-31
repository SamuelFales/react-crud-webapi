import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

import Snakbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import {departmentService} from '../../services/departmentService'
import {employeeService} from '../../services/employeeService'


export class AddEmpModal extends Component
{
    constructor(props){
        super(props);
        this.state = {deps:[], snackbaropen: false, snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount()
    {
      departmentService.getAll()
        .then(data => {
            this.setState({deps:data});
        });
    }

    snackbarClose = (event) => {
      this.setState({snackbaropen:false});
    }

    handleSubmit(event){
      event.preventDefault();
      
      employeeService.post( event.target.EmpName.value,
                            event.target.EmpDep.value,
                            event.target.EmpMail.value,
                            event.target.EmpDoj.value)
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
                Add Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <Row>
                    <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="EmpName">
                          <Form.Label>Name:</Form.Label>
                          <Form.Control
                            type="text"
                            name="EmpName"
                            required 
                            placeholder="EmpName" 
                          />
                        </Form.Group>

                        <Form.Group controlId="EmpDep">
                          <Form.Label>Department:</Form.Label>
                          <Form.Control as="select">
                              {this.state.deps.map(dep =>
                                <option key={dep.id}>{dep.name}</option>
                                )}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="EmpMail">
                          <Form.Label>E-mail:</Form.Label>
                          <Form.Control
                            type="email"
                            name="EmpMail"
                            required 
                            placeholder="EmpMail" 
                          />
                        </Form.Group>

                        <Form.Group controlId="EmpDoj">
                          <Form.Label>Data of join:</Form.Label>
                          <Form.Control
                            type="date"
                            name="EmpDoj"
                            required 
                            placeholder="EmpDoj" 
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