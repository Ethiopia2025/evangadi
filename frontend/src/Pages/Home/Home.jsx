import React, { useContext} from "react";
import { Link} from "react-router-dom";
import AllQuestions from "../../Components/AllQuestions/AllQuestions";
import { AppState } from "../../App";
import classes from "./Home.module.css";

function Home() {
  const { user } = useContext(AppState);



  return (
    <section className={classes.container}>
      <div className={classes.ask}>
        <Link to="/ask" className={classes.askQ}>Ask Question</Link>
        <p>Welcome: {user?.userName}</p>
      </div>
      <div>
        <h2>Questions</h2>
        
        <div>
          <AllQuestions />
        </div>
      </div>
    </section>
  );
}

export default Home;
