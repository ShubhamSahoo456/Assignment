import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

const RegisterScreen = () => {
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerNewUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/register",
        registerUser
      );
      if (data.status) {
        alert(`${data.user.name} registered successfully`);
        setRegisterUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login_container">
        <div className="register_wrapper">
          <div className="login_left">
            <div className="text_">
              <h1>Register Your Account</h1>
            </div>
          </div>
          <div className="register_right">
            <form onSubmit={registerNewUser}>
              <input
                type="text"
                placeholder="FullName"
                className="login_input"
                name="name"
                value={registerUser.name}
                onChange={(e) =>
                  setRegisterUser({
                    ...registerUser,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Email"
                className="login_input"
                name="email"
                value={registerUser.email}
                onChange={(e) =>
                  setRegisterUser({
                    ...registerUser,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="login_input "
                name="password"
                value={registerUser.password}
                onChange={(e) =>
                  setRegisterUser({
                    ...registerUser,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="Re-enter Password"
                className="login_input"
                name="confirmPassword"
                value={registerUser.confirmPassword}
                onChange={(e) =>
                  setRegisterUser({
                    ...registerUser,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button type="submit" className="login_input btn_login">
                Sign Up
              </button>
            </form>
            <div className="create_account">
              <Link to="/login" style={{ width: "80%", textAlign: "center" }}>
                <button>Login Into Account</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
