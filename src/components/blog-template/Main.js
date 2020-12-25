import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React, { useContext, useState } from "react";
import UserContext from ".././context/UserContext";
import { Link } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../utils/ErrorNotice";


export default function Main(props) {
  const { title, posts } = props;
  const { userData } = useContext(UserContext); 
  const [post, setPost] = useState([]);
  const [error, setError] = useState();

  const useStyles = makeStyles((theme) => ({
    markdown: {
      ...theme.typography.body2,
      padding: theme.spacing(3, 0),
    },
  }));

  const classes = useStyles();
        
  
  const deletePost = id => {
    try {
        Axios.delete(`https://blog-app-revised.herokuapp.com/posts/${id}`)
            .then(res => alert(res.data))
            setPost(post.filter(elem => elem._id !== id));
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
          <h4>
          {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
          )}
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
  );
}