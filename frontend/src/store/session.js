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
    }
}

// export const logOutUserSession = () => async (dispatch) => {
//     const response = await fetch("/api/session/login", {
//         method: "POST"
//     })

//     if(response.ok) {
//         const data = response.json()

//         dispatch(setSessionUser(data))
//     }
// }



const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_SESSION_USER:
            if (!action.user) {
                return {
                    ...state,
                    user: null
                }
            } else {
                const { id, firstName, lastName, email, token } = action.user
                return {
                    ...state,
                    user: {
                        id,
                        firstName,
                        lastName,
                        email,
                        token
                    }
                }
            }
        case REMOVE_SESSION_USER:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export default sessionReducer;
