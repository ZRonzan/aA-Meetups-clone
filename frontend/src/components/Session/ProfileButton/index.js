import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserSession } from '../../../store/session';


function ProfileButton({ user }) {
  const history = useHistory()
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
    history.push("/")
  }

  return (
    <>
      <div className="navigation-right-profile" onClick={openMenu}>
        <div className="navigation-right-profile-circle">
          {user.firstName[0]}
        </div>
        <div className="navigation-right-profile-chevron">
          {!showMenu && (
            <i className="fa-solid fa-chevron-down"></i>
          )}
          {showMenu && (
            <i className="fa-solid fa-chevron-up"></i>
          )}
        </div>
      </div>
      {showMenu && (
        <>
          <div className="navigation-right-sessionlinks">
            <div className="navigation-right-sessionlinks-current-user">{user.firstName} {user.lastName}</div>
              <NavLink className="navigation-right-sessionlinks-link your-groups" to="/session/groups">Your groups</NavLink>
            <div className="navigation-right-sessionlinks-link log-out" onClick={logout}>
              Log out
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileButton;
