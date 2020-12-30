import React, {useState, useContext } from "react";
import UserContext from ".././context/UserContext";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const EditPost = props => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState();

    const { userData} = useContext(UserContext); 
    const userId = userData.user.id

    const changeOnClick = e => {
        e.preventDefault();
        
        try {

        const post = {
            blogTitle,
            blogText,
            userId
        };
        
        Axios
            .put(`https://blog-app-revised.herokuapp.com/posts/edit/${props.match.params.id}`, post)
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
        
        <div id="edit-post-page">
            <h2>Update Blog Post</h2>
            <h3 className="success-message">{message && <Alert severity="success">{message}</Alert>} </h3>
            <h4 className="error-message">
            {error && <Alert severity="error" onClose={() => setError(undefined)}>{error}</Alert>} 
            </h4>


            <form id="edit-post-form" onSubmit={changeOnClick} encType="multipart/form-data"  className={classes.root} noValidate autoComplete="off">    
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
            <Button variant="contained" type="submit">
                Submit
            </Button>


        </form>
</div>


    )
    }
export default EditPost;