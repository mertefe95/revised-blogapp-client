import React, { useState} from "react";
import Axios from "axios";
import ErrorNotice from "../utils/ErrorNotice";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from "@material-ui/lab/Alert";


const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");

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

    const user = { email } 

    try {
    await Axios.post(
        "https://blog-app-revised.herokuapp.com/users/forgot-password", 
        user
    ).then(res => setNoticeMessage(res.data.msg))
    .catch(err => {
        err.response.data.msg && setError(err.response.data.msg);
    })
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }}


  return (

    <div className="forgot-password-page">
    <h2>Forgot Password</h2>

    <h4>Please enter your email for password change.</h4>

    <h4 className="error-message">
            {error && <Alert severity="error" onClose={() => setError(undefined)}>{error}</Alert>} 
    </h4>

    <h3 className="success-message">{noticeMessage && <Alert severity="success">{noticeMessage}</Alert>} </h3>

    <form id="forgot-password-form" onSubmit={submit} className={classes.root} noValidate autoComplete="off">

    <TextField
          label="Email"
          type="email"
          autoComplete="current-email"
          id="register-email"
          onChange={(e) => setEmail(e.target.value)}  
          
        />

        
    <Button variant="contained" type="submit">
        Submit
    </Button>
    </form>
    </div>
  );
}

export default ForgotPassword