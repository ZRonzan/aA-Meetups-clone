// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionEvents from "../../../store/Events"

function EventDeleteFormModal({ event, groupId }) {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false)

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(sessionEvents.deleteAEventThunk(event.id))
    .then((res) => {
      console.log(res)


      window.alert("SUCCESSFULLY DELETED")
      history.push(`/groups/${groupId}/events`)
    })
  }

  return (
    <>
      <button onClick={() => setShowModalDelete(true)}>Delete this event</button>
      {showModalDelete && (
        <>
          <Modal onClose={() => setShowModalDelete(false)}>
            <div><i className="fa-solid fa-xmark" onClick={() => setShowModalDelete(false)}></i></div>
            <h3>Are you sure?</h3>
            <p>This action is irreversible. Please confirm this decision below:</p>
            <div>
              <form
                onSubmit={handleDelete}
                className="delete-form-confirmation"
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
                    disabled={!isDisabled}
                  >
                    Delete this event
                  </button>
              </form>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default EventDeleteFormModal;
