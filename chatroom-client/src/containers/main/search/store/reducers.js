import * as actionTypes from './action-types';

const InitialState = []

export  function searchReducer(state=InitialState,action) {
    let list;
    switch (action.type) {
        case actionTypes.ADD_SEARCH_LIST:
            list = state.filter(tag => tag !== action.tag)
            list.unshift(action.tag);
            return list;
        case actionTypes.SUB_SEARCH_LIST:
            list = state.filter(tag => tag !== action.tag)
            return list;
        default:
            return state;
    }
}