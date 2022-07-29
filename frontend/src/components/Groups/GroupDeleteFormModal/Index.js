// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionGroups from "../../../store/Groups"

function GroupDeleteFormModal({ group, groupId }) {
  const [showGroupModalDelete, setShowGroupModalDelete] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false)

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(sessionGroups.deleteAGroupThunk(group.id))
      .then((res) => {
        window.alert(`${res.message}`)
        history.push(`/`)
      })
  }

  return (
    <>
      <button onClick={() => setShowGroupModalDelete(true)}>Delete this group</button>
      {showGroupModalDelete && (
        <>
          <Modal onClose={() => setShowGroupModalDelete(false)} formType="delete-event">
            <div className="group-event-delete-form-cross"><i className="fa-solid fa-xmark" onClick={() => setShowGroupModalDelete(false)}></i></div>
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
                      className="group-event-delete-form"
                      type="checkbox"
                      onChange={() => setIsDisabled(!isDisabled)}
                      checked={isDisabled}
                    >
                    </input>
                    I confirm that I would like to delete this group
                  </label>
                  <button
                    className={`group-event-delete-form ${!isDisabled ? "disabled" : "enabled"}`}
                    disabled={!isDisabled}
                  >
                    Delete this group
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

export default GroupDeleteFormModal;
