import React, { useState } from "react";
import axiosInstance from "../../Api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import About from "../../Components/About/About";
import classes from "./login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("fill all fields")
      return;
    }
    try {
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      console.log(res.data.token);

      alert("User logged in successfully!");
      localStorage.setItem("token", res.data.token);
      // console.log("Saved token:", localStorage.getItem("token"));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className={classes.container}>
      <div className={classes.login}>
        <div>
          <h2>Login your account</h2>
          <p>
            do not have an account?
            <Link to="/register">create a new account</Link>
          </p>
        </div>
        <form action="" className={classes.form}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
          <Link to="/register">create an account?</Link>
        </form>
      </div>
      <About />
    </section>
  );
}

export default Login;
