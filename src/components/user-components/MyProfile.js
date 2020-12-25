import React, {useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const MyProfile = () => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [nationality, setNationality] = useState();
  const [pointOfInterests, setPointOfInterests] = useState();
  const [error, setError] = useState();

  const { userData } = useContext(UserContext);
  const history = useHistory();


  useEffect(() => {
    try {
    Axios.get(`https://blog-app-revised.herokuapp.com/userprofiles/${userData.user.id}`)
    .then(res => [
        setFirstname(res.data.firstname),
        setLastname(res.data.lastname),
        setNationality(res.data.nationality),
        setPointOfInterests(res.data.pointOfInterests)
    ])
    .catch(err => err.response.data.msg && setError(err.response.data.msg));
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
}, [userData]);

  const editUserProfile = () => history.push(`/myprofile/edit/${userData.user.id}`)

  return (
    <div id="my-profile">
    <ul className="my-profile-ul">
    <li><Avatar>{userData.user.username[0]}</Avatar></li>
    <li><p>Username: {userData.user.username}</p></li>
    <li><p>Firstname: {firstname}</p></li>
    <li><p>Lastname: {lastname}</p></li>
    <li><p>Nationality: {nationality}</p></li>
    <li><p>Point of Interests: {pointOfInterests}</p></li>
    <li><p>{error}</p></li>
    <li><Button id="login-btn" variant="outlined" type="submit" onClick={editUserProfile}>
        Edit
    </Button></li>

    </ul>
    </div>
  )
}

export default MyProfile;