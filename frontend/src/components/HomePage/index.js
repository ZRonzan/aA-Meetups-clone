import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import EventsCard from "../EventsCards/Index";

const HomePage = () => {

    const user = useSelector(state => state.session.user)

    return (
        <>
            <div style={{visibility: `${!!user? "visible" : "hidden"}`}}>
                <div>
                    <span>Your next event </span>
                    <Link to="/session/events">See all your events</Link>
                    <div>
                        <i className="fa-solid fa-ticket"></i>
                        <div>
                            You have not registered for any events
                            Events you have registered for will appear here.
                        </div>
                    </div>
                </div>
                <div>
                    <span>Your groups </span>
                    <Link to="/session/groups">See all your groups</Link>
                    <div>
                        <i className="fa-solid fa-user-group"></i>
                        <div>
                            You have not Joined any groups
                        </div>
                        <Link to="/groups"> Dicover groups</Link>
                    </div>
                </div>
            </div>
            <div>
                <EventsCard />
            </div>
        </>
    )
}

export default HomePage;
