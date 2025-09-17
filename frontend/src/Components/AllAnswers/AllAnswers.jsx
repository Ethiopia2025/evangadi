import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosConfig";
import { AppState } from "../../App";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "./AllAnswers.module.css";


function AllAnswers() {
  const [allAnswers, setAllAnswers] = useState([]);
// const[singleQuestion,setSingleQuestion] = useState()
const {user} = useContext(AppState)


  useEffect(() => {
    axiosInstance
      .get(`/answers/allAnswers`)
      .then((res) => {
        console.log(res.data);
        // Adjust depending on your backend response structure
        setAllAnswers(res.data.answers || res.data);
      })
      .catch((err) => {
        console.error("Error fetching answers:", err);
      });
  }, []);

  return (
    <div className={classes.container}>
      {allAnswers.map((answer) => (
        <div key={answer.answerId} className="answer-card">
          <div className={classes.answera}>
            <div className={classes.account}>
              <AccountCircleIcon style={{ fontSize: "50px" }} />
              <span>{user?.userName}</span>
            </div>
            <p>{answer.answer}</p>
          </div>
          {/* <small>By: {answer.userName}</small> */}
        </div>
      ))}
    </div>
  );
}

export default AllAnswers;
