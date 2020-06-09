import { combineReducers } from 'redux';
import { loginReducer}  from '../containers/login/store';
import { reducerConnect ,reducerSocket} from '../containers/socketIO/store';
import { registerReducer } from '../containers/register/store';
import {friendGroupListReducer, friendListReducer, groupListReducer} from '../containers/main/userlist/store';
import {searchReducer} from "../containers/main/search/store";
import {UserDetailReducer} from "../containers/main/userinformation/store";
import {TalkingReducer} from "../containers/main/talking/store";
import {TemporaryReducer} from "../containers/main/temporary/store";
import {noticeReducer} from "../containers/main/notice/store";
import {userReducer} from "../containers/main/me/store";

export const SeesionReducer = combineReducers({
  connect:reducerConnect,
  socket:reducerSocket,
  login:loginReducer,
  register:registerReducer,
  groupList:groupListReducer,
  friendGroupList:friendGroupListReducer,
  friendList:friendListReducer,
  notice:noticeReducer,
  search:searchReducer,
  userDetail:UserDetailReducer,
  talking:TalkingReducer,
  temporary:TemporaryReducer,
  user:userReducer,
});

