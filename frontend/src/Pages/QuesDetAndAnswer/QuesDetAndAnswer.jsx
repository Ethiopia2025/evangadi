import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosConfig";
import { AppState } from "../../App";
import classes from "./QuestionPage.module.css";
import AllAnswers from "../../Components/AllAnswers/AllAnswers";

function QuestionPage() {
  const { user } = useContext(AppState);
  const { qId } = useParams();
   console.log(qId);
   
  const [question, setQuestion] = useState(null);
  // const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const token = localStorage.getItem("token");

  // Fetch question & answers
useEffect(() => {
  
    const fetchQuestion = async () => {
      try {
        const res = await axiosInstance.get(
          `/question/${qId}`
        );
        console.log(res.data);
        
        setQuestion(res.data);
      } catch (err) {
        console.error(err.message);
      } 
    };

    fetchQuestion();
  }, [qId]);

  // Submit new answer
  async function handleSubmit(e) {
    e.preventDefault();
    

    try {
      await axiosInstance.post(`/answers/createAnswer`, {
        userId: user.userId,
        questionId : qId,
        answer: newAnswer,
      },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

     alert("Answer posted successfully");
      setNewAnswer("");
      // const res = await axiosInstance.get(`/answers/${qId}`).then((res)=>{
      //   console.log(res);
        
      // });
    } catch (err) {
      console.error("Error posting answer:", err);
    }
  }

  return (
    <section className={classes.container}>
      {/* Question */}
      {/* {question && ( */}
        <div className={classes.questionBox}>
          <h2>Question</h2>
          <p>
            <strong>{question?.title}</strong>
          </p>
          <p className={classes.desc}>{question?.description}</p>
        </div>
      {/* )} */}

      {/* Answers */}
      <div className={classes.answersBox}>

        <h3>Answer From The Community</h3>
        <Link to="/">Go To Questions page</Link>
       <AllAnswers />
      </div>

      {/* Post Answer */}
      <div className={classes.postAnswer}>
        <h3>Answer The Top Question</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your Answer..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button type="submit">Post Your Answer</button>
        </form>
      </div>
    </section>
  );
}

export default QuestionPage;
