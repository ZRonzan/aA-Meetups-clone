// import LogInFormPage from "./components/LogInFormPage";
// import UserSignUpPage from "./components/UserSignUpPage";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { restoreUserSession } from "./store/session";
import Navigation from "./components/Navigation";
import GroupsCard from "./components/Groups/GroupsCards/Index";
import GroupDetails from "./components/Groups/GroupDetails/index";
import EventsCard from "./components/Events/EventsCards/Index";
import HomePage from "./components/HomePage";
import GroupForm from "./components/Groups/GroupForm/Index";
import UserGroupsCards from "./components/Groups/UserGroups/Index";
import EventDetails from "./components/Events/EventsDetails/Index";
import EventForm from "./components/Events/EventForm/Index";
import Footer from "./components/Footer/Index";
import UserSignUpPage from "./components/Session/UserSignUpPage";
import EventAttendees from "./components/Events/EventAttendees";

function App() {

  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  //restore a logged in user on refresh
  useEffect(() => {
    dispatch(restoreUserSession()).then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="main-page-body">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/sign-up">
            <UserSignUpPage />
          </Route>
          <Route exact path="/session/groups">
            <UserGroupsCards />
          </Route>
          <Route exact path="/groups">
            <div className="events-groups-toggle-main-container">
              <div className="all-events-groups-cards-toggle-container">
                <h2 className={`all-events-groups-cards-toggle inactive`} onClick={() => history.push("/events")}>Events</h2>
                <h2 className={`all-events-groups-cards-toggle active`}>Groups</h2>
              </div>
            </div>
            <GroupsCard />
          </Route>
          <Route exact path="/events">
            <div className="events-groups-toggle-main-container">
              <div className="all-events-groups-cards-toggle-container">
                <h2 className={`all-events-groups-cards-toggle active`}>Events</h2>
                <h2 className={`all-events-groups-cards-toggle inactive`} onClick={() => history.push("/groups")}>Groups</h2>
              </div>
            </div>
            <EventsCard />
          </Route>
          <Route path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route exact path="/events/:eventId/attendees">
            <EventAttendees />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetails />
          </Route>
          <Route path="/forms/group-form">
            <GroupForm />
          </Route>
          <Route path="/forms/event-form/:groupId">
            <EventForm />
          </Route>
          <Route>
            <div>
              <h2>{`Sorry, the page you’re looking for doesn’t exist.`}</h2>
              <div>{`The link you followed might be broken, or the page may have been deleted.`}</div>
              <Link to="/">Go Home</Link>
            </div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
