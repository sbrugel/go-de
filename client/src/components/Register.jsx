import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div>
          <h1>Create a new account</h1>
          <p>Already have an account? <a href="/login">Sign in here.</a></p>
          <div class="p-6 mt-8">
            <form action="#">
              <div>
                  <input
                      type="text"
                      id="create-account-name"
                      name="name"
                      value={ user.name }
                      onChange={ handleChange }
                      autocomplete="off"
                      placeholder="Username"
                  />
              </div>
              <div>
                  <input
                    type="password"
                    id="create-account-password"
                    name="password"
                    value={ user.password }
                    onChange={ handleChange }
                    placeholder="Password"
                  />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={register}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  };

export default Register;