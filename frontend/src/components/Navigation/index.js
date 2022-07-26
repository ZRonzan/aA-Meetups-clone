import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';
import LoginFormModal from '../LoginFormModal/Index';
import UserSignUpFormModal from '../SignUpFormModal/Index';
// import './Navigation.css';

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
    <ul>
      <li>
        <NavLink exact to="/">
          <button>
            <i className="fa-solid fa-house-chimney"> home</i>
          </button>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
      <li
        style={{visibility: `${sessionUser? "visible": "hidden"}`}}
      >
        <NavLink to="/forms/groupForm">Start a new group</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
