import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { userSignUp } from "../../../store/session"
import "./UserSignUpPage.css"

export default function UserSignUpPage({ setShowModal }) {
    const dispatch = useDispatch()
    const history = useHistory()

    //check to see if a user is already logged in and redirect if so
    const user = useSelector(state => state.session.user)

    if (user) {
        history.push("/")
    }

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [response, setResponse] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            firstName,
            lastName,
            email,
            password
        }

        let res = await dispatch(userSignUp(user));
        if (!res.message) {
            history.push("/")
        } else {
            setResponse(res)
        }

    }

    useEffect(() => {
        setResponse("")
    },[firstName,lastName,email,password,passwordConfirmation])

    return (
        <div className="signup-page-main-page-body">
            <div className="signup-page-container">
                <form
                    onSubmit={handleSubmit}
                    className="signup-page"
                >
                    <div className="signup-page">
                        <h2 className="signup-page">Sign up</h2>
                    </div>
                    {response && (
                        <>
                            {response.message === "Validation error" && (
                                <>
                                    <ul className="signup-page">
                                        <h3>Sign up validation errors:</h3>
                                        {response.errors && (
                                            response.errors.map((message, i) => {
                                                return (<li key={i}>{Object.values(message)}</li>)
                                            })
                                        )}
                                    </ul>
                                </>
                            )}
                            {response.message === "User already exists" && (
                                <>
                                    <h4>Sign up email error:</h4>
                                    <ul className="signup-page">
                                        <li>{Object.values(response.errors.email)}</li>
                                    </ul>
                                </>
                            )}
                        </>
                    )}
                    <label className="signup-page">First Name:
                        <input
                            className="signup-page"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            required
                        >
                        </input>
                    </label>
                    <label className="signup-page">Last Name:
                        <input
                            className="signup-page"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            required
                        >
                        </input>
                    </label>
                    <label className="signup-page">Email:
                        <input
                            className="signup-page"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            required
                        >
                        </input>
                    </label>
                    <label className="signup-page">Password:
                        <input
                            className="signup-page"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            required
                        >
                        </input>
                    </label>
                    <label className="signup-page">Password Confirmation:
                        <input
                            className="signup-page"
                            type="password"
                            onChange={e => setPasswordConfirmation(e.target.value)}
                            value={passwordConfirmation}
                            required
                        >
                        </input>
                    </label>
                    <div>
                        {!(password === passwordConfirmation) && (
                            <text>Passwords do not match</text>
                        )}
                    </div>
                    <button disabled={password !== passwordConfirmation} className="signup-page">Sign Up</button>

                </form>
            </div>
        </div>
    )
}
