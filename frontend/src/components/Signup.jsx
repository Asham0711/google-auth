import { useState } from "react";
import axios from "../api/axios";
import bg from '../assets/background.jpg';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/signup",
        formData
      );
      console.log(response.data);
      navigate('/signin');
    } catch (err) {
      console.log(err);
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
        <h1 className="text-3xl mb-2">Signup</h1>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded-xl border-2 border-black"
        />
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 rounded-xl border-2 border-black"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded-xl border-2 border-black"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 rounded-xl border-2 border-black"
        />
        <div className="flex justify-center items-center gap-3">
          <button type="submit"
            className="bg-blue-100 border-blue-500 border-2 px-4 py-2 rounded-full text-center"
          >
            Sign Up
          </button>
          <button
            onClick={() =>
              (window.location.href = "http://localhost:3000/auth/google")
            }
            className="bg-blue-100 border-blue-500 border-2 px-4 py-2 rounded-full text-center flex justify-center items-center gap-3"
          >
            <FcGoogle />
            Google Signup
          </button>
        </div>
        <div>Already have an account? <Link to='/signin' className="text-blue-700">Signin</Link></div>
      </form>
    </div>
  );
};

export default Signup;
