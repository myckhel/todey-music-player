import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    LOAD_MUSIC
} from '../../constants/actionTypes';

import {
    loadingMusic
} from './actions';

function* loadingMusicIndicator({ payload }) {
    // const { name, email, password, password_confirmation } = payload.user;
    try {
      
    } catch (error) {
        // catch throw
        console.log('loading error', {error})
    }
}


export function* watchLoadingMusic() {
    yield takeEvery(LOAD_MUSIC, loadingMusicIndicator);
}

export default function* rootSaga() {
    yield all([
        // fork(watchLoadingMusic),
    ]);
}
