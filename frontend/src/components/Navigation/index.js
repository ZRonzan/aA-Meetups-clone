import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Session/ProfileButton';
import LoginFormModal from '../Session/LoginFormModal/Index';
import UserSignUpFormModal from '../Session/SignUpFormModal/Index';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <UserSignUpFormModal />
      </>
    );
  }

  return (
    <div className="navigation-main-container">
      <div className="navigation-left">
        <div className="navigation-home-logo">
          <NavLink exact to="/">
            <i className="fa-solid fa-house-chimney"></i>
          </NavLink>
        </div>
        <h2>Street-Up</h2>
      </div>
      <div className="navigation-right">
        <div style={{ visibility: `${sessionUser ? "visible" : "hidden"}` }}>
          <NavLink to="/forms/group-form">Start a new group</NavLink>
        </div>
        <div className="navigation-right-sessionlinks">
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
