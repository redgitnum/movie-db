import { all } from 'redux-saga/effects';
import { watchPeople } from './peopleSagas';
import { watchMovie } from './movieSagas';
import { watchTvshow } from './tvshowSagas';
import { watchDiscover, watchKeywords } from './discoverSagas';
import { watchSearch } from './searchSagas';
import { watchDetails } from './detailsSagas';
import { watchUser } from './loginSagas';
export const API_KEY = 'e53a6547ceb8767ac7d61c1c8dd9f879'

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