import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../Api/axiosConfig";
import { AppState } from "../../App";
import classes from "./askQuestion.module.css";

function AskQuestion() {
  const { user } = useContext(AppState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/question/askQuestion",
        {
          userId: user.userId,
          title,
          description,
          tag,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className={classes.container}>
      <div>
        <h1>Steps to Write a good question </h1>
        <ul>
          <li>summerize your problem in a one-line title</li>
          <li>Describe your problems more details</li>
          <li>Describe what tried and what you expected to happens</li>
          <li>Review your question and post it the site</li>
        </ul>
      </div>

        <div>
          <h1>Ask a public question</h1>
          <Link to="/">go to question page</Link>
        </div>
      <div  className={classes.ask}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          type="text"
          placeholder="question Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="question tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
        />

        <button type="submit" onClick={handleSubmit}>
          post the question
        </button>
      </div>
    </section>
  );
}

export default AskQuestion;
