import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { compose } from 'redux';

const PING = 'PING';
const PONG = 'PONG';

const pingEpic = action$ =>
  action$.ofType(PING)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: PONG });

export const rootEpic = combineEpics(
    pingEpic,
  );
  

const rootReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case PING:
      return { isPinging: true };

    case PONG:
      return { isPinging: false };

    default:
      return state;
  }
};

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {

    const store = createStore(rootReducer,
        composeEnhancers(
          applyMiddleware(epicMiddleware)
        )
      );
  
    epicMiddleware.run(rootEpic);
  
    return store;
  }