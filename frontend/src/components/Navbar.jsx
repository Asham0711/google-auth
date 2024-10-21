import { useEffect, useState } from "react";
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const setToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setData(token); // Parse if the data is stored as JSON
    }
    else{
      setData(null);
    }
  }

  useEffect(() => {
    // Get the item from local storage
    setToken();
  });

  const logOutHandler = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setToken();
      navigate('/');
    } catch (error) {
      console.log(error);
    } 
  }

  const signUpHandler = () => {
    navigate('/signup');
  }

  return (
    <div className='flex justify-between items-center px-12 py-2 shadow-lg'>
        <div>
            <img src={logo} alt="Logo"  className='h-10'/>
        </div>
        <div className="pr-4">
            {data ? (
                <button className="bg-blue-100 border-blue-500 border-2 px-4 py-2 rounded-full text-center" onClick={logOutHandler}>Logout</button>
            ) : (
                <button className="bg-blue-100 border-blue-500 border-2 px-4 py-2 rounded-full text-center" onClick={signUpHandler}>Signup</button>
            )}
        </div>
    </div>
  )
}

export default Navbar