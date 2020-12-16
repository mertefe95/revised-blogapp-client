import './App.scss';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import UserContext from "./components/context/UserContext";
import ErrorNotice from "./components/utils/ErrorNotice";
import EditPost from "./components/post-components/EditPost";
import CreatePost from "./components/post-components/CreatePost";
import AdminLogin from "./components/user-components/AdminLogin";
import Post from "./components/post-components/Post";
import Posts from "./components/post-components/Posts";
import Axios from "axios";
import Register from "./components/user-components/Register";
import Login from './components/user-components/Login';
import ForgotPassword from "./components/user-components/ForgotPassword";
import ChangePassword from './components/user-components/ChangePassword';



function App() {
  const [posts, setPosts] = useState([])
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const userRes = await Axios.post(
        "http://localhost:8080/users/tokenIsValid",
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
    .get('http://localhost:8080/posts')
    .then(res => setPosts(res.data))
    .catch(error => console.log(error));
  })

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
      <Header />
      <Switch>
        <Route exact path="/" exact render={() => <Posts posts={posts} />} />
        <Route exact path="/post/:id" exact render={(props) => <Post {...props} posts={posts} />} />
        <Route exact path="/admin-login" exact component={AdminLogin} />
        <Route exact path="/register" exact component={Register} />
        <Route exact path="/login" exact component={Login} />
        <Route exact path="/forgot-password" exact component={ForgotPassword} />
        <Route exact path="/change-password/:forgotToken" exact component={ChangePassword} />
        <Route exact path="/user-activated/:activationKey" exact component={UserActivated} />
      </Switch>
      <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
