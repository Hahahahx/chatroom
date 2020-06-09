import * as actionTypes from './action-types';


const InitialNoticeList = [];

export function noticeReducer(state=InitialNoticeList,action) {
    switch (action.type) {
        case actionTypes.INITIAL_NOTICE:
            return action.list;
        case actionTypes.DELETE_NOTICE:
            state = state.filter(item=>item.noticeId !== action.id);
            console.log(state)
            return [...state];
        case actionTypes.EMPTY_NOTICE:
            return [];
        default:
            return state;
    }
}