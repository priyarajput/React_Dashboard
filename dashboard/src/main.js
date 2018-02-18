import routes from './routes';
import render, {
    replaceReducers, setupReducers, applyMiddleware,getData,createReduxStore
} from '@sketchpixy/rubix/lib/node/redux-router';

import reducers from './redux/reducers';
import createSagaMiddleware from 'redux-saga';
import * as React from "react";
import startSagaWithWatchers from "./sagas/commonSaga";



setupReducers(reducers);

const sagaMiddleware = createSagaMiddleware();
applyMiddleware(sagaMiddleware);
let initialStore = getData();
let store = createReduxStore(initialStore);
sagaMiddleware.run(startSagaWithWatchers);

render(routes,store);


if (module.hot) {
    module.hot.accept('./routes', () => {
        // reload routes again
        // noinspection BadExpressionStatementJS
        require('./routes').default;
        render(routes);
    });

    module.hot.accept('./redux/reducers', () => {
        // reload reducers again
        let newReducers = require('./redux/reducers');
        replaceReducers(newReducers);
    });
}
