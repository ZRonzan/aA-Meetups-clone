import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link} from "react-router-dom";
import * as sessionGroups from "../../../store/Groups"

import "./GroupsCards.css"

export default function GroupsCard() {
    const dispatch = useDispatch();

    let groups = useSelector(state => Object.values(state.groups.groupsList));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionGroups.getAllGroupsThunk())
        setIsLoaded(true)
    }, [dispatch]);

    return (
        <div>
            <h2>GROUPS:</h2>
            <div className="groups-cards container">
            {isLoaded && (
                groups.map((group, i) => {
                    return (
                        <div className="groups-cards cards">
                            <h4><Link to={`/groups/${group.id}`} key={i}>{group.name}</Link></h4>
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
