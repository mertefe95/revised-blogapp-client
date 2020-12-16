import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";





function App() {
  return (
    <Router>
      <Header />
      <Switch>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
