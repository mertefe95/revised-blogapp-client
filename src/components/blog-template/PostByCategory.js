import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { useParams } from "react-router-dom";
import PostList from "./PostList";

function PostByCategory() {
  const [posts, setPosts] = useState([]);

  const { name } = useParams()

  useEffect(() => { 
    Axios
    .get(`https://blog-app-revised.herokuapp.com/posts/category/${name}`)
    .then(res => setPosts(res.data))
    .catch(error => console.log(error));
  },[name])


  return (
    <PostList title={name}  posts={posts} />
  );
}
export default PostByCategory
