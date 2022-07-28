import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, useHistory } from "react-router-dom";
import * as sessionEvents from "../../../store/Events"
import * as sessionGroups from "../../../store/Groups"
import EventEditFormModal from "../EventEditFromModal/Index";
import EventsCard from "../../Events/EventsCards/Index";
import EventDeleteFormModal from "../EventDeleteFormModal/Index";

export default function EventDetails() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const event = useSelector(state => state.events.eventDetails);
    const group = useSelector(state => state.groups.groupDetails)
    const user = useSelector(state => state.session.user)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(sessionEvents.getEventByIdThunk(eventId))
            .then((res) => dispatch(sessionGroups.getGroupByIdThunk(res.Group.id)))
            .then(() => setIsLoaded(true))

    }, [dispatch])

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
                <div
                    style={{ visibility: `${group.organizerId === user.id ? "visible" : "hidden"}` }}
                >
                    <div>
                        <EventEditFormModal event={event} />
                    </div>
                    <div>
                        <EventDeleteFormModal event={event} groupId={group.id} />
                    </div>
                </div>
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
                <time><i className="fa-solid fa-clock"></i> {startDate} to {endDate}</time>
                <div><i className="fa-solid fa-location-dot"></i> {event.Venue ? `${event.Venue.address}, ${event.Venue.city}, ${event.Venue.state} ` : "No venue"}</div>
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
                    <time dateTime={`${startDate}`} >{startDate}</time>
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
