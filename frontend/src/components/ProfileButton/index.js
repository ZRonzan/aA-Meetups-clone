import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserSession } from '../../store/session';


function ProfileButton() {
  const dispatch = useDispatch();


  function handleClick(e) {
    e.preventDefault()
    dispatch(logoutUserSession())
  }

  return (
    <>
      <button onClick={handleClick}>
        <i class="fa-solid fa-arrow-right-from-bracket"> Log out </i>
      </button>
    </>
  );
}

export default ProfileButton;
