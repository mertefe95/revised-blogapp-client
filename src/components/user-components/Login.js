import React, { useState, useContext } from "react";
import Axios from "axios";
import ErrorNotice from "../utils/ErrorNotice";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';


const Login = () => {
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const { setUserData } = useContext(UserContext);
  const history = useHistory();


  const useStyles = makeStyles((theme) => ({
    root: {
      width: '10%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles;

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email , password }

      const loginRes = await Axios.post("https://blog-app-revised.herokuapp.com/users/login", loginUser);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  }


  return (
    <div className="login-page">
    <h2>Login</h2>


    <h3>{error && <Alert severity="error" onClose={() => setError(undefined)}>{error}</Alert>} </h3>

    
<form id="login-form" onSubmit={submit} className={classes.root} noValidate autoComplete="off">

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

        


        
 <Button id="login-btn" variant="outlined" type="submit">
        Submit
    </Button>
    </form>
</div>

  )
}

export default Login