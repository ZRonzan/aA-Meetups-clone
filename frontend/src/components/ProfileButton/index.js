import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserSession } from '../../store/session';


function ProfileButton({user}) {
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showMenu) return;
    function closeMenu() {
      setShowMenu(false)
    }
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu])

  function openMenu() {
    if (!showMenu) {
      setShowMenu(true)
    }
  }

  function logout(e) {
    e.preventDefault()
    dispatch(logoutUserSession())
  }

  return (
    <>
      <div>
        <button onClick={openMenu}><i className="fa-solid fa-user"> profile</i></button>
      </div>
      {showMenu && (
        <>
          <ul>
            <li>User: {user.firstName} {user.lastName}</li>
            <li>Email: {user.email}</li>
            <li>
              <button onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket"> Log out </i>
              </button>
            </li>
          </ul>
        </>
      )}
    </>
  );
}

export default ProfileButton;
