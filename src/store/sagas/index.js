import { all } from 'redux-saga/effects';
import { watchPeople } from './peopleSagas';
import { watchMovie } from './movieSagas';
import { watchTvshow } from './tvshowSagas';
import { watchDiscover } from './discoverSagas';

export default function* rootSaga() {
    yield all([
        watchPeople(),
        watchMovie(),
        watchTvshow(),
        watchDiscover()
    ])
  }