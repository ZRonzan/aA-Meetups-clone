// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EventFormModal from './EventFormModal';

function EventEditFormModal({event}) {
  const [showModalEvent, setShowModalEvent] = useState(false);

  return (
    <>
      <button onClick={() => setShowModalEvent(true)}>Edit this event</button>
      {showModalEvent && (
        <>
        <Modal onClose={() => setShowModalEvent(false)} formType="edit-event">
          <EventFormModal event={event} setShowModalEvent={setShowModalEvent} />
        </Modal>
        </>
      )}
    </>
  );
}

export default EventEditFormModal;
