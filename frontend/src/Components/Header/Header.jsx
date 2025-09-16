import React, { useContext } from "react";
import abebe from "../../assets/images/evangadi_logo.png";
import classes from "./Header.module.css";
import {Link, useNavigate} from "react-router-dom"
import { AppState } from "../../App";

function Header() {
  const {user,setUser} = useContext(AppState);
  console.log(user);
  
  const navigate = useNavigate();
  const Logout = () =>{
localStorage.removeItem("token");
setUser(null);
navigate("/login");
  };
  
  return (
    <section>
      <div className={classes.header}>
        <Link to="">
          <img src={abebe} alt="" />
        </Link>
        <div >
          <h2>Home</h2>
          <h2>How It Works</h2>
          {
            user? (
              <button onClick={Logout}>LogOut</button>
            ):(

              <button onClick={()=>navigate("/login")}>LogIn</button>
            )
          }
        </div>
      </div>
    </section>
  );
}

export default Header;
