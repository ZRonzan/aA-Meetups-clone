import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Route, Switch, useParams, Link, useHistory } from "react-router-dom";
import * as sessionGroups from "../../../store/Groups"
import * as sessionMembers from "../../../store/Members"
import EventsCard from "../../Events/EventsCards/Index";
import GroupDeleteFormModal from "../GroupDeleteFormModal/Index";
import GroupEditFormModal from "../GroupEditFormModal/Index";
import GroupMembers from "../GroupMembers";
import "./GroupDetails.css"

export default function GroupDetails() {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const group = useSelector(state => state.groups.groupDetails);
    const user = useSelector(state => state.session.user)
    const members = useSelector(state => state.members.currentGroupMembers)
    const userStatus = useSelector(state => state.members.currentGroupStatus)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(sessionGroups.getGroupByIdThunk(Number(groupId)))
            .then(() => {
                if (user) {
                    console.log("USER EXISTS")
                    dispatch(sessionMembers.getCurrentmembershipThunk(groupId))
                }
            })
            .then(() => dispatch(sessionMembers.getAllMembersThunk(Number(groupId))))
            .then(() => setIsLoaded(true))
    }, [dispatch, user])

    const handleJoin = async () => {
        await dispatch(sessionMembers.requestMembershipThunk(groupId))
        await dispatch(sessionMembers.getCurrentmembershipThunk(groupId))
    }

    const handleLeave = async (deletedMember) => {
        await dispatch(sessionMembers.deleteMembershipThunk(groupId, deletedMember))
        await dispatch(sessionMembers.getCurrentmembershipThunk(groupId))
    }

    return (
        <>
            {isLoaded && Object.values(group).length > 0 && (
                <div className="group-details-page-main-body">
                    <div className="group-details-page-top">
                        <div className="group-details-page-top-container">
                            {group.images.length > 0 && (
                                <img className="group-details-page-main-image-container" src={group.images[0].imageUrl}></img>
                            )}
                            <div className="group-details-page-top-details">
                                <h2 className="group-details-page">{group.name}</h2>
                                <div className="group-details-page"><i className="fa-solid fa-location-dot"></i> {group.city}, {group.state}</div>
                                <div className="group-details-page"><i className="fa-solid fa-people-group"></i> {group.numMembers !== 1 ? `${group.numMembers} members` : `${group.numMembers} member`}, {group.private ? `Private group` : `Public group`}</div>
                                <div className="group-details-page"><i className="fa-solid fa-person"></i> Organized by <span style={{ fontWeight: "bold" }}>{group.Organizer.firstName} {group.Organizer.lastName}</span></div>

                            </div>
                        </div>
                    </div>
                    <div className="group-details-page-nav-main-container">
                        <nav className="group-details-page-nav-bar-container">
                            <div className="group-details-page-nav-bar-container-about-events">
                                <NavLink className="group-details-page-navlink" to={`/groups/${groupId}`}>
                                    About
                                </NavLink>
                                <NavLink className="group-details-page-navlink" to={`/groups/${groupId}/events`}>
                                    Events
                                </NavLink>
                                <NavLink className="group-details-page-navlink" to={`/groups/${groupId}/members`}>
                                    Members
                                </NavLink>
                            </div>
                            <div className="group-details-page-edit-delete-container">
                                {user && group.organizerId !== user.id && (
                                    <>
                                        { (!group.private || (group.private && (members[user.id] || userStatus === "Pending" ))) && (<button
                                            className={`join-leave-button ${!members[user.id] && userStatus !== "Pending" ? 'join' : 'leave'}`}
                                            onClick={() => {
                                                !members[user.id] && userStatus !== "Pending" ? handleJoin() : handleLeave(user.id)
                                            }}
                                        >
                                            {`${!members[user.id] && userStatus !== "Pending" ? 'Join' : 'Leave'} This Group`}
                                        </button>)}
                                        <div
                                            className={`group-membership-status ${(userStatus === "Pending" || userStatus === "Member" || userStatus === "Co-Host") ? "open" : "closed"}`}
                                        >
                                            {`Membership status: ${userStatus}`}
                                        </div>
                                    </>
                                )}
                                {user && group.organizerId === user.id && (
                                    <>
                                        <GroupEditFormModal group={group} />
                                        <GroupDeleteFormModal group={group} />
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                    <div className="group-details-page-navlink-details-events">
                        <div className="group-details-page-navlink-details-events-container">
                            <Switch>
                                <Route exact path="/groups/:groupId">
                                    <div>
                                        <h3>What we're about</h3>
                                        <p>{group.about}</p>
                                    </div>
                                </Route>
                                <Route path="/groups/:groupId/events">
                                    <div>
                                        <button
                                            className="group-details-page-create-event-button"
                                            style={{ visibility: `${user && group.organizerId === user.id ? "visible" : "hidden"}` }}
                                            onClick={() => history.push(`/forms/event-form/${groupId}`)}
                                        >
                                            Create an event
                                        </button>
                                    </div>
                                    <EventsCard groupId={groupId} />
                                </Route>
                                <Route path="/groups/:groupId/members">
                                    <GroupMembers />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>

            )
            }
            {
                isLoaded && Object.values(group).length === 0 && (
                    <div>
                        <h2>{`Sorry, the page you’re looking for doesn’t exist.`}</h2>
                        <div>{`The link you followed might be broken, or the page may have been deleted.`}</div>
                        <Link to="/">Go Home</Link>
                    </div>
                )
            }
        </>
    )
}
