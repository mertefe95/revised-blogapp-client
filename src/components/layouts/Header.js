import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../utils/AuthOptions";


const Header = () => {
  return (
    <div className="header">
      <Link to="/">Revised blog</Link>

      <AuthOptions />

    </div>
  )
}

export default Header