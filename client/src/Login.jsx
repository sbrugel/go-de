import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navingbar from './Navbar';
import './App.css';

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
      <div className="go-login-wrapper">
	    <h1>Login to your account</h1>
        <p>
          Don't have an account? <a href="/register">Register here.</a>
        </p>
		<Form>
			<Form.Group>
				<Form.Control
					type="text"
					id="sign-in-name"
					name="name"
					value={user.name}
					onChange={handleChange}
					placeholder="Username"
					autocomplete="off"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type="password"
					id="sign-in-password"
					name="password"
					value={user.password}
					onChange={handleChange}
					placeholder="Password"
				/>
			</Form.Group>
			<Form.Group>
				<Button
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						login();
					}}
				>
					Login
				</Button>
			</Form.Group>
		</Form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
