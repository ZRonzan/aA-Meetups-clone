import { csrfFetch } from "./csrf"

const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS"
const GET_GROUP_DETAILS = "groups/GET_GROUP_DETAILS"

export const getAllGroups = (groups) => ({
    type: GET_ALL_GROUPS,
    groups
})

export const getGroupDetails = (group) => ({
    type: GET_GROUP_DETAILS,
    group
})

export const getAllGroupsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/groups")

    if (response.ok) {
        const data = await response.json();

        dispatch(getAllGroups(data.groups))
        return data.groups;
    }
}

export const getCurrentUserGroupsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/session/groups")

    if (response.ok) {
        const data = await response.json();

        dispatch(getAllGroups(data.groups))
        return data.groups;
    }
}

export const getGroupByIdThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`)

    if (response.ok) {
        const data = await response.json();

        dispatch(getGroupDetails(data))
        return data;
    }
}

export const createAGroupThunk = (newGroup) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGroup)
    })

    if (response.ok) {
        const data = await response.json();

        dispatch(getAllGroups())
        return data;
    }
}


const groupsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_GROUP_DETAILS:
            newState = {...state, groupDetails: action.group}
            return newState;
        case GET_ALL_GROUPS:
            const groupsObj = {};
            action.groups.forEach(group => {
                groupsObj[group.id] = group
            });
            newState = { ...state, groups: groupsObj }
            return newState;
        default:
            return state;
    }
}

export default groupsReducer;
