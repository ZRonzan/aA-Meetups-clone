import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Route, Switch, useParams, Link, Redirect, useHistory } from "react-router-dom";
import * as sessionEvents from "../../../store/Events"
import * as sessionGroups from "../../../store/Groups"
import EventsCard from "../../Events/EventsCards/Index";

export default function EventDetails() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [editFormVisibility, setEditFormVisibility] = useState(false)

    const event = useSelector(state => state.events.eventDetails);
    const group = useSelector(state => state.groups.groupDetails)
    const user = useSelector(state => state.session.user)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(sessionEvents.getEventByIdThunk(eventId))
        .then((res) => dispatch(sessionGroups.getGroupByIdThunk(res.Group.id)))
        .then(() => setIsLoaded(true))

    }, [dispatch])

    const handleDeletion = async (e) => {
        e.preventDefault();
        const response = await dispatch();

        if(response.statusCode === 200) {
            history.push("/");
        } else {
            alert("An error occurred. the Event could not be deleted")
        }

    }



    return (
        <>
        <div>
            <h1>{event.name}</h1>
        </div>
        </>
    )
}
