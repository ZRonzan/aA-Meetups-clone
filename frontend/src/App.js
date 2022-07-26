// import LogInFormPage from "./components/LogInFormPage";
// import UserSignUpPage from "./components/UserSignUpPage";
import { Route, Switch } from "react-router-dom";
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
import UserEventsCards from "./components/Events/UserEvents/Index";
import EventDetails from "./components/Events/EventsDetails/Index";

function App() {

  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()

  //restore a logged in user on refresh
  useEffect(() => {
    dispatch(restoreUserSession()).then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded && (
    <>
      <h1>Street-Up</h1>

      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
            <HomePage />
        </Route>
        <Route exact path="/session/groups">
            <UserGroupsCards />
        </Route>
        <Route exact path="/session/events">
            <UserEventsCards />
        </Route>
        <Route exact path="/groups">
            <GroupsCard />
        </Route>
        <Route exact path="/events">
            <EventsCard />
        </Route>
        <Route path="/groups/:groupId">
            <GroupDetails />
        </Route>
        <Route exact path="/events/:eventId">
            <EventDetails />
        </Route>
        <Route path="/forms/groupForm">
            <GroupForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
