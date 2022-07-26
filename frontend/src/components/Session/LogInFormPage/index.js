import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { loginUserSession } from "../../../store/session"

import "./LoginForm.css"

export default function LogInFormPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    //check to see if a user is already logged in and redirect if so
    const user = useSelector(state => state.session.user)

    if (user) {
        history.push("/")
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }

        let res = await dispatch(loginUserSession(user));
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
        <>
            <form
                onSubmit={handleSubmit}
                className="login-form"
            >
                <label className="login-form">Email:
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    >
                    </input>
                </label>
                <label className="login-form">Password:
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    >
                    </input>
                </label>
                <button className="login-form">Log In</button>
            </form>
            {response && (
                <>
                    <h4>{response.message}</h4>
                    {!!response.errors && (
                        <ul className="login-form">
                            {response.errors.map((message, i) => {
                                return (<li key={i}>{Object.keys(message)}: {Object.values(message)}</li>)
                            })}
                        </ul>
                    )}

                </>
            )}
        </>
    )
}
