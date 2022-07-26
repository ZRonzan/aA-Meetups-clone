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

    console.log(group)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(sessionEvents.getEventByIdThunk(eventId))
            .then((res) => dispatch(sessionGroups.getGroupByIdThunk(res.Group.id)))
            .then(() => setIsLoaded(true))

    }, [dispatch])

    const handleDeletion = async (e) => {
        e.preventDefault();
        const response = await dispatch();

        if (response.statusCode === 200) {
            history.push("/");
        } else {
            alert("An error occurred. the Event could not be deleted")
        }

    }

    const startDateString = (inputdate) => {
        const newDate = new Date(inputdate)
        const date = newDate.toDateString()
        const hours = newDate.getHours()
        const minutes = newDate.getMinutes()
        const timeSplit = newDate.toTimeString().split("0 ")
        const timeZone = timeSplit[timeSplit.length - 1]

        return `${date} at ${hours > 12 ? 24 - hours : hours}:${minutes < 10 ? `0${minutes}` : minutes}${hours >= 12 ? `PM` : `AM`} ${timeZone}`
    }

    const headerDateObj = new Date(event.startDate)
    const headerDate = headerDateObj.toDateString()
    const startDate = startDateString(event.startDate)
    const endDate = startDateString(event.endDate)



    return isLoaded && (
        <>
            <div>
                <div>{headerDate}</div>
                <h1>{event.name}</h1>
            </div>
            <div>
                <div>PREVIEW IMAGE GOES HERE</div>
                <h2>Details</h2>
                <p>
                    {event.description}
                </p>
            </div>
            <div>
                <div>Preview image for group goes here</div>
                <div><NavLink to={`/groups/${group.id}`}>{group.name}</NavLink></div>
                <div>{group.private ? "Private" : "Public"} group</div>
            </div>
            <div>
                <time class="">{startDate} to {endDate}</time>
                <div></div>
            </div>
            {/* <div>
                ATTENDEES MAY GO HERE AT SOME POINT
            </div> */}
            <div>
                <div>{group.name}</div>
                <NavLink to={`/groups/${group.id}/events`}>See more events</NavLink>
            </div>
            <div>
                <div>
                    <time class="" datetime={`${startDate}`} >{startDate}</time>
                    <p>{event.name}</p>
                </div>
                <div>
                    <div>
                        <div>{event.price !== 0 ? `$${event.price}` : `Free`}</div>
                        <div>{event.capacity - event.numAttending} spots left</div>
                    </div>
                    {/* <div>
                        <button>Attend (ADDITIONAL FEATURE)</button>
                    </div> */}
                </div>
            </div>
        </>
    )
}
