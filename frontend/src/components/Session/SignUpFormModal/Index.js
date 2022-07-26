// frontend/src/components/UserSignUpFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UserSignUpPage from './SignUpFormModal';

function UserSignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}><i className="fa-solid fa-user-plus"> Sign Up</i></button>
      {showModal && (
        <>
        <Modal onClose={() => setShowModal(false)}>
          <UserSignUpPage />
        </Modal>
        </>
      )}
    </>
  );
}

export default UserSignUpFormModal;
