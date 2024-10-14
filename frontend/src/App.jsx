import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import axios from "./api/axios";

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me", {
          withCredentials: true,
        });
        console.log("Res -> ", res);
        setUserData(res?.data);
        if (userData) {
          console.log("User Data ->", userData);
          const token = userData.token;
          localStorage.setItem("token", token);
        }
        else{
          console.log("No user found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home userData={userData} />} />
      </Routes>
    </Router>
  );
}

export default App;
