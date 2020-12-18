import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import UserContext from "../context/UserContext";
import { Container, Grid, Divider } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ErrorNotice from "../utils/ErrorNotice"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import date from 'date-and-time';

const Posts = ({ posts }) => {
    const [post, setPost] = useState([]);
    const [error, setError] = useState();

    const { userData} = useContext(UserContext); 


const deletePost = id => {
    try {
        Axios.delete(`http://localhost:8080/posts/${id}`)
            .then(res => alert(res.data))
            setPost(post.filter(elem => elem._id !== id));
        }   catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        },
        bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
        },
        title: {
        fontSize: 14,
        },
        pos: {
        marginBottom: 12,
        },
});


const classes = useStyles();
const bull = <span className={classes.bullet}>•</span>;
        
return (

    <div>
    Welcome to the Viewing all the Blog Posts.
    
    {posts.map((post, key) => (
    <div className="post-div" key={key}>


        <Container className={classes.root} maxWidth="md">
        <Grid item className="grid-item">
        <CardActions>
        <Link to={{
            pathname: `/post/${post._id}`
        }}>

        <h2 className="blog-title">{post.blogTitle}</h2>
        </Link>
        </CardActions>

        <p>Created on  <q>{ post.createdAt }</q> by  {post.authorName}</p>


        </Grid>


        <Grid item className="grid-item">
        <p>{post.blogText}</p>
        </Grid>
     
      </Container>

      <Divider />

        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>
        
        { userData.user && userData.user.id === post.userId ? (
            <div className="post-icons-div">
            <Link to={`/edit-post/${post._id}`}><i className="far fa-edit"></i></Link>
            <Link><button onClick={() => deletePost(post._id)}><i className="far fa-trash-alt"></i></button></Link>
            </div>
        ) : (
            <>

            </>
        )}
        
    </div>
    ))}
    </div>
    )
};

export default Posts;