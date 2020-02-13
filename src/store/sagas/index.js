import { all } from 'redux-saga/effects';
import { watchPeople } from './peopleSagas'
import { watchMovie } from './movieSagas'

export default function* rootSaga() {
    yield all([
        watchPeople(),
        watchMovie()
    ])
  }