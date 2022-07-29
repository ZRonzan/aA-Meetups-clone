// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import "./ModalLoginForm.css"
import { Link, useHistory } from "react-router-dom";

function LoginForm({setShowModal}) {

  const history = useHistory()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [response, setResponse] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }

    let res = await dispatch(sessionActions.loginUserSession(user));
    if (!res.message) {
      setResponse("")
      history.push("/")
      setPassword("");
      setEmail("");
    } else {
      setResponse(res)
    }

  }

  return (
    <div className="modal-login-form-container">
      <form onSubmit={handleSubmit} className="modal-login-form">
        <div className="modal-login-form-cross" onClick={() => setShowModal(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="modal-login-form">
          <h2>Log in</h2>
          <div>
            Not a member yet? <span><Link className="modal-login-form-signup-link" to="/sign-up" onClick={() => setShowModal(false)}>Sign up</Link></span>
          </div>
        </div>
        <label className="modal-login-form">
          Email
          <input
            className="modal-login-form"
            type="text"
            value={email}
            onChange={(e) => {
              setResponse("")
              setEmail(e.target.value)
            }}
            required
          />
        </label>
        <label className="modal-login-form">
          Password
          <input
            className="modal-login-form"
            type="password"
            value={password}
            onChange={(e) => {
              setResponse("")
              setPassword(e.target.value)
            }}
            required
          />
        </label>
        <button type="submit" className="modal-login-form">Log In</button>
        {response && (
          <>
            <div className="modal-login-error" >Your email or password was entered incorrectly</div>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
