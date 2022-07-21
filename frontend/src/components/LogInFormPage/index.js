import { useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import { loginUserSession } from "../../store/session"

export default function LogInFormPage() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()


    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        let res = await dispatch(loginUserSession(user))
        if(res) {
            console.log("received response:", res)
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
        {user && (<div>
            <h3>Current user:</h3>
            <div>First name: {user.firstName}</div>
            <div>Last name: {user.lastName}</div>
            <div>email: {user.email}</div>
        </div>)}
        </>
    )
}
