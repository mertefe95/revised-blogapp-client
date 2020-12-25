import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"
import ErrorNotice from "../utils/ErrorNotice";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';


const Register = () => {
    const [username, setUsername] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [noticeMessage, setVerifyMessage] = useState({
    text: undefined,
    });

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));

    const classes = useStyles();

  
    const submit = async (e) => {
    e.preventDefault();

    try {
        const newUser = { username, email, password, firstname, lastname };
        await Axios.post("https://blog-app-revised.herokuapp.com/users/register", newUser);

        setVerifyMessage({
        text: "Succesful Registration! Please verify your email address before Login.",
        });
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }}

    return (
    <div className="register-page">
        <h2>Register</h2>
        <h3 className="notice-message">{noticeMessage.text}</h3>
        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>

      <form id="register-form" onSubmit={submit} className={classes.root} noValidate autoComplete="off">
      
      <TextField 
          label="Username"
          type="text"
          autoComplete="current-username"
          id="register-username"
          onChange={(e) => setUsername(e.target.value)}  
          
        />
        <TextField
        onChange={(e) => setFirstname(e.target.value)}
        className={classes.margin}
        id="input-with-icon-textfield"
        label="First Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        
      />
      <TextField
        onChange={(e) => setLastName(e.target.value)}
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Last Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        
      />

<TextField 
          label="Email"
          type="email"
          autoComplete="current-email"
          id="register-email"
          onChange={(e) => setEmail(e.target.value)}  
          
        />
<TextField 
          label="Password"
          type="password"
          autoComplete="current-password"
          id="register-password"  
          onChange={(e) => setPassword(e.target.value)}
        />

 <Button id="register-btn" variant="outlined"  type="submit">
        Submit
    </Button>

    <ul className="register-bottom-ul">
    <Typography className={classes.root}>
    <li>
    <Link className="admin-link" to="/admin-login">
    Admin Login
    </Link>
    </li>
    <li>
    <Link className="forgot-link" to="/forgot-password" >
    Forgot your password?
    </Link>
    </li>
    </Typography>
    </ul>

    </form>
        </div>
    );
};


export default Register;