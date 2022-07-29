import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, NavLink } from "react-router-dom";
import * as sessionGroups from "../../../store/Groups"
import "./UserGroups.css"

export default function UserGroupsCards() {
    const dispatch = useDispatch();
    const history = useHistory()

    const [showOwnedGroups, setShowOwnedGroups] = useState(true)

    const groups = useSelector(state => Object.values(state.groups.userGroups));
    const user = useSelector(state => state.session.user)

    const joinedGroups = []
    const organizedGroups = []

    groups.forEach(group => {
        if (group.organizerId === user.id) {
            organizedGroups.push(group)
        } else {
            joinedGroups.push(group)
        }
    })

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionGroups.getCurrentUserGroupsThunk())
        setIsLoaded(true)
    }, [dispatch]);

    return isLoaded && (
        <>
            <div className="events-groups-toggle-main-container">
                <div className="all-events-groups-cards-toggle-container">
                    <h2 className={`all-events-groups-cards-toggle ${showOwnedGroups ? "active" : "inactive"}`} onClick={() => setShowOwnedGroups(true)}>Organized groups {`(${organizedGroups.length})`}</h2>
                    <h2 className={`all-events-groups-cards-toggle ${!showOwnedGroups ? "active" : "inactive"}`} onClick={() => setShowOwnedGroups(false)}>Joined groups {`(${joinedGroups.length})`}</h2>
                </div>
            </div>
            <div className="current-user-groups-main-body">
                {showOwnedGroups && (
                    <div className="current-user-groups organized-container">
                        <div className="groups-cards container">
                            {organizedGroups.length > 0 && (
                                organizedGroups.map((group, i) => {
                                    return (
                                        <div className="groups-card container" onClick={() => history.push(`/groups/${group.id}`)} key={i}>
                                            <div className="groups-card image-container">IMAGE GOES HERE</div>
                                            <div className="groups-card info-container">
                                                <h3 className="groups-card title">{group.name}</h3>
                                                <div className="groups-card location">{group.city.toUpperCase()}, {group.state}</div>
                                                <div className="groups-card about">{group.about}</div>
                                                <div className="groups-card members">{`${group.numMembers} ${group.numMembers === 1 ? 'member' : 'members'} • ${group.private ? `Private` : `Public`}`}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                            {organizedGroups.length === 0 && (
                                <>
                                    <h2>You currently have not organized any groups. Why not create one?</h2>
                                </>
                            )}
                        </div>
                    </div>
                )}
                {!showOwnedGroups && (
                    <div className="current-user-groups joined-container">
                        <div className="groups-cards container">
                            {isLoaded && joinedGroups.length > 0 && (
                                joinedGroups.map((group, i) => {
                                    return (
                                        <div className="groups-card container" onClick={() => history.push(`/groups/${group.id}`)} key={i}>
                                            <div className="groups-card image-container">IMAGE GOES HERE</div>
                                            <div className="groups-card info-container">
                                                <h3 className="groups-card title">{group.name}</h3>
                                                <div className="groups-card location">{group.city.toUpperCase()}, {group.state}</div>
                                                <div className="groups-card about">{group.about}</div>
                                                <div className="groups-card members">{`${group.numMembers} ${group.numMembers === 1 ? 'member' : 'members'} • ${group.private ? `Private` : `Public`}`}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                            {joinedGroups.length === 0 && (
                                <h2>You currently have not joined any groups.</h2>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
