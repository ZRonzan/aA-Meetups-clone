import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import ProfileButton from '../Session/ProfileButton';
import LoginFormModal from '../Session/LoginFormModal/Index';
import UserSignUpFormModal from '../Session/SignUpFormModal/Index';
import { loginUserSession } from '../../store/session';
import './Navigation.css';
import streetUpLogo from "../../static-files/Street-Up-Logo.svg"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const url = useLocation().pathname

  const logInDemoUser = () => {
    const demoUser = {
      email: "john.smith@gmail.com",
      password: "secret password"
    }

    dispatch(loginUserSession(demoUser))
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className="demo-user-login-button" onClick={logInDemoUser}>Demo User</div>
        <LoginFormModal />
        <UserSignUpFormModal />
      </>
    );
  }

  return (
    <div className="navigation-main-container">
      <div className="navigation-left">
        <div className="navigation-home-logo">
          <NavLink className="navigation-navlink" exact to="/">
            <img src={streetUpLogo} alt="Street-Up logo" style={{height: "4.2rem"}}></img>
          </NavLink>
        </div>
      </div>
      <div className="navigation-right">
        <div className="navigation-start-a-new-group"style={{ visibility: `${(sessionUser && url !== "/forms/group-form") ? "visible" : "hidden"}` }}>
          <NavLink className="navigation-navlink new-group" to="/forms/group-form">Start a new group</NavLink>
        </div>
        <div className={`navigation-right-sessionlinks-container ${sessionUser? "logged-in" : "logged-out"}`}>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
