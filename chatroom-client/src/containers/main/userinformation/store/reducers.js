import * as actionTypes from './action-types';

const InitialState = {
    userDetail:{}
};

export function UserDetailReducer(state = InitialState,action) {
    switch (action.type) {
        case actionTypes.SET_USERDETAIL:
            return {userDetail:action.userDetail};
        default:
            return state
    }
}