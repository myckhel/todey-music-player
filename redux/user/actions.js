import {
    CURRENT_USER,
    STORE_USER
} from '../../Constants/actionTypes';

export const getCurrentUser = () => {
    return (
        {
            type: CURRENT_USER,
            payload: ''
        }
    )
}

export const storeUser = ({payload}) => {
    return (
        {
            type: STORE_USER,
            payload: payload.user
        }
    )
}
