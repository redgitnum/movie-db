import { all } from 'redux-saga/effects';
import { watchPeople } from './peopleSagas';
import { watchMovie } from './movieSagas';
import { watchTvshow } from './tvshowSagas';
import { watchDiscover, watchKeywords } from './discoverSagas';
import { watchSearch } from './searchSagas';
import { watchDetails } from './detailsSagas';
import { watchUser } from './loginSagas';

export default function* rootSaga() {
    yield all([
        watchPeople(),
        watchMovie(),
        watchTvshow(),
        watchDiscover(),
        watchKeywords(),
        watchSearch(),
        watchDetails(),
        watchUser()
    ])
  }