import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserSession } from '../../../store/session';


function ProfileButton({ user }) {
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
        <i onClick={openMenu} className="fa-solid fa-user"></i>
      </div>
      {showMenu && (
        <>
          <div>
            <div>User: {user.firstName} {user.lastName}</div>
            <div>Email: {user.email}</div>
            <div>
              <button onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileButton;
