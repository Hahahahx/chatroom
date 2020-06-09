import * as actionTypes from './action-types';

const initialTemporaryState = [
    
]

export function TemporaryReducer(state=initialTemporaryState,action) {
    switch (action.type) {
        case actionTypes.INITIAL_TEMPORARY_LIST:
            return action.list;
        default:
            return state;
    }
    
}
