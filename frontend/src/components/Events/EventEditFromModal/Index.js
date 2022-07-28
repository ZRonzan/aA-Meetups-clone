// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EventForm from '../EventForm/Index';

function EventEditFormModal({event}) {
  const [showModalEvent, setShowModalEvent] = useState(false);

  return (
    <>
      <button onClick={() => setShowModalEvent(true)}>Edit this event</button>
      {showModalEvent && (
        <>
        <Modal onClose={() => setShowModalEvent(false)}>
          <EventForm event={event} setShowModalEvent={setShowModalEvent} />
        </Modal>
        </>
      )}
    </>
  );
}

export default EventEditFormModal;
