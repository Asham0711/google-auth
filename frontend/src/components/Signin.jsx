import { useState } from "react";
import axios from "axios";

const Signin = () => {
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signin",
        formData
      );
      // Handle successful sign-in (e.g., save token, redirect to home page)
      console.log("User signed in:", response.data);
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          value={formData.password}
        />
        <button type="submit">Sign In</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={() =>
          (window.location.href = "http://localhost:3000/auth/google")
        }
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Signin;
