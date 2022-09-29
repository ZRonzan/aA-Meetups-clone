import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom";
import * as sessionGroups from "../../../store/Groups";
import * as sessionMembers from "../../../store/Members";
import * as sessionEvents from "../../../store/Events"

import "./GroupMembers.css"

export default function GroupMembers() {
    const dispatch = useDispatch();
    const history = useHistory()

    const { groupId } = useParams()

    const groups = useSelector(state => Object.values(state.groups.groupsList));
    const group = useSelector(state => state.groups.groupDetails);
    const user = useSelector(state => state.session.user)
    const members = useSelector(state => state.members.currentGroupMembers)
    const userStatus = useSelector(state => state.members.currentGroupStatus)

    // let sortedMembers = Object.values(members).sort((a, b) => a.lastName - b.lastName)

    const [isLoaded, setIsLoaded] = useState(false);

    const colors = ["#AA9AF9", "#55648E", "#2DE410", "#47843F", "#ABAA5E", "#607357", "#F2F1D8", "#830D5B", "#CD9186", "#40CCC5", "#4A0A4F", "#3D590B", "#95097F", "#B4EF64", "#42E9EE", "#AA1888", "#781F5D", "#35C713", "#4A5E41", "#16ACC5", "#4F1295", "#1D93FA", "#1EFB58", "#B76CBA", "#903536", "#C78706", "#10994C", "#BE1CBD", "#2ADB0F", "#3B7DD2", "#797CC5", "#D60F96", "#CB5984", "#F5412D", "#921220", "#95408D", "#E98F23", "#A3D086", "#6130CA", "#13F482", "#2AC6C0", "#EDE7F7", "#5D7346", "#EA06DB", "#3B8717", "#5AC5F6", "#C63B2B", "#5B9E27", "#8BC040", "#DA0DC4", "#50B613", "#9C427A", "#F69299", "#DA0EF3", "#655529", "#A5A7C3", "#B3F744", "#39E579", "#7AF391", "#35EA34", "#449B83", "#B64B72", "#39350E", "#961FAB", "#E0B2CA", "#FCCF70", "#A78856", "#C2B3B8", "#C4582A", "#3A211A", "#1ACBCF", "#675815", "#CC56BE", "#83840B", "#F234D6", "#2F2A06", "#E43248", "#1343CA", "#434FED", "#C872C6", "#75B64E", "#786CB3", "#8C7B97", "#026CD5", "#A2A1B5", "#012A55", "#E3C45C", "#F4BD7B", "#1CA299", "#86BFA4", "#3036EC", "#82D959", "#5E947F", "#DABF0E", "#EAE1E0", "#D85A05", "#7913B2", "#5F8FD8", "#7B3941", "#CFA79F"]

    useEffect(() => {
        console.log(user)
        if(user) dispatch(sessionMembers.getCurrentmembershipThunk(groupId))
        setIsLoaded(true)
    }, [dispatch]);

    const handleStatusChange = async (newStatus, memberId) => {
        const editedMember = {
            "memberId": memberId,
            "status": newStatus
        }
        await dispatch(sessionMembers.editMembershipThunk(groupId, editedMember))
    }

    const handleMemberDelete = async (memberId) => {
        await dispatch(sessionMembers.deleteMembershipThunk(groupId, memberId))
    }

    return (
        <div className="members-cards-container">
            {isLoaded && Object.values(members).length > 0 ? (
                Object.values(members).sort((a, b) => a.lastName - b.lastName)
                    .map((member, i) => {
                        const memberStatus = member.Membership[0].status
                        let showStatus = true
                        return user? member.id !== user.id ? (
                            <div className="member-card" key={i}>
                                <div
                                    className="member-status-profile-container"
                                >
                                    <div
                                        style={{ "backgroundColor": `${colors[i % 100]}` }}
                                        className="member-attendee-profile-circle"
                                    >
                                        {`${member.firstName[0]}${member.lastName[0]}`}
                                    </div>
                                    <div
                                        className="member-attendee-name-status-container"
                                    >
                                        <div
                                            className="member-attendee-name"
                                        >
                                            {`${member.firstName} ${member.lastName}`}
                                        </div>
                                        <div
                                            className="member-attendee-status"
                                        >
                                            {`Status: ${memberStatus}`}
                                        </div>
                                    </div>

                                </div>
                                {(userStatus === "Organizer" || userStatus === "Co-Host") && (
                                    <div
                                        className="member-status-buttons-container"
                                    >
                                        {memberStatus === "Pending" && (
                                            <button
                                                onClick={() =>{
                                                    handleStatusChange("Member", member.id)
                                                }}
                                                className="member-status-buttons"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {userStatus === "Organizer" && memberStatus !== "Co-Host" && (
                                            <button
                                                onClick={() => {
                                                    handleStatusChange("Co-Host", member.id)
                                                }}
                                                className="member-status-buttons"
                                            >
                                                Make Co-Host
                                            </button>
                                        )}
                                        {userStatus === "Organizer" && memberStatus === "Co-Host" && (
                                            <button
                                                onClick={() => {
                                                    handleStatusChange("Member", member.id)
                                                }}
                                                className="member-status-buttons"
                                            >
                                                Revoke Co-Host
                                            </button>
                                        )}
                                        {userStatus === "Organizer" && (
                                            <button
                                                onClick={() => handleMemberDelete(member.id)}
                                                className="member-status-buttons"
                                            >
                                                Remove from group
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            null
                        ) : (
                            <div className="member-card" key={i}>
                                <div
                                    className="member-status-profile-container"
                                >
                                    <div
                                        style={{ "backgroundColor": `${colors[i % 100]}` }}
                                        className="member-attendee-profile-circle"
                                    >
                                        {`${member.firstName[0]}${member.lastName[0]}`}
                                    </div>
                                    <div
                                        className="member-attendee-name-status-container"
                                    >
                                        <div
                                            className="member-attendee-name"
                                        >
                                            {`${member.firstName} ${member.lastName}`}
                                        </div>
                                        <div
                                            className="member-attendee-status"
                                        >
                                            {`Status: ${memberStatus}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            ) : (
                <div>
                    <h2>
                        No Members
                    </h2>
                    <div>
                        Looks like there are currently no members in this group.
                    </div>
                </div>
            )}
        </div>
    )
}
