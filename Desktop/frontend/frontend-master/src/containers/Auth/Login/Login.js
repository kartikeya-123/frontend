import React, { Component } from 'react';
// import Aux from "./../../../hoc/Auxil/Auxil";
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from 'axios';
import classes from './Login.css';
import UserContext from './../../../hoc/Context/UserContext';
import { Link } from 'react-router-dom';
import Input from './../../../components/UI/Input/Input';
import Button from './../../../components/UI/Button/Button';
import Modal from './../../../components/UI/Modal/Modal';
import { FaUserLock } from 'react-icons/fa';
// import NavigationItem from '../../../components/Navigation/NavigationItem/NavigationItem';
class Auth extends Component {
  state = {
    LoginForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        name: 'email',
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        name: 'password',
      },
    },
    isLoading: false,
    isLoggedin: false,
    show: false,
    errorMessage: '',
  };
  static contextType = UserContext;
  ///
  //if a user is logged in we have to get the status from the backend//

  // checkIsLoggedIn = () => {
  //   this.setState({ isLoading: true });
  //   axios
  //     .get("http://localhost:7000/api/v1/users/loginStatus", {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       this.setState({ isLoggedin: true, isLoading: false });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState({ isLoading: false });
  //     });
  // };
  componentDidMount() {
    this.setState({ isLoggedin: this.context.isLoggedin });
  }

  loginUserHandler = (event) => {
    event.preventDefault();
    let error = false;
    for (let input in this.state.LoginForm) {
      if (this.state.LoginForm[input].valid === false) {
        error = true;
        this.setState({
          errorMessage: `please enter  ${this.state.LoginForm[input].name}`,
        });
      }
    }
    if (!error) {
      const user = {
        email: this.state.LoginForm.email.value,
        password: this.state.LoginForm.password.value,
      };
      console.log(user);
      // this.setState({ isLoading: true });
      axios
        .post('http://localhost:7000/api/v1/users/login', user, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          console.log(document.cookie);
          this.setState({ isLoggedin: true, isLoading: false, show: true });
        })
        .catch((error) => {
          this.setState({
            errorMessage: 'invalid email or password',
            isLoading: false,
          });
        });
    }
  };

  checkValidity(value, rules) {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== '';
    }
    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
    }
    if (rules.maxLength && isValid) {
      isValid = value.length <= rules.maxLength;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.LoginForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    // console.log(updatedFormElement);
    this.setState({ LoginForm: updatedOrderForm, touched: true });
  };

  continue = () => {
    this.props.history.push('/');
    window.location.reload(false);
  };
  render() {
    const formElementsArray = [];

    for (let key in this.state.LoginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.LoginForm[key],
      });
    }
    let form = (
      <div className={classes.Login}>
        <div className={classes.Form}>
          <FaUserLock color="blue" size="70px" />
          <h2 style={{ color: 'green' }}>Login</h2>
          <p style={{ color: 'red' }}>
            {this.state.errorMessage ? '*' + this.state.errorMessage : null}
          </p>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              inValid={!formElement.config.valid}
              touched={formElement.config.touched}
              changedValue={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          ))}
          <span className={classes.Forgot}>
            <p className={classes.link}>
              <Link to="/forgotPassword">Forgot Password</Link>
            </p>
          </span>
          <div className={classes.Button}>
            <Button btnType="Authenticate" clicked={this.loginUserHandler}>
              Login
            </Button>
          </div>
          <span className={classes.left}>
            <p className={classes.link}>
              <Link to="/signup">Not a member? Sign Up</Link>
            </p>
          </span>
        </div>
      </div>
    );
    // if (this.context.isLoggedin) {
    //   form = (
    //     <div>
    //       <h1>YOU Are Logged In</h1>
    //       <NavigationItem link="/my-posts" classProperty="my-posts">
    //         My Posts
    //       </NavigationItem>
    //       <Button btnType="Danger" clicked={this.logoutUserHandler}>
    //         LOGOUT
    //       </Button>
    //     </div>
    //   );
    // }
    const loggedinSuccessfully = (
      <div>
        <p>Welcome back to Postbox</p>
        <p>You are successfully logged in</p>
        <Button btnType="Success" clicked={this.continue}>
          Continue
        </Button>
      </div>
    );
    return (
      <div className={classes.Body}>
        <Modal show={this.state.show}>{loggedinSuccessfully}</Modal>
        {!this.state.isLoading ? form : <Spinner />}
      </div>
    );
  }
}

export default Auth;
