import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import  { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';


const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const createPost = () => history.push("/create-post")
  const register = () => history.push("/register");
  const myprofile = () => history.push(`/myprofile/${userData.user.id}`)
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
      <li className="header-li"><Button variant="outlined" size="small" onClick={createPost}>CREATE A POST</Button></li>
      <li className="header-li"><Button variant="outlined" size="small" onClick={myprofile}>MY PROFILE ({userData.user.username})</Button></li>
      <li className="header-li"><Button variant="outlined" size="small" onClick={logout}>Logout</Button></li>
      </ul>
    ) : (
      <ul className="header-ul">
        <li className="header-li"><Button onClick={register} variant="outlined" size="small">
          Register
        </Button></li>
        <li className="header-li"><Button onClick={login} variant="outlined" size="small">
          Login
        </Button></li>
      </ul>
    )}

    </nav>
  )
}

export default AuthOptions