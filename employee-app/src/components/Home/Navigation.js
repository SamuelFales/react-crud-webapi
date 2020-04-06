import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Button, Navbar, Nav} from 'react-bootstrap'
import { userActions } from '../../actions/index'; 
import { connect } from 'react-redux'

class Navigation extends Component
{
    constructor(props){
        super(props);
    }

    logout = event =>{
         const { dispatch } = this.props;
         dispatch(userActions.logout());
    }

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/home">Home</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/department">Department</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">Employee</NavLink>
                    </Nav>
                </Navbar.Collapse>
                <Button variant="contained" color="primary" className='d-inline p-2 bg-dark text-white' onClick={(event)=>{this.logout()}}>Exit</Button>
            </Navbar>
        )
    }
}


// const mapStateToProps = (state) =>{
//     return {
//         state
//     };
// }

export default connect()(Navigation);