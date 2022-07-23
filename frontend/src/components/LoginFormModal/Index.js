// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}><i className="fa-solid fa-arrow-right-to-bracket"> Log In</i></button>
      {showModal && (
        <>
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
        </>
      )}
    </>
  );
}

export default LoginFormModal;
