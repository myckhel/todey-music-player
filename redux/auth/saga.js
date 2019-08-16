import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    CHECK_AUTH
} from '../../constants/actionTypes';

import {
    loginUserSuccess,
    registerUserSuccess,
    registerError,
    storeUser,
    loginError
} from './actions';

const loginWithEmailPasswordAsync = async (email, password, remember_me) =>
    await auth.signInWithEmailAndPassword(email, password, remember_me)
        .then(authUser => authUser)
        .catch(error => error);


function* loginWithEmailPassword({ payload }) {

}

const registerWithEmailPasswordAsync = async (email, password, name,  password_confirmation) =>
    await auth.createUserWithEmailAndPassword(email, password, name,  password_confirmation)
        .then(authUser => authUser)
        .catch(error => error);

function* registerWithEmailPassword({ payload }) {
    const { name, email, password, password_confirmation } = payload.user;
    const { history } = payload
    try {

    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}

const checkAuthAsync = async () =>
  await auth.checkAuth()
  .then(authUser => authUser)
  .catch(error => error);


function* checkAuth () {
    try {

    } catch (error) {
        // catch throw
        console.log('Auth error : ', error)
    }
}

const logoutAsync = async (history) => {
}

function* logout({payload}) {
    const { history } = payload
    try {
        yield call(logoutAsync,history);
    } catch (error) {
      console.log(error);
    }
}



export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchCheckAuth() {
    yield takeEvery(CHECK_AUTH, checkAuth);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchCheckAuth),
    ]);
}
