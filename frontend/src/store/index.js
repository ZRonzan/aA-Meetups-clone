import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import Thunk from "redux-thunk"
import eventsReducer from "./Events";
import groupsReducer from "./Groups";
import membersReducer from "./Members";
import sessionReducer from "./session";

const rootReducer = combineReducers({
    session: sessionReducer,
    groups: groupsReducer,
    members: membersReducer,
    events: eventsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(Thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(Thunk, logger));
};

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
