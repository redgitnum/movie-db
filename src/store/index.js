import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { rootReducer } from '../reducers';

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
    )

sagaMiddleware.run(rootSaga)