import React,{Component} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import GroupDetail from "./groupInformation";
import CreateGroup from "./creategroup";
import GroupTalking from "../talking/grouptalking";
import UpdateGroup from './updategroup'
import ReportGroup from './report';

export class Group extends Component{
    render() {
        return(
            <HashRouter>
                <Switch>
                    <Route path={"/group/detail/:group"} component={GroupDetail} exact/>
                    <Route path={"/group/create"} component={CreateGroup}/>
                    <Route path={"/group/talk/:group"} component={GroupTalking}/>
                    <Route path={"/group/update/:group"} component={UpdateGroup}/>
                    <Route path={"/group/report/:group"} component={ReportGroup}/>
                </Switch>
            </HashRouter>
        )
    }

}