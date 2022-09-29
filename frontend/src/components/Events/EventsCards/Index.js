import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as sessionEvents from "../../../store/Events"
import "./EventsCards.css"

export default function EventsCard() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { groupId } = useParams()

    let events = useSelector(state => Object.values(state.events.eventsList));
    let currentUserGroupStatus = useSelector(state => state.members.currentGroupStatus)

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // setIsLoaded(false)
        if (groupId) {
            dispatch(sessionEvents.getAllEventsForGroupIdThunk(Number(groupId))).then(() => setIsLoaded(true));
        } else {
            dispatch(sessionEvents.getAllEventsThunk()).then(() => setIsLoaded(true));
        };
    }, [dispatch, currentUserGroupStatus]);

    return (
        <div className="events-cards-container">

                {isLoaded && (
                    events.map((event, i) => {

                        const startDateString = () => {
                            const newDate = new Date(event.startDate)
                            const date = newDate.toDateString()
                            const hours = newDate.getHours()
                            const minutes = newDate.getMinutes()
                            const timeSplit = newDate.toTimeString().split("0 ")
                            const timeZone = timeSplit[timeSplit.length - 1]

                            return `${date} ${hours > 12 ? 24 - hours : hours}:${minutes < 10 ? `0${minutes}` : minutes}${hours >= 12 ? `PM` : `AM`} ${timeZone}`
                        }
                        return (
                            <div className={`events-card container ${groupId? "details": ""}`} onClick={() => history.push(`/events/${event.id}`)} key={i}>
                                <img
                                style={{visibility: `${event.previewImage.length > 0? "visible": "hidden"}`}}
                                className="events-card image-container" src={event.previewImage.length > 0? event.previewImage[0].imageUrl:""}
                                ></img>
                                <div className="events-card info-container" >
                                    <div className="events-card start-date">{startDateString()}</div>
                                    <h3 className="events-card title">{event.name}</h3>
                                    <div className="events-card location">{`${event.Group.name} • ${event.Group.city}, ${event.Group.state}`}</div>
                                    <div className="groups-card members">{event.numAttending} {event.numAttending === 1 ? "attendee" : "attendees"}</div>
                                </div>
                            </div>
                        )
                    })
                )}
        </div>
    )
}
