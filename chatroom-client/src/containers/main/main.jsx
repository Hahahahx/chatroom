import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Redirect, Switch, Route,  HashRouter} from 'react-router-dom';
import {actions as SocketActions} from '../socketIO/store';
import {actions as TalkingActions} from './talking/store';
import {actions as FriendListActions} from './userlist/store';
import {actions as TemporaryAcitons} from './temporary/store'
import {actions as NoticeActions} from './notice/store'
import './main.less'
import Talking from './talking/talking';
import GroupTalking from './talking/grouptalking';
import 'animate.css'
import UserList from './userlist/list';
import Notice from './notice/notice'
import Search from './search/search'
import UserInformation from "./userinformation/userinformation";
import * as actionTypes from "../socketIO/store/action-types";
import Me from "./me/me";
import CreateGroup from "./group/creategroup";
import Temporary from "./temporary/temporary"
import ReportUser from "./report/report"
import {message} from "antd";
import GroupDetail from "./group/groupInformation";
import notice from '../../assets/audio/notice.mp3'
import msg from '../../assets/audio/msg.mp3'
import Seting from "./seting/seting";
import {Group} from "./group/group";
 
class Main extends Component {
    
    render() { 
        const {phone,loginStatus,ConnectSocket,ConnectSuccess,ConnectError,InitialList,ReceiveTalking} = this.props;
        ConnectSocket(phone,async (type,data)=>{
            switch(type){
                case actionTypes.CONNECT_SUCEED:
                    ConnectSuccess();
                    break;
                case actionTypes.CONNECT_ERROR:
                    ConnectError();
                    break;
                case actionTypes.RECEIVE_MSG:
                    console.log(data);
                    if(!JSON.parse(data).group){
                        await this.msg.play();
                    }
                    this.props.AddToTemporary(JSON.parse(data));
                    ReceiveTalking(JSON.parse(data));
                    break;
                case actionTypes.NEW_NOTICE:
                    await this.notice.play();
                    this.props.ReceiveNotice();
                    this.props.UpdateFriendList();
                    message.info(data.type+"："+data.name+data.content);
                    break;
                case actionTypes.NEW_GROUP:
                    console.log(data);
                    this.props.ReceiveNewGroup(data);
                    break;
                case actionTypes.DELETE:
                    message.error(data);
                    break;
                default:
                    break;
            }
        });
        if(loginStatus){
            return(
                <div>
                    <audio ref={audio=>this.notice=audio} src={notice} style={{display:"none"}}/>
                    <audio ref={audio=>this.msg=audio} src={msg} style={{display:"none"}}/>
                    <HashRouter>
                        <Switch>
                            <Route path="/seting" component={Seting}/>
                            <Route path="/reportuser/:phone" component={ReportUser}/>
                            <Route path="/group" component={Group}/>
                            <Route path="/me" component={Me}/>
                            <Route path="/user/:phone" component={UserInformation}/>
                            <Route path="/search" component={Search}/>
                            <Route path="/talkuser/:phone" component={Talking}/>
                            <Route path="/list" component={UserList}/>
                            <Route path="/notice" component={Notice}/>
                            <Route path='/search' component={Search}/>
                            <Route path='/temporary' component={Temporary}/>
                            <Route path="/" component={Temporary} exact />  {/**默认路由 */}
                        </Switch>
                    </HashRouter>
                </div>
            )

        }else{
            return <Redirect to="/login"/>
        }
    }
}


const mapStateToProps = (state) => ({
    phone:state.socket.phone,
    loginStatus: state.login.loginStatus,
});

const mapDispatch=(dispatch)=>({
    ConnectSocket(phone,fn){
        SocketActions.connectWS(phone,fn);
    },
    ConnectSuccess(){
        dispatch(SocketActions.connectSuccess());
    },
    ConnectError(){
        dispatch(SocketActions.connectError());
    },
    AddToTemporary(data){
        dispatch(TemporaryAcitons.AddList(data));
    },
    ReceiveNotice(){
        dispatch(NoticeActions.InitialNotice())
    },
    ReceiveTalking(data){
        dispatch(TalkingActions.receiveMessage(data));
    },
    UpdateFriendList(){
        dispatch(FriendListActions.initialFriendGroup());
        dispatch(FriendListActions.initialFriendList());
    },
    ReceiveNewGroup(){
        dispatch(FriendListActions.initialGroupList());
    }
});

export default connect(mapStateToProps,mapDispatch)(Main);
 