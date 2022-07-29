import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import EventsCard from "../Events/EventsCards/Index";
import Footer from "../Footer/Index";
import meetUpSplash1 from "../../static-files/online_events.svg"
import startGroupImg from "../../static-files/joinGroup.svg"
import findEventImg from "../../static-files/ticket.svg"
import joinGroupImg from "../../static-files/handsUp.svg"
import graffitiBG from "../../static-files/graffiti.svg"
import { Modal } from "../../context/Modal";
import { useState } from "react";
import UserSignUpPage from "../Session/SignUpFormModal/SignUpFormModal";
import "./SplashPage.css"

const HomePage = () => {
    const [showModalSplash, setShowModalSplash] = useState(false)
    const user = useSelector(state => state.session.user)

    return (
        <>
            {/* {!!!user && (
                <> */}
            <div className="splash-page-background-div">
                <img className="splash-page-background" src={graffitiBG} alt="graffiti background"></img>
            </div>
            <div className="splash-page-intro-container">
                <div className="splash-page-intro-image-container">
                    <div className="splash-page-title-and-intro-container">
                        <h1 className="splash-page-intro-title">
                            {"Celebrating around 1 week of real connections on Street-Up!"}
                        </h1>
                        <p className="splash-page-intro-description">
                            However you're planning on stylin' this year, Street-Up can help. For about a week, one person has turned to Street-Up to meet people, make friends, find support, grow a hip hop related community, and explore their interests. Thousands of events (eventually) are going to happen every day. Do you have the skills?
                        </p>
                    </div>
                    <img className="splash-page-intro-image" alt="Image of a Meetup Online Event" src={meetUpSplash1}></img>
                </div>
            </div>
            <div className="splash-page-beneath-intro-container">
                <div className="splash-page-how-it-works-container">
                    <h2>How Street-Up works</h2>
                    <p>
                        Meet new people who share your interests through online and in-person events. It’s free to create an account.
                    </p>
                </div>
                <div className="splash-page-join-find-start-container">
                    <div className="splash-page-join-find-start-card">
                        <div className="splash-page-card-image">
                            <img src={joinGroupImg} alt="Hands up image"></img>
                        </div>
                        <Link to="/groups"><h3>Find a group</h3></Link>
                        <p>
                            Do what you love, meet others who love it, find your community. The rest is history!
                        </p>
                    </div>
                    <div className="splash-page-join-find-start-card">
                        <div className="splash-page-card-image">
                            <img src={findEventImg} alt="ticket image"></img>
                        </div>
                        <Link to="/events"><h3>Find an event</h3></Link>
                        <p>
                            Events are happening on just about any topic you can think of, from free running and street-art to dance and/or rap battles.
                        </p>
                    </div>
                    <div className="splash-page-join-find-start-card">
                        <div className="splash-page-card-image">
                            <img src={startGroupImg} alt="Group of people image"></img>
                        </div>
                        <Link to="/forms/group-form"><h3>Start a group</h3></Link>
                        <p>
                            You don’t have to be an expert to gather people together and explore shared interests.
                        </p>
                    </div>
                </div>
            </div>
            {!!!user && (<div className="splash-page-join-button-container">
                <div className="splash-page-join-button" onClick={() => setShowModalSplash(true)}>Join Street-Up</div>
                {showModalSplash && (
                    <>
                        <Modal onClose={() => setShowModalSplash(false)} formType="login-signup">
                            <UserSignUpPage setShowModal={setShowModalSplash} />
                        </Modal>
                    </>
                )}
            </div>)}
            {/* </>
            )} */}
            {/* {!!user && (
                <>
                    <div style={{ visibility: `${!!user ? "visible" : "hidden"}` }}>

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
                        <div>Here are </div>
                        <EventsCard />
                    </div>
                </>
            )} */}
        </>
    )
}

export default HomePage;
