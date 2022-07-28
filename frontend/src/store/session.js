import { csrfFetch } from "./csrf"

const SET_SESSION_USER = "session/SET_SESSION_USER"
const REMOVE_SESSION_USER = "session/REMOVE_SESSION_USER"


export const setSessionUser = (user) => ({
    type: SET_SESSION_USER,
    user
})

export const removeSessionUser = () => ({
    type: REMOVE_SESSION_USER
})

export const loginUserSession = (credentials) => async (dispatch) => {

    const response = await csrfFetch("/api/session/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    if (response.ok) {
        const data = await response.json();

        dispatch(setSessionUser(data));
        return data;
    } else {
        const data = await response.json();
        return data;
    }
}

export const userSignUp = (newUser) => async (dispatch) => {

    const response = await csrfFetch("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })

    const data = await response.json();
    if (response.ok) {
        dispatch(setSessionUser(data));
    }
    return data;
}

export const logoutUserSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeSessionUser());
    return response;
  };

export const restoreUserSession = () => async (dispatch) => {
    const response = await csrfFetch("/api/session")
    if (response.ok) {
        const data = await response.json()
        dispatch(setSessionUser(data.user))
    }
}



const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_SESSION_USER:
            if (action.user && Object.keys(action.user).length > 0) {
                const { id, firstName, lastName, email, token } = action.user
                return {
                    user: {
                        id,
                        firstName,
                        lastName,
                        email
                    }
                }
            } else {
                return {
                    user: null
                }
            }
        case REMOVE_SESSION_USER:
            return {
                user: null
            }
        default:
            return state;
    }
}

export default sessionReducer;
