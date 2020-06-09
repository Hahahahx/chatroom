import React, { Component } from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store,persistor } from './store';
import login from './containers/login/login';
import register from './containers/register/register';
import Main from './containers/main/main';




class App extends Component {
    render() { 
        return ( 
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <HashRouter>
                        <Switch>
                            <Route path='/login' component={login}/>
                            <Route path='/register' component={register}/>
                            <Route component={Main}/>
                        </Switch>
                    </HashRouter>
                </PersistGate>
            </Provider>
         );
    }
}
 
export default App;