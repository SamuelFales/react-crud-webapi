import React, {Component} from 'react';
import {Button,Form} from 'react-bootstrap';
import Snakbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import './Login.css';
import {userService} from '../../services/userService'
import { connect } from 'react-redux'
import { userActions } from '../../actions/index';
import { withRouter } from 'react-router-dom';


  class Login extends Component {
    constructor(props){
        super(props);
        this.state = {userId: "", userPassword: "", snackbaropen: false, snackbarmsg:''};

    }

    snackbarClose = (event) => {
      this.setState({snackbaropen:false});
    }

    componentDidMount() {
      if(localStorage.getItem('token')){
        console.log("home login");
        this.props.history.push('/home');
      }
  }

    
    login = event =>{
      this.setState({ submitted: true });
      const { UserId, UserPassword } = this.state;
      const { dispatch } = this.props;
      if (UserId && UserPassword) {
        dispatch(userActions.login(UserId, UserPassword));
      }
  }


  handleChange = prop => event => {
    console.log('handleChange');
    this.setState({ [prop]: event.target.value });
};

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

        <Form>
                <Form.Group controlId="UserId">
                    <Form.Label>User:</Form.Label>
                    <Form.Control type="text" placeholder="Enter user" required onChange={this.handleChange('UserId')} />
                </Form.Group>
                <Form.Group controlId="UserPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" required onChange={this.handleChange('UserPassword')} />
                </Form.Group>
                <Button variant="contained" color="primary"  onClick={(event)=>{this.login()}}>
                            Login
              </Button>
        </Form>
       
      </div>

    );
  }
}


// const mapStateToProps = (state) =>{
//   const { loggingIn } = state.authentication;
//   return {
//      loggingIn
//   };
// }


export default connect(null,null)(Login);

// export default withRouter(connect(mapStateToProps, null, null, { pure: false})(Login));