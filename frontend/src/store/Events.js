import { csrfFetch } from "./csrf"

const GET_ALL_EVENTS = "events/GET_ALL_EVENTS"
const GET_ALL_USER_EVENTS = "events/GET_ALL_USER_EVENTS"
const GET_EVENT_DETAILS = "events/GET_EVENT_DETAILS"

export const getAllEvents = (events) => ({
    type: GET_ALL_EVENTS,
    events
})

export const getAllUserEvents = (events) => ({
    type: GET_ALL_USER_EVENTS,
    events
})

export const getEventDetails = (event) => ({
    type: GET_EVENT_DETAILS,
    event
})

export const getAllEventsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/events")

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllEvents(data.Events))
        return data.Events;
    }
}

export const getAllEventsForGroupIdThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`)

    const data = await response.json();
    if (response.ok) {
        dispatch(getAllEvents(data.Events))
        return data.Events;
    } else {
        return data;
    }
}

export const getCurrentUserEventsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/session/events")

    if (response.ok) {
        const data = await response.json();

        dispatch(getAllUserEvents(data.Events))
        return data.Events;
    }
}

export const getEventByIdThunk = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`)

    const data = await response.json();
    if (response.ok) {

        dispatch(getEventDetails(data))
        return data;
    } else {
        return data;
    }
}

export const joinEventThunk = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/join`,{
        method: "POST"
    })

    if (response.ok) {
        const data = await response.json()
        return data;
    }
}

export const createAEventThunk = (newEvent) => async (dispatch) => {
    const response = await csrfFetch(`/api/events`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
    })

    const data = await response.json();
    if (response.ok) {
        const returnData = await dispatch(getEventByIdThunk(data.id))
        return returnData;
    } else {
        return data;
    }


}

export const editAEventThunk = (editedEvent) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${editedEvent.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedEvent)
    })

    const data = await response.json();
    if (response.ok) {
        const returnData = await dispatch(getEventByIdThunk(data.id))
        return returnData;
    } else {
        return data;
    }
}

export const deleteAEventThunk = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`,{
        method: "DELETE"
    })

    const data = await response.json();
    if (response.ok) {
        await dispatch(getAllEvents())
    }
    return data;
}

const initialState = {
    eventsList: {},
    eventDetails: {},
    userEvents: {}
}


const eventsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_USER_EVENTS:
            newState = {...state, userEvents: {...state.userEvents, ...action.events} }
            return newState;
        case GET_EVENT_DETAILS:
            newState = {...state, eventDetails: action.event}
            return newState;
        case GET_ALL_EVENTS:
            const eventsObj = {};
            action.events.forEach(event => {
                eventsObj[event.id] = event
            });
            newState = { ...state, eventsList: eventsObj }
            return newState;
        default:
            return state;
    }
}

export default eventsReducer;
