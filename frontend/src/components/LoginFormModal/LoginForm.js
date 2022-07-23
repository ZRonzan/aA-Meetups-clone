// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./ModalLoginForm.css"
import { useHistory } from "react-router-dom";

function LoginForm() {

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
    <form onSubmit={handleSubmit} className="modal-login-form">
      <h2>LOG IN</h2>
      <label className="modal-login-form">
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="modal-login-form">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="modal-login-form">Log In</button>
      {response && (
        <>
          <h4>{response.message}</h4>
          {/* {!!response.errors && (
            <ul className="login-form">
              {response.errors.map((message, i) => {
                return (<li key={i}>{Object.keys(message)}: {Object.values(message)}</li>)
              })}
            </ul>
          )} */}
        </>
      )}
    </form>
  );
}

export default LoginForm;
