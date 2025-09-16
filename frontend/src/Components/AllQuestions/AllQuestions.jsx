import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosConfig";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppState } from "../../App";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import classes from "./AllQuestions.module.css"

function AllQuestions() {
  const [allQuestions, setAllQuestions] = useState([]);
  const { user } = useContext(AppState);

  useEffect(() => {
    axiosInstance
      .get("/question/allQuestions")
      .then((res) => {
        console.log(res.data);
        setAllQuestions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  }, []);

  return (
    <div className={classes.container}>
      {allQuestions.map((q) => (
        <Link to={`/question/${q.questionId}`} key={q.questionId}>
          <hr style={{color: 'lightgrey'}} />
          <div className={classes.question_container}>
            <div>
              <AccountCircleIcon style={{fontSize:"50px"}} />
              <span>{user?.userName}</span>
            </div>
            <h3>{q.title}</h3>
            <div>
              <ArrowForwardIosIcon />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllQuestions;
