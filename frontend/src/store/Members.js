import { csrfFetch } from "./csrf";

const GET_ALL_MEMBERS = "members/GET_ALL_MEMBERS"

export const getAllMembers = (members) => ({
    type: GET_ALL_MEMBERS,
    members
})

export const getAllMembersThunk = (groupId) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}/members`)

    const data = await response.json()
    if (response.ok) {
        await dispatch(getAllMembers(data.Members))
        return data.Members
    } else {
        return data;
    }
}

export const requestMembershipThunk = (groupId) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}/members`,{
        method: "POST"
    })

    const data = await response.json()
    if (response.ok) {
        await dispatch(getAllMembersThunk(groupId))
        return data
    } else {
        return data;
    }
}

export const editMembershipThunk = (groupId, editedMember) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}/members`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedMember)
    })

    const data = await response.json()
    if (response.ok) {
        await dispatch(getAllMembersThunk(groupId))
        return data;
    } else {
        return data;
    }
}

export const deleteMembershipThunk = (groupId, deletedMember) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}/members`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deletedMember)
    })

    const data = await response.json()
    if (response.ok) {
        await dispatch(getAllMembersThunk(groupId))
        return data;
    } else {
        return data;
    }
}

const membersReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_MEMBERS:
            const allMembers = {}
            action.members.forEach(member => {
                allMembers[member.id] = member
            });
            newState = { ...state , members: allMembers}
            return newState;
        default:
            return state;
    }
}

export default membersReducer;
