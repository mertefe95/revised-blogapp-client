import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import  { useHistory, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem("auth-token", "");
  }

  return (
    <nav className="auth-options">
    { userData.user ? (
      <ul className="header-ul">
      <li><Link to="/create-post">CREATE A POST</Link></li>
      <li><Button variant="outlined" size="small" onClick={logout}>Logout</Button></li>
      </ul>
    ) : (
      <ul className="header-ul">
        <li><Button onClick={register} variant="outlined" size="small">
          Register
        </Button></li>
        <li><Button onClick={login} variant="outlined" size="small">
          Login
        </Button></li>
      </ul>
    )}

    </nav>
  )
}

export default AuthOptions