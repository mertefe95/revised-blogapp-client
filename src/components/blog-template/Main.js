import React from "react";
import PostList from "./PostList";


export default function Main(props) {
  const { title, posts } = props;

  return (
    <PostList title={title} posts={posts} />
  );
}

