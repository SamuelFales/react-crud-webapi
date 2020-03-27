import React, {Component} from 'react';
import {Button,Form} from 'react-bootstrap';
import Snakbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import './Login.css';
import {userService} from '../../services/userService'


export  class Login extends Component {
    constructor(props){
        super(props);
        this.state = {userId: "", userPassword: "", snackbaropen: false, snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // componentDidMount()
    // {
       
    // }

    snackbarClose = (event) => {
      this.setState({snackbaropen:false});
    }

    handleSubmit(event){
      event.preventDefault();
    
      userService.login(event.target.UserId.value,event.target.UserPassword.value)
      .then((result) =>
      {

        if (result.status === 401)
            this.setState({snackbaropen:true, snackbarmsg:'opss.. Sem autorização!'});

        if(result.token.value !== null){
          console.log(JSON.stringify(result.token));
          console.log(result.token);
            localStorage.setItem('token', JSON.stringify(result.token));
            this.props.history.push('/home');

        }
            
      },
      (error) => {
        console.log(error);
        this.setState({snackbaropen:true, snackbarmsg:'opss.. Algum erro na autenticação!'});
      })

    }

  render() {
    return (

    <div className="Login">

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

        <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="UserId">
                    <Form.Label>User:</Form.Label>
                    <Form.Control type="text" placeholder="Enter user" required />
                </Form.Group>
                <Form.Group controlId="UserPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                Login
                </Button>
        </Form>
       
      </div>

    );
  }
}