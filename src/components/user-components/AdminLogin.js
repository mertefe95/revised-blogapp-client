import React, { useState, useContext } from "react";
import Axios from "axios";
import ErrorNotice from "../utils/ErrorNotice";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"

const AdminLogin = () => {
  const [error, setError] = useState();
  const [noticeMessage, setNoticeMessage] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const adminUser = { email, password} 
      const adminRes = await Axios.post("https://blog-app-revised.herokuapp.com/users/login", adminUser)
      
      setUserData({
        token: adminRes.data.token,
        user: adminRes.data.user
      })

    localStorage.setItem("auth-token", adminRes.data.token);
    history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg)
    }

  }


  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  }))

  const classes = useStyles();



return (
<div className="admin-login-page">
    <h2>Admin Login</h2>

    <h4>{error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )} </h4>

        <form id="admin-login-form" onSubmit={submit} className={classes.root} noValidate autoComplete="off">

<TextField required id="standard-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          id="register-email"
          onChange={(e) => setEmail(e.target.value)}  
          
        />
<TextField required id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          id="register-password"  
          onChange={(e) => setPassword(e.target.value)}
        />

        
 <Button variant="contained" color="primary" type="submit">
        Submit
    </Button>
    </form>
</div>
  )
}

export default AdminLogin