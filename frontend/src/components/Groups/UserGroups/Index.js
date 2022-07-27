import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link} from "react-router-dom";
import * as sessionGroups from "../../../store/Groups"

export default function UserGroupsCards() {
    const dispatch = useDispatch();

    const groups = useSelector(state => Object.values(state.groups.userGroups));
    const user = useSelector(state => state.session.user)

    const joinedGroups = []
    const organizedGroups = []

    groups.forEach(group => {
        if(group.organizerId === user.id) {
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

    return (
        <div>
            <h2>Organized Groups</h2>
            <div className="groups-cards container">
            {isLoaded && organizedGroups.length > 0 && (
                organizedGroups.map((group, i)=> {
                    return (
                        <div className="groups-cards cards" key={i}>
                            <h4><Link to={`/groups/${group.id}`}>{group.name}</Link></h4>
                            <div>{group.about}</div>
                            <div>Type: {group.private ? `Private` : `Public`}</div>
                            <div>State: {group.state}</div>
                            <div>City: {group.city}</div>
                            <div>Number of members: {group.numMembers}</div>
                        </div>
                    )
                })
            )}
            </div>
            <h2>Joined Groups</h2>
            <div className="groups-cards container">
            {isLoaded && joinedGroups.length > 0 && (
                joinedGroups.map((group, i)=> {
                    return (
                        <div className="groups-cards cards" key={i}>
                            <h4><Link to={`/groups/${group.id}`}>{group.name}</Link></h4>
                            <div>{group.about}</div>
                            <div>Type: {group.private ? `Private` : `Public`}</div>
                            <div>State: {group.state}</div>
                            <div>City: {group.city}</div>
                            <div>Number of members: {group.numMembers}</div>
                        </div>
                    )
                })
            )}
            </div>
        </div>
    )
}
