import React from "react";
import wear from "../../assets/images/evan_footer_logo.png";
import { SlSocialFacebook } from "react-icons/sl";
import { LuInstagram } from "react-icons/lu";
import { LuYoutube } from "react-icons/lu";
import classes from "./footer.module.css";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <section className={classes.container}>
      <div className={classes.Footer}>
        <a href="">
          <img src={wear} alt="" />
        </a>
        <div>
          <SlSocialFacebook />
          <LuInstagram />
          <LuYoutube />
        </div>
      </div>
      <div>
        <h2>useful Link</h2>
        <p>how it works</p>
        <p>Terms of service</p>
        <p>Privacy policy</p>
      </div>
      <div>
        <h2>contact info</h2>
        <Link to="https://evangadi.com/">Evangadi Networks</Link>
        <p>suport@evangadi.com</p>
        <p>phone number</p>
      </div>
    </section>
  );
}

export default Footer;
