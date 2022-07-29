// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionEvents from "../../../store/Events"
import "./EventDelete.css"

function EventDeleteFormModal({ event, groupId }) {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false)

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(sessionEvents.deleteAEventThunk(event.id))
      .then((res) => {
        window.alert("SUCCESSFULLY DELETED")
        history.push(`/groups/${groupId}/events`)
      })
  }

  return (
    <>
      <button onClick={() => setShowModalDelete(true)}>Delete this event</button>
      {showModalDelete && (
        <>
          <Modal onClose={() => setShowModalDelete(false)} formType="delete-event">
            <div className="group-event-delete-form-cross"><i className="fa-solid fa-xmark" onClick={() => setShowModalDelete(false)}></i></div>
            <div className="group-event-delete-form">
              <h3 className="group-event-delete-form">Are you sure?</h3>
              <p className="group-event-delete-form">This action is irreversible. Please confirm this decision below:</p>
              <div className="group-event-delete-form">
                <form
                  className="group-event-delete-form"
                  onSubmit={handleDelete}
                >
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => setIsDisabled(!isDisabled)}
                      checked={isDisabled}
                    >
                    </input>
                    I confirm that I would like to delete this event
                  </label>
                  <button
                    className={`group-event-delete-form ${!isDisabled? "disabled":"enabled"}`}
                    disabled={!isDisabled}
                  >
                    Delete this event
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default EventDeleteFormModal;
