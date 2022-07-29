import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Route, Switch, useParams, Link, useHistory } from "react-router-dom";
import * as sessionGroups from "../../../store/Groups"
import EventsCard from "../../Events/EventsCards/Index";
import GroupDeleteFormModal from "../GroupDeleteFormModal/Index";
import GroupEditFormModal from "../GroupEditFormModal/Index";
import "./GroupDetails.css"

export default function GroupDetails() {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const group = useSelector(state => state.groups.groupDetails);
    const user = useSelector(state => state.session.user)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(sessionGroups.getGroupByIdThunk(Number(groupId))).then(() => setIsLoaded(true))
    }, [dispatch])

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
                            </div>
                            {/* <button> Join This Group </button> */}
                            {user && group.organizerId === user.id && (
                                <div className="group-details-page-edit-delete-container">
                                    <GroupEditFormModal group={group} />
                                    <GroupDeleteFormModal group={group} />
                                </div>
                            )}
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
