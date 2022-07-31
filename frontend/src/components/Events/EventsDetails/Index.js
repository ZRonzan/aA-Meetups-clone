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
                        {!!event.previewImage.length && (
                            <img className="event-details-main-image" src={event.previewImage[0].imageUrl} alt="event image"></img>
                        )}
                        <h2>Details</h2>
                        <p className="event-details-description">
                            {event.description}
                        </p>
                    </div>

                    <div className="event-details-main-body-right-container">
                        <div className="event-details-group-card-container" onClick={() => history.push(`/groups/${group.id}`)}>
                            {!!group.images.length && (
                                <img className="event-details-group-image-container" src={group.images[0].imageUrl} alt="event image"></img>
                            )}
                            <div className="event-details-group-details" >
                                <div className="event-details-group-details-name">{group.name}</div>
                                <div className="event-details-group-details-privacy">{group.private ? "Private" : "Public"} group</div>

                            </div>
                        </div>
                        <div className="event-details-time-venue-container">
                            <div className="event-details-time">
                                <i className="fa-solid fa-clock"></i>
                                <time>{startDate} to {endDate}</time>
                            </div>
                            <div className="event-details-venue-location">
                                <i className="fa-solid fa-location-dot"></i>
                                <div>{event.Venue ? `${event.Venue.address}, ${event.Venue.city}, ${event.Venue.state} ` : "No venue"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="event-details-bottom">
                <div className="event-details-bottom-container">
                    <div className="event-details-bottom-left">
                        <time dateTime={`${startDate}`} >{startDate.toUpperCase()}</time>
                        <div>{event.name}</div>
                    </div>
                    <div className="event-details-bottom-right">
                        <div className="event-details-price-capacity">
                            <div className="event-details-price">{Number(event.price) !== 0 ? `$${Number(event.price).toFixed(2)}` : `FREE`}</div>
                            <div className="event-details-capacity">{event.capacity - event.numAttending} spots left</div>
                        </div>
                        <div
                            className="event-details-buttons"
                            style={{ visibility: `${!!user && group.organizerId === user.id ? "visible" : "hidden"}` }}
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
            </div>
        </>
    )
}
