import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Route, Switch, useParams, Link, useHistory } from "react-router-dom";
import * as sessionGroups from "../../../store/Groups"
import EventsCard from "../../Events/EventsCards/Index";
import GroupDeleteFormModal from "../GroupDeleteFormModal/Index";
import GroupEditFormModal from "../GroupEditFormModal/Index";

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
                <>
                    <div>
                        <div>
                            <h2>{group.name}</h2>
                            <div><i className="fa-solid fa-location-dot"></i> {group.city}, {group.state}</div>
                            <div><i className="fa-solid fa-people-group"></i> {group.numMembers !== 1 ? `${group.numMembers} members` : `${group.numMembers} member`}, {group.private ? `Private group` : `Public group`}</div>
                            <div><i className="fa-solid fa-person"></i> Organized by {group.Organizer.firstName} {group.Organizer.lastName}</div>
                        </div>
                    </div>
                    <div>
                        <nav>
                            <NavLink to={`/groups/${groupId}`}>
                                About
                            </NavLink>
                            <NavLink to={`/groups/${groupId}/events`}>
                                Events
                            </NavLink>
                            {/* <button> Join This Group </button> */}
                            {user && group.organizerId === user.id && (
                                <>
                                    <GroupEditFormModal group={group} />
                                    <GroupDeleteFormModal group={group} />
                                </>
                            )}
                        </nav>
                    </div>
                    <Switch>
                        <Route exact path="/groups/:groupId">
                            <div>
                                <h3>What we're about</h3>
                                <p>{group.about}</p>
                            </div>
                            <div>
                                RENDER EVENTS LIST
                            </div>
                            <div>members of this group</div>
                        </Route>
                        <Route path="/groups/:groupId/events">
                            <button
                                style={{ visibility: `${user && group.organizerId === user.id ? "visible" : "hidden"}` }}
                                onClick={() => history.push(`/forms/event-form/${groupId}`)}
                            >
                                Create an event
                            </button>
                            <EventsCard groupId={groupId} />
                        </Route>
                    </Switch>
                </>

            )}
            {isLoaded && Object.values(group).length === 0 && (
                <div>
                    <h2>{`Sorry, the page you’re looking for doesn’t exist.`}</h2>
                    <div>{`The link you followed might be broken, or the page may have been deleted.`}</div>
                    <Link to="/">Go Home</Link>
                </div>
            )}
        </>
    )
}
