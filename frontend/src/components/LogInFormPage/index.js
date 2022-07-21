import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { loginUserSession } from "../../store/session"

export default function LogInFormPage() {
    const dispatch = useDispatch()
    const history = useHistory()


    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }

        let res = await dispatch(loginUserSession(user));
        if(!res.message) {
            setResponse("")
            console.log("received response:", res)
        } else {
            console.log("setting response error")
            setResponse(res.message)
        }

        setPassword("");
        setEmail("");
        history.push("/")
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
            <div>{response}</div>
        )}
        </>
    )
}
