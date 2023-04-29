import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navingbar from './Navbar';

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    const { name, password } = user;
    if (!name || !password) {
      toast.error("Missing a field!");
      return;
    }
    axios.post("http://localhost:5000/login", user).then((res) => {
      toast(res.data.message);
      setLoginUser(res.data.user);
      navigate("/");
    });
  };

  return (
    <>
	  <Navingbar userID={0} />
      <div style={{
        padding: '20px'
      }}>
        <h1>Login to your account</h1>
        <p>
          Don't have an account? <a href="/register">Register here.</a>
        </p>
        <div>
          <form action="#">
            <div>
              <input
                type="text"
                id="sign-in-name"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Username"
                autocomplete="off"
              />
            </div>
            <div class="flex flex-col mb-6">
              <input
                type="password"
                id="sign-in-password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div class="flex w-full">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
