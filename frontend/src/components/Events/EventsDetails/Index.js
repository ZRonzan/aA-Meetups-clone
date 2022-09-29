import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useHistory } from "react-router-dom";
import * as sessionEvents from "../../../store/Events"
import * as sessionGroups from "../../../store/Groups"
import * as sessionMembers from "../../../store/Members"
import * as sessionAttendees from "../../../store/Attendees"
import EventEditFormModal from "../EventEditFromModal/Index";
import EventDeleteFormModal from "../EventDeleteFormModal/Index";
import "./EventDetails.css"
import "../EventAttendees/EventAttendees.css"

export default function EventDetails() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const event = useSelector(state => state.events.eventDetails);
    const group = useSelector(state => state.groups.groupDetails);
    const members = useSelector(state => state.members.currentGroupMembers)
    const memberStatus = useSelector(state => state.members.currentGroupStatus)
    const user = useSelector(state => state.session.user)
    const attendees = useSelector(state => state.attendees.currentEventAttendees)
    const attendeeStatus = useSelector(state => state.attendees.currentEventStatus)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        dispatch(sessionEvents.getEventByIdThunk(eventId))
            .then((res) => {
                if (res.Group) {
                    dispatch(sessionGroups.getGroupByIdThunk(Number(res.Group.id)))
                        .then(() => {
                            if (user) {
                                dispatch(sessionMembers.getCurrentmembershipThunk(res.Group.id))
                            }
                        })
                }
            })
            .then(() => dispatch(sessionAttendees.getAllAttendeesThunk(eventId)))
            .then(() => {
                if (user) {
                    dispatch(sessionAttendees.getCurrentAttendanceThunk(eventId))
                }
            })
            .then(() => setIsLoaded(true))

    }, [dispatch, eventId, user])

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

    const colors = ["#AA9AF9", "#55648E", "#2DE410", "#47843F", "#ABAA5E", "#607357", "#F2F1D8", "#830D5B", "#CD9186", "#40CCC5", "#4A0A4F", "#3D590B", "#95097F", "#B4EF64", "#42E9EE", "#AA1888", "#781F5D", "#35C713", "#4A5E41", "#16ACC5", "#4F1295", "#1D93FA", "#1EFB58", "#B76CBA", "#903536", "#C78706", "#10994C", "#BE1CBD", "#2ADB0F", "#3B7DD2", "#797CC5", "#D60F96", "#CB5984", "#F5412D", "#921220", "#95408D", "#E98F23", "#A3D086", "#6130CA", "#13F482", "#2AC6C0", "#EDE7F7", "#5D7346", "#EA06DB", "#3B8717", "#5AC5F6", "#C63B2B", "#5B9E27", "#8BC040", "#DA0DC4", "#50B613", "#9C427A", "#F69299", "#DA0EF3", "#655529", "#A5A7C3", "#B3F744", "#39E579", "#7AF391", "#35EA34", "#449B83", "#B64B72", "#39350E", "#961FAB", "#E0B2CA", "#FCCF70", "#A78856", "#C2B3B8", "#C4582A", "#3A211A", "#1ACBCF", "#675815", "#CC56BE", "#83840B", "#F234D6", "#2F2A06", "#E43248", "#1343CA", "#434FED", "#C872C6", "#75B64E", "#786CB3", "#8C7B97", "#026CD5", "#A2A1B5", "#012A55", "#E3C45C", "#F4BD7B", "#1CA299", "#86BFA4", "#3036EC", "#82D959", "#5E947F", "#DABF0E", "#EAE1E0", "#D85A05", "#7913B2", "#5F8FD8", "#7B3941", "#CFA79F"]

    const handleJoin = async () => {
        await dispatch(sessionAttendees.requestAttendanceThunk(eventId))
        await dispatch(sessionAttendees.getCurrentAttendanceThunk(eventId))
    }

    const handleLeave = async (deletedAttendee) => {
        await dispatch(sessionAttendees.deleteAttendanceThunk(eventId, deletedAttendee))
        await dispatch(sessionAttendees.getCurrentAttendanceThunk(eventId))
    }

    const returnAttendees = (attendeesArray) => {
        let count = 5;
        if (attendeeStatus !== "None") count--;

        const newAttendeesArray = [];

        for (let i = 0; i < attendeesArray.length; i++) {
            if (newAttendeesArray.length >= count) break
            if (attendeesArray[i].Attendance[0].status === "Member" && (!!!user || (!!user && attendeesArray[i].id !== user.id))) newAttendeesArray.push(attendeesArray[i])
        }

        return newAttendeesArray;
    }

    // console.log(Object.values(attendees), "ATTENDEES!")

    return (
        <>
            {isLoaded && Object.values(event).length > 0 && (
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
                                    {!!group.images && !!group.images.length && (
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
                    <div
                        className="event-details-attendees-container"
                    >
                        <div className="event-details-attendees-inner-container">
                            <div className="member-attendee-name title">{`Attendees (${event.numAttending})`}</div>
                            <div
                                className="view-all-attendees-link"
                            >
                                <Link className="view-all-attendees-link" to={`/events/${eventId}/attendees`}>view all</Link>
                            </div>
                            <div
                                style={{ visibility: `${!!user && attendeeStatus !== "None" ? "visible" : "hidden"}` }}
                                className="member-attendee-name"
                            >
                                Your Status:
                            </div>
                            <div className="event-details-attendees-cards-container">
                                {!!user && (attendeeStatus !== "None") && (
                                    <>
                                        <div
                                            className="event-details-attendee-card"
                                        >
                                            <div>
                                                <div
                                                    className="member-status-profile-container event-details-page"
                                                >
                                                    <div
                                                        style={{ "backgroundColor": `${colors[15]}` }}
                                                        className="member-attendee-profile-circle"
                                                    >
                                                        {`${user.firstName[0]}${user.lastName[0]}`}
                                                    </div>

                                                </div>
                                            </div>
                                            <div
                                                className="member-attendee-name-status-container event-details-page"
                                            >
                                                <div
                                                    className="member-attendee-name"
                                                >
                                                    {`${user.firstName}`}
                                                </div>
                                                <div
                                                    className="member-attendee-name"
                                                >
                                                    {`${user.lastName}`}
                                                </div>
                                            </div>
                                            <div
                                                className="member-attendee-name-status-container event-details-page"
                                            >
                                                {/* <div
                                                    className="member-attendee-status"
                                                >
                                                    {`Group Status: ${memberStatus}`}
                                                </div> */}
                                                <div
                                                    className="member-attendee-status"
                                                >
                                                    {`Status: ${attendeeStatus === "Member" ? "Attending" : attendeeStatus}`}
                                                </div>

                                            </div>
                                        </div>
                                        <div
                                            className="event-details-attendee-card border"                                        >

                                        </div>
                                    </>
                                )}
                                {!!attendees && Object.values(attendees).length > 0 && (
                                    returnAttendees(Object.values(attendees)).map((attendee, i) => {


                                        return (
                                            <div
                                                className="event-details-attendee-card"
                                                key={`attendance-card-${i}`}
                                            >
                                                <div>
                                                    <div
                                                        className="member-status-profile-container event-details-page"
                                                    >
                                                        <div
                                                            style={{ "backgroundColor": `${colors[i % 100]}` }}
                                                            className="member-attendee-profile-circle"
                                                        >
                                                            {`${attendee.firstName[0]}${attendee.lastName[0]}`}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div
                                                    className="member-attendee-name-status-container event-details-page"
                                                >
                                                    <div
                                                        className="member-attendee-name"
                                                    >
                                                        {`${attendee.firstName}`}
                                                    </div>
                                                    <div
                                                        className="member-attendee-name"
                                                    >
                                                        {`${attendee.lastName}`}
                                                    </div>
                                                </div>
                                                <div
                                                    className="member-attendee-status"
                                                >
                                                    {`Status: Attending`}
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
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
                                    style={{ visibility: `${!!user ? "visible" : "hidden"}` }}
                                >
                                    {!!user && group.organizerId === user.id && (
                                        <>
                                            <div>
                                                <EventEditFormModal event={event} />
                                            </div>
                                            <div>
                                                <EventDeleteFormModal event={event} groupId={group.id} />
                                            </div>
                                        </>
                                    )}
                                    {!!user && group.organizerId !== user.id && (
                                        <>
                                            {(memberStatus === "Member" || memberStatus === "Co-Host") && (
                                                <button
                                                    className={`join-leave-button ${!attendees[user.id] ? 'join' : 'leave'}`}
                                                    onClick={() => {
                                                        !attendees[user.id] && attendeeStatus !== "Pending" ? handleJoin() : handleLeave(user.id)
                                                    }}
                                                >
                                                    {`${!attendees[user.id] && (attendeeStatus !== "Pending" && attendeeStatus !== "Waitlist") ? 'Join' : 'Leave'} This Event`}
                                                </button>
                                            )}
                                            <div
                                                className={`group-membership-status ${(attendeeStatus === "Pending" || attendeeStatus === "Member") ? "open" : "closed"}`}
                                            >
                                                {`Attendance status: ${attendeeStatus === "Member" ? "Attending" : attendeeStatus}`}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
            {
                isLoaded && Object.values(event).length === 0 && (
                    <div>
                        <h2>{`Sorry, the page you’re looking for doesn’t exist.`}</h2>
                        <div>{`The link you followed might be broken, or the page may have been deleted.`}</div>
                        <Link to="/">Go Home</Link>
                    </div>
                )
            }
        </>
    )
}
