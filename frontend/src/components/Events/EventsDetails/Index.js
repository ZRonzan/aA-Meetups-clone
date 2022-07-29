import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, useHistory } from "react-router-dom";
import * as sessionEvents from "../../../store/Events"
import * as sessionGroups from "../../../store/Groups"
import EventEditFormModal from "../EventEditFromModal/Index";
import EventsCard from "../../Events/EventsCards/Index";
import EventDeleteFormModal from "../EventDeleteFormModal/Index";
import "./EventDetails.css"

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
            <div className="event-details-header">
                <div className="event-details-title-container">
                    <div>{headerDate}</div>
                    <h1>{event.name}</h1>
                </div>
            </div>

            <div className="event-details-main-body-container">
                <div className="event-details-main-body-inner-container">

                    <div className="event-details-main-body-left-container">
                        <div className="event-details-main-image">PREVIEW IMAGE GOES HERE</div>
                        <h2>Details</h2>
                        <p className="event-details-description">
                            {event.description}
                        </p>
                    </div>

                    <div className="event-details-main-body-right-container">
                        <div className="event-details-group-card-container">
                            <div className="event-details-group-image"></div>
                            <div className="event-details-group-details">
                                <div className="event-details-group-details-name">{group.name}</div>
                                <div className="event-details-group-details-privacy">{group.private ? "Private" : "Public"} group</div>

                            </div>
                        </div>
                        <div className="event-details-time-venue-container">
                            <div className="event-details-time">
                                <i className="fa-solid fa-clock"></i>
                                <time>{startDate} to {endDate}</time>
                                {/* <div>{group.name}</div>
                                <NavLink to={`/groups/${group.id}/events`}>See more events</NavLink> */}
                            </div>
                            <div className="event-details-venue">
                                <div><i className="fa-solid fa-location-dot"></i> {event.Venue ? `${event.Venue.address}, ${event.Venue.city}, ${event.Venue.state} ` : "No venue"}</div>
                            </div>
                        </div>
                        {/* <div>
                ATTENDEES MAY GO HERE AT SOME POINT
            </div> */}
                    </div>
                </div>
            </div>
            <div className="event-details">
                <div className="event-details">
                    <time dateTime={`${startDate}`} >{startDate}</time>
                    <p>{event.name}</p>
                </div>
                <div className="event-details">
                    <div className="event-details">
                        <div className="event-details">{event.price !== 0 ? `$${event.price}` : `Free`}</div>
                        <div className="event-details">{event.capacity - event.numAttending} spots left</div>
                    </div>
                    {/* <div>
                        <button>Attend (ADDITIONAL FEATURE)</button>
                    </div> */}
                    <div
                        className="event-details"
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
            </div>
        </>
    )
}
