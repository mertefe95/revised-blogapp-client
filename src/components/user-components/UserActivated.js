import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';

function UserActivated({ match }) {

  const [error, setError] = useState();
  const [noticeMessage, setVerifyMessage] = useState({
    text: undefined
});

useEffect(() => {
  try {
    Axios.get(`https://blog-app-revised.herokuapp.com/users/activation/${match.params.activationKey}`)
    .then(res => [
      setVerifyMessage({
        text: res.data.msg }),
    ]).catch(err => err.response.data.msg && setError(err.response.data.msg));
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
  }, []);


  return (
    <div id="user-activated-page">
    <h2>User Activation</h2>

    <h4 className="error-message"> {error && <Alert severity="error" onClose={() => setError(undefined)}>{error}</Alert>}  </h4>

    <h3 className="success-message">{noticeMessage.text && <Alert severity="success">{noticeMessage.text}</Alert>} </h3>
    <h4>{noticeMessage.text ? ( <Link to="/login">Please proceed to Login</Link> ) : (  <> </> ) }</h4> 
  
</div>
  )
}

export default UserActivated
