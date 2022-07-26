// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import GroupEditForm from "./GroupEditForm"

function GroupEditFormModal({group}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit this group</button>
      {showModal && (
        <>
        <Modal onClose={() => setShowModal(false)}>
          <GroupEditForm group={group} setShowModal={setShowModal} />
        </Modal>
        </>
      )}
    </>
  );
}

export default GroupEditFormModal;
