import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom";
import * as sessionGroups from "../../../store/Groups"

import "./GroupsCards.css"

export default function GroupsCard() {
    const dispatch = useDispatch();
    const history = useHistory()

    let groups = useSelector(state => Object.values(state.groups.groupsList));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionGroups.getAllGroupsThunk())
        setIsLoaded(true)
    }, [dispatch]);

    return (
        <div className="groups-cards-container">

                {isLoaded && (
                    groups.map((group, i) => {
                        console.log(group)
                        return (
                            <div className="groups-card container" onClick={() => history.push(`/groups/${group.id}`)} key={i}>
                                <div className="groups-card image-container">
                                    <img className="groups-card image" src={group.previewImage[0].imageUrl}></img>
                                </div>
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
        </div>
    )
}
