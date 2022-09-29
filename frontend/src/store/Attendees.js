import { csrfFetch } from "./csrf";

const GET_ALL_ATTENDEES = "attendees/GET_ALL_ATTENDEES"
const GET_ATTENDEE_STATUS = "attendees/GET_ATTENDEE_STATUS"

export const getAllAttendees = (attendees) => ({
    type: GET_ALL_ATTENDEES,
    attendees
})

export const getAttendeeStatus = (currentEventStatus) => ({
    type: GET_ATTENDEE_STATUS,
    currentEventStatus
})

export const getCurrentAttendanceThunk = (eventId) => async (dispatch) => {
    console.log("IN THUNK", eventId)
    const response = await csrfFetch(`/api/events/${eventId}/status`)

    const data = await response.json()
    console.log(data, "CURRENT USER STATUS")
    if (response.ok) {
        await dispatch(getAttendeeStatus(data.currentEventStatus))
        return data
    } else {
        return data;
    }
}

export const getAllAttendeesThunk = (eventId) => async (dispatch) => {
    const response = await fetch(`/api/events/${eventId}/attendees`)

    const data = await response.json()
    console.log(data)
    if (response.ok) {
        await dispatch(getAllAttendees(data.Attendees))
        return data.Attendees
    } else {
        return data;
    }
}

export const requestAttendanceThunk = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/join`, {
        method: "POST"
    })

    const data = await response.json()
    if (response.ok) {
        await dispatch(getAllAttendeesThunk(eventId))
        return data
    } else {
        return data;
    }
}

export const editAttendanceThunk = (eventId, editedMember) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attendees`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedMember)
    })

    const data = await response.json()
    console.log(data)
    if (response.ok) {
        await dispatch(getAllAttendeesThunk(eventId))
        return data;
    } else {
        return data;
    }
}

export const deleteAttendanceThunk = (eventId, deletedMember) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attendees`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "userId": deletedMember
        })
    })

    const data = await response.json()
    if (response.ok) {
        await dispatch(getAllAttendeesThunk(eventId))
        return data;
    } else {
        console.log(data)
        return data;
    }
}

const attendeesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_ATTENDEES:
            const allAttendees = {}
            action.attendees.forEach(attendee => {
                allAttendees[attendee.id] = attendee
            });
            newState = { ...state ,currentEventAttendees: allAttendees }
            return newState;
        case GET_ATTENDEE_STATUS:

            newState = { ...state ,currentEventStatus: action.currentEventStatus }
            return newState;
        default:
            return state;
    }
}

export default attendeesReducer;
