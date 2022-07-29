// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="navigation-log-in-and-sign-up-buttons" onClick={() => setShowModal(true)}>Log In</div>
      {showModal && (
        <>
        <Modal onClose={() => setShowModal(false)} formType="login-signup">
          <LoginForm setShowModal={setShowModal}/>
        </Modal>
        </>
      )}
    </>
  );
}

export default LoginFormModal;
