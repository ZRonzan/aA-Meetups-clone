import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom";
import * as sessionGroups from "../../../store/Groups";
import * as sessionMembers from "../../../store/Members";
import * as sessionAttendees from "../../../store/Attendees";
import * as sessionEvents from "../../../store/Events";

import "./EventAttendees.css"

export default function EventAttendees() {
    const dispatch = useDispatch();
    const history = useHistory()

    const { eventId } = useParams()

    const groups = useSelector(state => Object.values(state.groups.groupsList));
    const group = useSelector(state => state.groups.groupDetails);
    const user = useSelector(state => state.session.user)
    const event = useSelector(state => state.events.eventDetails)
    const members = useSelector(state => state.members.currentGroupMembers)
    const userStatus = useSelector(state => state.members.currentGroupStatus)
    const memberStatus = useSelector(state => state.members.currentGroupStatus)
    const attendees = useSelector(state => state.attendees.currentEventAttendees)
    const attendeeStatus = useSelector(state => state.attendees.currentEventStatus)

    // let sortedMembers = Object.values(members).sort((a, b) => a.lastName - b.lastName)

    const [isLoaded, setIsLoaded] = useState(false);

    const colors = ["#AA9AF9", "#55648E", "#2DE410", "#47843F", "#ABAA5E", "#607357", "#F2F1D8", "#830D5B", "#CD9186", "#40CCC5", "#4A0A4F", "#3D590B", "#95097F", "#B4EF64", "#42E9EE", "#AA1888", "#781F5D", "#35C713", "#4A5E41", "#16ACC5", "#4F1295", "#1D93FA", "#1EFB58", "#B76CBA", "#903536", "#C78706", "#10994C", "#BE1CBD", "#2ADB0F", "#3B7DD2", "#797CC5", "#D60F96", "#CB5984", "#F5412D", "#921220", "#95408D", "#E98F23", "#A3D086", "#6130CA", "#13F482", "#2AC6C0", "#EDE7F7", "#5D7346", "#EA06DB", "#3B8717", "#5AC5F6", "#C63B2B", "#5B9E27", "#8BC040", "#DA0DC4", "#50B613", "#9C427A", "#F69299", "#DA0EF3", "#655529", "#A5A7C3", "#B3F744", "#39E579", "#7AF391", "#35EA34", "#449B83", "#B64B72", "#39350E", "#961FAB", "#E0B2CA", "#FCCF70", "#A78856", "#C2B3B8", "#C4582A", "#3A211A", "#1ACBCF", "#675815", "#CC56BE", "#83840B", "#F234D6", "#2F2A06", "#E43248", "#1343CA", "#434FED", "#C872C6", "#75B64E", "#786CB3", "#8C7B97", "#026CD5", "#A2A1B5", "#012A55", "#E3C45C", "#F4BD7B", "#1CA299", "#86BFA4", "#3036EC", "#82D959", "#5E947F", "#DABF0E", "#EAE1E0", "#D85A05", "#7913B2", "#5F8FD8", "#7B3941", "#CFA79F"]

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
                } else {
                    history.push("/404-not-found")
                    return
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

    const handleStatusChange = async (newStatus, userId) => {
        const editedMember = {
            "userId": userId,
            "status": newStatus
        }
        await dispatch(sessionAttendees.editAttendanceThunk(event.id, editedMember))
    }

    const handleJoin = async () => {
        await dispatch(sessionAttendees.requestAttendanceThunk(eventId))
        await dispatch(sessionAttendees.getCurrentAttendanceThunk(eventId))
        await dispatch(sessionEvents.getEventByIdThunk(eventId))
    }

    const handleLeave = async (deletedAttendee) => {
        await dispatch(sessionAttendees.deleteAttendanceThunk(eventId, deletedAttendee))
        await dispatch(sessionAttendees.getCurrentAttendanceThunk(eventId))
        await dispatch(sessionEvents.getEventByIdThunk(eventId))
    }

    return isLoaded && (
        <>
            <div className="event-details-bottom">
                <div className="event-details-bottom-container">
                    <div className="event-details-bottom-left">
                        <time dateTime={`${startDate}`} >{startDate.toUpperCase()}</time>
                        <h2
                            className="attendees-header-link"
                        >
                            <Link
                                className="attendees-header-link"
                                to={`/events/${eventId}`}
                            >
                                <i class="fa-solid fa-chevron-left"></i>{`   ${event.name}`}
                            </Link>
                        </h2>
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
            <div
                className="attendees-cards-container-outer"
            >
                <div className="members-cards-container">
                    {isLoaded && Object.values(attendees).length > 0 ? (
                        Object.values(attendees).sort((a, b) => a.lastName - b.lastName)
                            .map((attendee, i) => {
                                const attendeeStatus = attendee.Attendance[0].status
                                return user ? attendee.id !== user.id ? (
                                    <div className="member-card" key={i}>
                                        <div
                                            className="member-status-profile-container"
                                        >
                                            <div
                                                style={{ "backgroundColor": `${colors[i % 100]}` }}
                                                className="member-attendee-profile-circle"
                                            >
                                                {`${attendee.firstName[0]}${attendee.lastName[0]}`}
                                            </div>
                                            <div
                                                className="member-attendee-name-status-container"
                                            >
                                                <div
                                                    className="member-attendee-name"
                                                >
                                                    {`${attendee.firstName} ${attendee.lastName}`}
                                                </div>
                                                <div
                                                    className="member-attendee-status"
                                                >
                                                    {`Status: ${attendeeStatus === "Member" ? "Attending" : attendeeStatus}`}
                                                </div>
                                            </div>

                                        </div>
                                        {(userStatus === "Organizer" || userStatus === "Co-Host") && (
                                            <div
                                                className="member-status-buttons-container"
                                            >
                                                {attendeeStatus !== "Member" && event.capacity - event.numAttending > 0 && (
                                                    <button
                                                        onClick={() => {
                                                            handleStatusChange("Member", attendee.id)
                                                        }}
                                                        className="member-status-buttons"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {attendeeStatus !== "Waitlist" && attendeeStatus !== "Member" && (
                                                    <button
                                                        onClick={() => {
                                                            handleStatusChange("Waitlist", attendee.id)
                                                        }}
                                                        className="member-status-buttons"
                                                    >
                                                        Add to Waitlist
                                                    </button>
                                                )}
                                                {userStatus === "Organizer" && (
                                                    <button
                                                        onClick={() => handleLeave(attendee.id)}
                                                        className="member-status-buttons"
                                                    >
                                                        Remove from event
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    null
                                ) : (
                                    <div className="member-card" key={i}>
                                        <div
                                            className="member-status-profile-container"
                                        >
                                            <div
                                                style={{ "backgroundColor": `${colors[i % 100]}` }}
                                                className="member-attendee-profile-circle"
                                            >
                                                {`${attendee.firstName[0]}${attendee.lastName[0]}`}
                                            </div>
                                            <div
                                                className="member-attendee-name-status-container"
                                            >
                                                <div
                                                    className="member-attendee-name"
                                                >
                                                    {`${attendee.firstName} ${attendee.lastName}`}
                                                </div>
                                                <div
                                                    className="member-attendee-status"
                                                >
                                                    {`Status: ${attendeeStatus}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    ) : (
                        <div
                            className="members-cards-container"
                        >
                            <h2>
                                No Attendees
                            </h2>
                            <div>
                                Looks like there are currently no attendees for this event.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
