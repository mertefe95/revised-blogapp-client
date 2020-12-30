import React, { useState, useEffect, useContext } from 'react'
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Alert from "@material-ui/lab/Alert";
import UserContext from "../context/UserContext";


const PostList = ({title, posts }) => {
  const [post, setPosts] = useState([]);
  const { userData } = useContext(UserContext)
  const [error, setError] = useState();

  
  const useStyles = makeStyles((theme) => ({
  markdown: {
  ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  }));


  const deletePost = id => {
    try {
        Axios.delete(`https://blog-app-revised.herokuapp.com/posts/${id}`)
            .then(res => alert(res.data))
            setPosts(post.filter(elem => elem._id !== id));
        }   catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }}


  return (
      
  <Grid item xs={12} md={8}>
  <Typography variant="h6" gutterBottom>
    {title}
  </Typography>
  <Divider />
  { posts.map((post) => (
    <div className="post-div" key={post._id}>
      <div>
      <h5 className="post-title"><Link className="title-link" to={{
        pathname: `/post/${post._id}`
      }}>{post.blogTitle}</Link></h5>
      <p className="post-time-author">{post.createdAt} by <Link className="author-link" to="#">{post.authorName}</Link> </p>
      <p className="post-text">{post.blogText}</p>
      <p className="post-category"><Link className="post-category-link" to={`/category/${post.category}`}>#{post.category}</Link></p>
      <h4>
      <h4 className="error-message">
            {error && <Alert severity="error" onClose={() => setError(undefined)}>{error}</Alert>} 
      </h4>
      </h4>
      </div>
      { userData.user && userData.user.id === post.userId ? (
        <div className="post-icons-div">
        <Link to={`/edit-post/${post._id}`}><i className="edit far fa-edit"></i></Link>
        <Link className="bin-link"><button className="bin-button" onClick={() => deletePost(post._id)}><i className="bin far fa-trash-alt"></i></button></Link>
        </div>
    ) : (
        <>
        </>
    )}

      </div>
  ))}
</Grid>

)}

export default PostList;