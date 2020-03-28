import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditDepModal} from './EditEmpModal';
import {Navigation} from '../Home/Navigation'
import {employeeService} from '../../services/employeeService'


export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow : false, editModalShow: false}
    }

    componentDidMount()
    {
        this.refreshList();
    }

    componentDidUpdate()
    {
        this.refreshList();
    }

    deleteDep(empid)
    {

        if(window.confirm("Certo disso?"))
        {
        employeeService.del(empid)
        .then((result) =>
        {
          this.setState({snackbaropen:true, snackbarmsg:result});
        },
        (error) => {
          this.setState({snackbaropen:true, snackbarmsg:'Error!'});
        })
        }
    }

    refreshList()
    {
   
        employeeService.getAll().then(data => 
                                            {
                                                if(data.length !== this.state.emps.length) 
                                                {
                                                    this.setState({emps:data});
                                                }
                                            });
    }


    render(){
        const {emps, empid, empname, empdep, empmail, empdoj} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});

        return(
            <div>
                <Navigation/>
                <Table className="mt-4" striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Departement</th>
                            <th>Mail</th>
                            <th>DOJ</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key ={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.department}</td>
                                <td>{emp.mail}</td>
                                <td>{emp.doj}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" 
                                                onClick={() => this.setState({editModalShow:true, empid: emp.id, empname: emp.name, empdep: emp.department, empmail: emp.mail, empdoj: emp.doj })}>Edit
                                        </Button>
                                        <Button className="mr-2" onClick={() => this.deleteDep(emp.id)} variant="danger">Delete</Button>
                                        <EditDepModal show = {this.state.editModalShow} onHide={editModalClose}
                                        empid = {empid}
                                        empname = {empname}
                                        empdep = {empdep}
                                        empmail = {empmail}
                                        empdoj = {empdoj} />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=> this.setState({addModalShow: true})} >Add Employee</Button>

                    <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}/>

                </ButtonToolbar>
            </div>
        )
    }


}
