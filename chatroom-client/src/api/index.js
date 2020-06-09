import ajax from './ajax';
import * as requestTypes from './request-types';


/**
 * 验证码登录接口，POST，若无账号数据库新建一个用户信息，写入手机号
 */
export const reqVerifyLogin =(information)=> ajax('login/verification',information,requestTypes.POST);
/**
 * 密码登录接口，POST
 */
export const reqPasswordLogin =(information)=> ajax('login/password',information,requestTypes.POST);
/**
 * 发送验证码接口，POST
 */
export const reqSendVerifyCode =(phone)=> ajax('sendsms',phone,requestTypes.POST);
/**
 * 注册接口，PUT，在数据库已有手机信息中新建出用户信息
 */
export const reqRegister =(information)=> ajax('register',information,requestTypes.PUT)
/**
 * 获取临时消息列表接口，GET,session取
 */
export const reqGetMessageList =()=> ajax('temporary/list',"",requestTypes.GET);
/**
 * 存储当前临时消息列表接口，PUT
 */
export const reqSetMessageList =(item)=> ajax('temporary/set',item,requestTypes.PUT);
/**
 * 存储当前临时消息列表接口，DELETE
 */
export const reqDeleteTemporary =(id)=> ajax('temporary/delete',id,requestTypes.DELETE);
/**
 * 更新用户,PUT
 */
export const reqUpdateUser =(user)=> ajax("user/set",user,requestTypes.PUT);
/**
 * 获取用户信息接口,GET
 */
export const reqGetUserByPhone =(phone)=> ajax("user",phone,requestTypes.GET);
/**
 * 设置用户背景图片接口,PUT
 */
export const reqSetUserBackground =(index)=>ajax("user/set/background",index,requestTypes.PUT);
/**
 * 获取用户信息列表接口,GET
 */
export const reqGetUserByCondition =(condition)=> ajax("user/list",condition,requestTypes.GET);
/**
 * 发送好友申请接口,PATCH
 */
export const reqSendFriendApplication =(application)=>ajax("friend/application",application,requestTypes.PATCH);
/**
 * 添加好友接口,POST
 */
export const reqAddFriend =(phone)=>ajax("friend/add",phone,requestTypes.POST);
/**
 * 删除好友接口,DELETE
 */
export const reqDeleteFriend =(phone)=>ajax("friend/delete",phone,requestTypes.DELETE);
/**
 * 增加或者修改备注接口,PUT
 */
export const reqSetRemarkname =(information)=>ajax( "friend/remark",information,requestTypes.PUT);
/**
 * 修改好友分组接口,PUT
 */
export const reqSetFriendGroup =(information)=>ajax("friend/set/group",information,requestTypes.PUT);

/**
 * 获取当前用户好友列表接口，GET
 */
export const reqGetFriendList =()=> ajax("friend/list","",requestTypes.GET);


/**
 * 获取分组列表,GET
 */
export const reqGetFriendGroupList =()=>ajax("friend/get/group","",requestTypes.GET);


//————————————————————————————————————————————————————————notice

/**
 * 询问是否有消息堆积，GET
 */
export const reqAskNotice =()=> ajax('notice/ask',"",requestTypes.GET);
/**
 * 获取好友申请列表接口，GET,session取
 */
export const reqGetNotice =()=> ajax('notice/list',"",requestTypes.GET);
/**
 * 处理好友申请接口，PUT
 */
export const reqHandleApplication =(data)=> ajax('notice/handle/application',data,requestTypes.PUT);
/**
 * 删除某一条通知接口，GET
 */
export const reqDeleteNotice =(id)=> ajax('notice/delete',id,requestTypes.GET);
/**
 * 清空所有通知接口，GET,session取
 */
export const reqEmptyNotice =()=> ajax('notice/empty',"",requestTypes.GET);
/**
 * 标记全部通知为已读，GET
 */
export const reqReadNotice =()=> ajax('notice/read',"",requestTypes.GET);




//——————————————————————————————————————————————————————————report

/**
 * 举报用户接口,POST
 */
export const reqReportToUser =(data)=>ajax("report/add",data,requestTypes.POST);
/**
 * 举报信息接口,GET
 */
export const reqGetReport =(id)=>ajax("report",id,requestTypes.GET);




//————————————————————————————————————————————————群聊


/**
 * 创建群聊,POST
 * */
export const reqCreateGroup =(data)=> ajax("group/create",data,requestTypes.POST);
/**
 * 获取群组信息,GET
 * */
export const reqGetGroup =(id)=>ajax("group",id,requestTypes.GET);
/**
 * 更新群聊信息,PUT
 * */
export const reqSetGroup =(group)=>ajax("group/set",group,requestTypes.PUT);
/**
 * 获取用户群组列表,GET
 * */
export const reqGetGroupList =()=>ajax("group/list","",requestTypes.GET);
/**
 * 添加成员接口,PUT
 * */
export const reqAddGroupList =(data)=>ajax("group/add",data,requestTypes.PUT);
/**
 * 退出群聊接口,PUT
 * */
export const reqQuitGroup =(id)=>ajax("group/quit",id,requestTypes.GET);
/**
 * 解散群聊接口,PUT
 * */
export const reqDissolveGroup =(id)=>ajax("group/quit",id,requestTypes.GET);



