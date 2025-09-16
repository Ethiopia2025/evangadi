import React, { useState } from "react";
// import axiosInstance from "../../Api/axiosConfig";
import axiosInstance from "../../Api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import About from "../../Components/About/About";
import classes from "./Register.module.css";
function Register() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // ✅ fixed typo

    try {
      await axiosInstance.post("/users/register", {
        userName,
        firstName,
        lastName,
        email,
        password,
      });
      console.log("User registered successfully!");
      navigate("/");
      // You can also redirect or clear the form here
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <section className={classes.container}>
      <div className={classes.contain}>
        <div className={classes.sign}>
          <h2>Join The Network</h2>
          <p>
            Already have an account
            <Link to="/login">Sign In</Link>
          </p>
        </div>
        {/* ✅ attach onSubmit to the form */}
        <form onSubmit={handleSubmit}>
          {/* <label>Username</label> */}
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />

          <div className={classes.first}>
            {/* <label>First Name</label> */}
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />

            {/* <label>Last Name</label> */}
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>

          {/* <label>Email</label> */}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {/* <label>Password</label> */}
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button type="submit">Join and Agree</button>
        </form>
        <div className={classes.already}>
          <p>I agree the privacy policy and term of service</p>
          <Link to="/login">Already have an account? </Link>
        </div>
      </div>
      <About />
    </section>
  );
}

export default Register;
