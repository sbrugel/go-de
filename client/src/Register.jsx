import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navingbar from './Navbar';
import './App.css';

const Register = () => {
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
  
    const register = (e) => {
      e.preventDefault();
  
      const { name, password } = user;
      if (name && password) {
        axios
          .post("http://localhost:5000/register", user).then((res) => {
            toast(res.data.message);
          })
      } else {
        toast.error("Missing a field!");
      }
    };
  
    return (
      <>
	    <Navingbar user={0} />
        <div className="go-login-wrapper">
          <h1>Create a new account</h1>
          <p>
			Already have an account? <a href="/login">Sign in here.</a>
		  </p>
		  <Form>
				<Form.Group>
					<Form.Control
						type="text"
						id="create-account-name"
						name="name"
						value={ user.name }
						onChange={ handleChange }
						autocomplete="off"
						placeholder="Username"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						id="create-account-password"
						name="password"
						value={ user.password }
						onChange={ handleChange }
						placeholder="Password"
					/>
				</Form.Group>
				<Form.Group>
					<Button
						type="submit"
						onClick={register}
					>
						Register
					</Button>
				</Form.Group>
		  </Form>
        </div>
        <ToastContainer />
      </>
    );
  };

export default Register;