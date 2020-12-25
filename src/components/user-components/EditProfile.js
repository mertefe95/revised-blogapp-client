import React, {useState, useContext } from "react";
import UserContext from ".././context/UserContext";
import Axios from "axios";
import ErrorNotice from "../utils/ErrorNotice";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const EditProfile = () => {
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [nationality, setNationality] = useState();
    const [pointOfInterests, setPointOfInterests] = useState();
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const { userData} = useContext(UserContext); 
    

    const changeOnClick = e => {
        e.preventDefault();
        
        try {

        const post = {
            firstname,
            lastname,
            nationality,
            pointOfInterests
        };
        
  

        Axios
            .put(`http://localhost:8080/userprofiles/edit/${userData.user.id}`, post)
            .then(res => setMessage(res.data.msg))
            .catch(err => {
                err.response.data.msg && setError(err.response.data.msg);
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }}
    
        const useStyles = makeStyles((theme) => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
              },
            },
          }));
    
        const classes = useStyles();


    return (
        
        <div id="edit-profile-page">
            <h1>Edit User Profile</h1>
            
            <h4>
            {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            </h4>
            {message ? <span className="message"><Alert severity="success">{message}</Alert></span> : <span></span>}
            


    <form id="edit-profile-form" className={classes.root} noValidate autoComplete="off" onSubmit={changeOnClick} encType="multipart/form-data" >

        <TextField id="outlined-basic" label="First Name " variant="outlined" onChange={e => setFirstname(e.target.value)} />
        <TextField id="outlined-basic" label="Last Name " variant="outlined" onChange={e => setLastname(e.target.value)} />
        <TextField id="outlined-basic" label="Nationality " variant="outlined" onChange={e => setNationality(e.target.value)}/>
        <TextField id="outlined-basic" label="Point Of Interests " variant="outlined" onChange={e => setPointOfInterests(e.target.value)} />
        <Button id="login-btn" variant="outlined" type="submit">
        Submit
        </Button>

    </form>

   
</div>


    )
    }
export default EditProfile;