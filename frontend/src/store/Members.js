import { csrfFetch } from "./csrf";

const GET_ALL_MEMBERS = "members/GET_ALL_MEMBERS"
const GET_MEMBER_STATUS = "members/GET_MEMBER_STATUS"

export const getAllMembers = (members) => ({
    type: GET_ALL_MEMBERS,
    members
})

export const getMemberStatus = (currentGroupStatus) => ({
    type: GET_MEMBER_STATUS,
    currentGroupStatus
})

export const getCurrentmembershipThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/status`)

    const data = await response.json()
    if (response.ok) {
        await dispatch(getMemberStatus(data.currentGroupStatus))
        return data
    } else {
        return data;
    }
}

export const getAllMembersThunk = (groupId) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}/members`)

    const data = await response.json()
    if (response.ok) {
        await dispatch(getAllMembers(data))
        return data.Members
    } else {
        return data;
    }
}

export const requestMembershipThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`, {
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
    const response = await csrfFetch(`/api/groups/${groupId}/members`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedMember)
    })

    const data = await response.json()
    console.log(data)
    if (response.ok) {
        await dispatch(getAllMembersThunk(groupId))
        return data;
    } else {
        return data;
    }
}

export const deleteMembershipThunk = (groupId, deletedMember) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "memberId": deletedMember
        })
    })

    const data = await response.json()
    if (response.ok) {
        await dispatch(getAllMembersThunk(groupId))
        return data;
    } else {
        console.log(data)
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
            newState = { ...state ,currentGroupMembers: allMembers }
            return newState;
        case GET_MEMBER_STATUS:

            newState = { ...state ,currentGroupStatus: action.currentGroupStatus }
            return newState;
        default:
            return state;
    }
}

export default membersReducer;
