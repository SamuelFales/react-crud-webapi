import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import {Navigation} from '../Home/Navigation'
import {departmentService} from '../../services/departmentService'



export class Department extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow : false, editModalShow: false}
    }


    componentDidMount()
    {
        this.refreshList();
    }

     componentDidUpdate()
     {
         
     }

    deleteDep(depid)
    {

        if(window.confirm("Certo disso?"))
        {
            departmentService.del(depid)
            .then((result) =>
            {
                if (result.status === 200)
                    this.setState({snackbaropen:true, snackbarmsg:"Excluido"});
                else
                    this.setState({snackbaropen:true, snackbarmsg:'Error!'});
            },
            (error) => {
                this.setState({snackbaropen:true, snackbarmsg:'Error!'});
            })
        }
    }

    refreshList()
    {
          departmentService.getAll().then(data => this.setState({deps:data}));
    }
    

    render(){
        const {deps, depid, depname} = this.state;
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
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key ={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" 
                                                onClick={() => this.setState({editModalShow:true, depid: dep.id, depname: dep.name })}>Edit
                                        </Button>
                                        <Button className="mr-2" onClick={() => this.deleteDep(dep.id)} variant="danger">Delete</Button>
                                        <EditDepModal show = {this.state.editModalShow} onHide={editModalClose}
                                        depid = {depid}
                                        depname = {depname} />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=> this.setState({addModalShow: true})} >Add Department</Button>

                    <AddDepModal show={this.state.addModalShow} onHide={addModalClose}/>

                </ButtonToolbar>
            </div>
        )
    }

}