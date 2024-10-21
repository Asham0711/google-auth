import { useState } from "react";
import axios from "../api/axios";
import bg from '../assets/background.jpg';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/signin",
        formData
      );
      // Handle successful sign-in (e.g., save token, redirect to home page)
      console.log("User signed in:", response.data);
      const token = response.data.token;
      localStorage.setItem("token",token);
      const username = response.data.user.username;
      localStorage.setItem("username",username);
      navigate('/');
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className='h-screen flex w-full justify-center items-center flex-col' style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <form onSubmit={handleSubmit}
        className="flex flex-col p-6 bg-slate-200 gap-3 w-96 justify-center items-center"
      >
        <h1 className="text-3xl mb-2">Signin</h1>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          value={formData.email}
          className="w-full p-2 rounded-xl border-2 border-black"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          value={formData.password}
          className="w-full p-2 rounded-xl border-2 border-black"
        />
        <div className="flex justify-center items-center gap-3">
          <button type="submit" 
            className="bg-blue-100 border-blue-500 border-2 px-4 py-2 rounded-full text-center"
          >
            Sign In
          </button>
          <button
            onClick={() =>
              (window.location.href = "http://localhost:3000/auth/google")
            }
            className="bg-blue-100 border-blue-500 border-2 px-4 py-2 rounded-full text-center flex justify-center items-center gap-3"
          >
            <FcGoogle />
            Google Signin
          </button>
        </div>
        <div>Don't have an account? <Link to='/signup' className="text-blue-700">Signup</Link></div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      
    </div>
  );
};

export default Signin;
