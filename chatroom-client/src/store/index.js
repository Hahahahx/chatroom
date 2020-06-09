import { createStore, applyMiddleware } from 'redux';

import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

//  存储机制，可换成其他机制，当前使用sessionStorage机制
import sessionStorage from 'redux-persist/es/storage/session';
//import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {composeWithDevTools} from 'redux-devtools-extension';

import {SeesionReducer} from './reducers';

const persistConfig={
    key:'root',
    storage:sessionStorage
}

const persistreducer = persistReducer(persistConfig,SeesionReducer);
export const store = createStore(persistreducer,composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);