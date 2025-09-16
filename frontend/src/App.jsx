import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import axiosInstance from "./Api/axiosConfig";
import { createContext, useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import QuesDetAndAnswer from "./Pages/QuesDetAndAnswer/QuesDetAndAnswer";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";



export const AppState = createContext();

function App() {
  const [user, setUser] = useState(null); // start with null (no user check yet)
const token = localStorage.getItem("token");

    async function checkUser() {
      try {
        const res = await axiosInstance.get("/users/check",{
          headers: {
            Authorization: "Bearer " + token
          }
        });
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Error checking user:", error);
      }
    }
      useEffect(() => {
        checkUser();
      }, []); // run once when App mounts
  return (
    <Router>
      <AppState.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/question/:qId" element={<QuesDetAndAnswer />} />
          <Route path="/ask" element={<AskQuestion />} />
        </Routes>
        <Footer />
      </AppState.Provider>
    </Router>
  );
}

export default App;
