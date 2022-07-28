// frontend/src/components/UserSignUpFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UserSignUpPage from './SignUpFormModal';

function UserSignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="navigation-log-in-and-sign-up-buttons" onClick={() => setShowModal(true)}>Sign Up</div>
      {showModal && (
        <>
        <Modal onClose={() => setShowModal(false)}>
          <UserSignUpPage setShowModal={setShowModal}/>
        </Modal>
        </>
      )}
    </>
  );
}

export default UserSignUpFormModal;
