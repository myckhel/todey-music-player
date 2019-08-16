import { all } from 'redux-saga/effects';
// import authSagas from './auth/saga';
import musicSagas from './music/saga';

export default function* rootSaga(getState) {
  yield all([
    // authSagas(),
    musicSagas()
  ]);
}
