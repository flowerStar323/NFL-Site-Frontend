import { LOGINSUCCESS, LOGOUT } from '../type';

const initState = {
    isAuthenticate: false
};

export default (state = initState, { type, payload }) => {
    switch (type) {
        case LOGINSUCCESS:
            return {
                ...state,
                isAuthenticate: payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticate: payload
            }
        default:
            return state;
    }
};