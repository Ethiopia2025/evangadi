import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosConfig";
import { AppState } from "../../App";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


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
    <div>
      {allAnswers.map((answer) => (
        <div key={answer.answerId} className="answer-card">
          <AccountCircleIcon />
          <span>{user?.userName}</span>
          <p>{answer.answer}</p>
          {/* <small>By: {answer.userName}</small> */}
        </div>
      ))}
    </div>
  );
}

export default AllAnswers;
