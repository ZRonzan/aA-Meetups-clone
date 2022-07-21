import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { loginUserSession } from "../../store/session"

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
            //console.log("received response:", res)
            history.push("/")
            setPassword("");
            setEmail("");
        } else {
            console.log(res)
            setResponse(res)
        }

    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                <label>Email:
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    >
                    </input>
                </label>
                <label>Password:
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    >
                    </input>
                </label>
                <button>Log In</button>
            </form>
            {response && (
                <>
                    <h4>{response.message}</h4>
                    <ul>
                        {response.errors && (
                            response.errors.map((message, i) => {
                                return (<li key={i}>{Object.keys(message)}: {Object.values(message)}</li>)
                            })
                        )}
                    </ul>
                </>
            )}
        </>
    )
}
