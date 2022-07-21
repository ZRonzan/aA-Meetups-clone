import LogInFormPage from "./components/LogInFormPage";
import { Route } from "react-router-dom";
import {useSelector} from "react-redux"

function App() {

  return (
    <>
      <h1>Hello from App</h1>
      <Route exact path="/login">
        <LogInFormPage />
      </Route>
      {/* {user && (<div>
            <h3>Current user:</h3>
            <div>First name: {user.firstName}</div>
            <div>Last name: {user.lastName}</div>
            <div>email: {user.email}</div>
        </div>)} */}
    </>
  );
}

export default App;
