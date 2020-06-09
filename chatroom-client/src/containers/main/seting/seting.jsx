import React,{Component} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import MyInformation from "./myInformation/myInformation";
import Set from './set'
import ReportInformation from "./reportInformation/reportinformation";



class Seting extends Component{

    render() {
        return(
            <HashRouter>
                <Switch>
                    <Route path="/seting/detail/:phone" component={MyInformation}/>
                    <Route path="/seting/report/:phone" component={ReportInformation}/>
                    <Route path="/seting/" component={Set} exact/>
                </Switch>
            </HashRouter>
        )
    }
}


export default Seting