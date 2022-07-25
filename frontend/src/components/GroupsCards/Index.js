import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import * as sessionGroups from "../../store/Groups"

import "./GroupsCards.css"

export default function GroupsCard() {
    const dispatch = useDispatch();
    const groups = useSelector(state => Object.values(state.groups.groupsList))
    console.log(groups)

    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        dispatch(sessionGroups.getAllGroupsThunk()).then(() => setIsLoaded(true))

    }, [dispatch])

    return (
        <div>
            <h2>GROUPS:</h2>
            <div className="groups-cards container">
            {isLoaded && (
                groups.map(group => {
                    return (
                        <div className="groups-cards cards">
                            <h4>{group.name}</h4>
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
