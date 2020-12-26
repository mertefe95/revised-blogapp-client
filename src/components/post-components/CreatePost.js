import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../context/UserContext";
import Alert from "@material-ui/lab/Alert";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const CreatePost = () => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState();
    
    const { userData } = useContext(UserContext); 
        
    const authorName = userData.user.username
    const userId = userData.user.id

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));

    const classes = useStyles();

    const changeOnClick = e => {
        
    
        e.preventDefault();

        try {
        const post = {
            blogTitle,
            blogText,
            userId,
            authorName
        }

        Axios
            .post("https://blog-app-revised.herokuapp.com/posts/add", post)
            .then(res => setMessage(res.data.msg))
            .catch(err => {
                err.response.data.msg && setError(err.response.data.msg);
            });
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }}
    
    return (

        <div className="create-post-page">
            <h1>Create a Blog Post</h1>
            <h3 className="success-message">{message && <Alert severity="success">{message}</Alert>} </h3>
            <h4 className="error-message">
            {error && <Alert severity="error" onClose={() => setError(undefined)}>{error}</Alert>} 
            </h4>
            
            <form id="create-post-form" onSubmit={changeOnClick} encType="multipart/form-data"  className={classes.root} noValidate autoComplete="off">    
        <TextField 
            label="Blog Title"
            type="text"
            autoComplete="current-blogTitle"
            id="blogTitle"
            onChange={e => setBlogTitle(e.target.value)}
        />
        <TextField 
            label="Blog Text"
            type="text"
            autoComplete="current-blogText"
            id="blogText"  
            onChange={e => setBlogText(e.target.value)} 
        />
            <Button variant="contained" color="default" type="submit">
                Submit
            </Button>


        </form>
        </div>
    )
}



export default CreatePost;