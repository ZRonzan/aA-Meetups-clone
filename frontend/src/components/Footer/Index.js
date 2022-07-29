import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import LoginForm from "../Session/LoginFormModal/LoginForm";
import UserSignUpPage from "../Session/SignUpFormModal/SignUpFormModal";
import { logoutUserSession } from "../../store/session";
import "./FooterStyle.css"


export default function Footer() {

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory()

    const [showFooterLogInModal, setShowFooterLoginModal] = useState(false)
    const [showFooterSignUpModal, setShowFooterSignUpModal] = useState(false)

    function logout(e) {
        e.preventDefault()
        dispatch(logoutUserSession())
    }

    return (
        <div className="footer-main-container">
            <div className="footer-create-a-group">
                <div className="footer-create-group-text" onClick={() => history.push("/forms/group-form")}>Create your own Street-Up group.</div>
            </div>
            <div className="footer-inner-container">
                <div className="footer-column">
                    <div className="footer-column-header">Your Account</div>
                    {!user && (
                        <>
                            <Link className="footer-link" onClick={() => setShowFooterLoginModal(true)}>Log In</Link>
                            {showFooterLogInModal && (
                                <Modal onClose={() => setShowFooterLoginModal(false)}>
                                    <LoginForm />
                                </Modal>
                            )}
                        </>
                    )}
                    {!!user && (
                        <Link className="footer-link" onClick={logout}>Log Out</Link>
                    )}
                    {!user && (
                        <>
                            <Link className="footer-link" onClick={() => setShowFooterSignUpModal(true)}>Sign Up</Link>
                            {showFooterSignUpModal && (
                                <Modal onClose={() => setShowFooterSignUpModal(false)}>
                                    <UserSignUpPage />
                                </Modal>
                            )}
                        </>
                    )}
                </div>
                <div className="footer-column">
                    <div className="footer-column-header">Discover</div>
                    <NavLink className="footer-link" to="/groups">Groups</NavLink>
                    <NavLink className="footer-link" to="/events">Events</NavLink>
                    <NavLink className="footer-link" to="/">Home</NavLink>
                </div>
                <div className="footer-column">
                    <div className="footer-column-header">About The Dev</div>
                    <a className="footer-link" href="https://www.linkedin.com/in/zeus-ronzan-b26313104/">LinkedIn</a>
                    <a className="footer-link" href="https://github.com/ZRonzan">GitHub</a>
                </div>
                <div className="footer-column">
                    <div className="footer-column-header">External resources:</div>
                    <a className="footer-link" href="https://www.vecteezy.com/vector-art/149623-graffiti-abstract-background">Graffiti SVG from Vecteezy</a>
                    <a className="footer-link" href="https://documenter.getpostman.com/view/1134062/T1LJjU52#4829d16f-0f4e-43ec-886e-68ebad1221d8">Cities data API from getpostman</a>
                    <a className="footer-link" href="https://editor.method.ac/">SVG creation and editing tool</a>
                    <a className="footer-link" href="https://fontawesome.com/icons?d=gallery&m=free">Font Awesome for icons</a>
                    <a className="footer-link" href="https://unsplash.com/">Unsplash for free images</a>
                </div>
            </div>
        </div>
    )
}
