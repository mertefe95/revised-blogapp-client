import './App.scss';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./components/blog-template/Header";
import Footer from "./components/blog-template/Footer";
import UserContext from "./components/context/UserContext";
import EditPost from "./components/post-components/EditPost";
import CreatePost from "./components/post-components/CreatePost";
import AdminLogin from "./components/user-components/AdminLogin";
import Post from "./components/post-components/Post";
import Axios from "axios";
import Register from "./components/user-components/Register";
import Login from './components/user-components/Login';
import ForgotPassword from "./components/user-components/ForgotPassword";
import ChangePassword from './components/user-components/ChangePassword';
import UserActivated from "./components/user-components/UserActivated";
import Blog from "./components/blog-template/Blog";
import MyProfile from "./components/user-components/MyProfile";
import EditProfile from "./components/user-components/EditProfile";
import PostsByCategory from "./components/blog-template/PostByCategory";

function App() {
  const [posts, setPosts] = useState([])

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });


  const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
  ];

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const userRes = await Axios.post(
        "https://blog-app-revised.herokuapp.com/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
        );

      setUserData({
        token,
        user: userRes.data
      });
    }

    checkLoggedIn();
  }, []);

  useEffect(() => {
    Axios
    .get('https://blog-app-revised.herokuapp.com/posts/')
    .then(res => setPosts(res.data.reverse()))
    .catch(error => console.log(error));
  })

  
  return (
    
    <Router>
    <UserContext.Provider value={{ userData, setUserData }}>
    <Header title="Blog" sections={sections} />
      <Switch>
        <Route exact path="/" render={() => <Blog posts={posts} />} />
        <Route exact path="/post/:id" render={(props) => <Post {...props}  posts={posts} />} />
  
        <Route exact path="/admin-login"  component={AdminLogin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password"  component={ForgotPassword} />
        <Route exact path="/change-password/:forgotToken" component={ChangePassword} />
        <Route exact path="/user-activated/:activationKey" component={UserActivated} />
        <Route exact path="/category/:name" component={Blog} />
        { userData.user ? (
          <Route exact path="/myprofile/edit/:id" component={EditProfile} />
        ) : (
          <>
          </>
        )}
        { userData.user ? (
          <Route exact path="/myprofile/:id"  component={MyProfile} />
        ) : (
          <>
          </>
        )}
        { userData.user ? (
          <Route exact path="/edit-post/:id"  render={(props) => <EditPost {...props}  posts={posts} />} />        
          ) : (
          <>
          </>
          )} 
        { userData.user ? (
          <Route exact path="/create-post"  component={CreatePost} />      
        ) : (
          <>
          </>
        )} 
      </Switch>
     
      </UserContext.Provider>
    </Router>

  );
}

export default App;
