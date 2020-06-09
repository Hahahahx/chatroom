package com.ux.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.ux.mapper.entity.ChatroomFriend;
import com.ux.mapper.entity.ChatroomGroupList;
import com.ux.mapper.entity.DTO.FriendDTO;
import com.ux.service.FriendService;
import com.ux.service.GroupService;
import com.ux.service.SocketIOService;
import com.ux.service.UserService;
import com.ux.service.enumerate.MsgEnum;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service(value = "soketIOService")
public class SocketIOServiceImpl implements SocketIOService {

    //创建一个并发容器用来存已连接的客户端
    private static Map<String, SocketIOClient> clientMap= new ConcurrentHashMap<>();

    @Resource
    private SocketIOServer socketIOServer;
    @Resource
    private RedisTemplate<String,Object> redisTemplate;
    @Resource
    private FriendService friendService;
    @Resource
    private UserService userService;
    @Resource
    private GroupService groupService;

    /**
     * spring IOC容器创建以后，在加载socketIOSserviceImpl Bean之后启动
     * @throws Exception
     */
    @PostConstruct
    private void autoStartup() throws  Exception{
        start();
    }

    /**
     * Spring Ioc容器在销毁SocketIOServiceImpl Bean之前关闭，避免重复项目服务端口占用的问题
     * @throws Exception
     */
    @PreDestroy
    private void autoStop() throws Exception{
        stop();
    }

    @Override
    public void start() throws Exception {
        //监听客户端连接
        socketIOServer.addConnectListener(client -> {
            String loginUserPhone = getParamsByClient(client);
            if(loginUserPhone != null){
                clientMap.put(loginUserPhone,client);
                System.out.println("用户："+loginUserPhone+"————安排上了");
                System.out.println("当前在线人数："+clientMap.size());
            }
        });

        //监听客户端断开连接
        socketIOServer.addDisconnectListener(client->{
            String loginUserPhone = getParamsByClient(client);
            if(loginUserPhone != null){
                clientMap.remove(loginUserPhone);
                System.out.println("用户："+loginUserPhone+"————溜了溜了");
                System.out.println("当前在线人数："+clientMap.size());
                client.disconnect();
            }
        });

        socketIOServer.addEventListener(SEND_MSG, JSONObject.class,(client, jsonData, ackSender)->{
            JSONObject data = jsonData.getJSONObject("data");
            String phone = data.getString("from");
            String firend = jsonData.getString("touser");
            if(userService.getUserByPhone(phone).getUserStatus() == 0){
                if(friendService.getFriend(phone,firend)!= null){
                    pushMessageToUser(MsgEnum.RECEIVE_MSG,firend, String.valueOf(data));
                }
            }else{
                pushMessageToDelete("您的账号已被限制，对方不会接受到您的消息",phone);
            }
        });



        socketIOServer.addEventListener(SEND_GROUP, JSONObject.class,(client, jsonData, ackSender)->{
            System.out.println(jsonData);
            JSONObject data = jsonData.getJSONObject("data");
            String phone = data.getString("user");
            if(userService.getUserByPhone(phone).getUserStatus() == 0) {
                if(groupService.get(jsonData.getInteger("touser")).getGroup().getGroupStatus() == 0){
                    ChatroomGroupList groupList = new ChatroomGroupList();
                    Wrapper<ChatroomGroupList> wrapper = new QueryWrapper<ChatroomGroupList>()
                            .eq("group_list_groupid", jsonData.getString("touser"));
                    for (ChatroomGroupList i : groupList.selectList(wrapper)) {
                        System.out.println(i.getGroupListUserPhone());
                        pushMessageToUser(MsgEnum.RECEIVE_MSG, i.getGroupListUserPhone(), String.valueOf(data));
                    }
                }else {
                    pushMessageToDelete("该群已被限制发言！",phone);
                }
            }else {
                pushMessageToDelete("您的账号已被限制，对方不会接受到您的消息",phone);
            }
        });

        socketIOServer.start();
    }
    @Override
    public void stop() {
        if(socketIOServer != null){
            socketIOServer.stop();
            socketIOServer = null;
        }
    }

    @Override
    public int pushNewMessage(String phone){
        SocketIOClient client = clientMap.get(phone);
        int i =0;
        while (redisTemplate.opsForList().size(phone)!=null && redisTemplate.opsForList().size(phone)!=0){
            JSONObject map = ((JSONObject) redisTemplate.opsForList().leftPop(phone));
            JSONObject mapJson= map.getJSONObject("content");
            if(friendService.getFriend(phone,mapJson.getString("from")) != null){
                System.out.println("向客户端发送消息："+map.get("content").toString());
                client.sendEvent(map.get("type").toString(),map.get("content").toString());
            }
            i++;
        }
        return i;
    }

    @Override
    public void pushMessageToUser(MsgEnum msgEnum,String touser, Object sendMsg) {
        System.out.println(msgEnum.toString()+"向客户端："+touser+"发送消息："+sendMsg);
        if(StringUtils.isNotEmpty(touser)){
            SocketIOClient client = clientMap.get(touser);
            if(client != null){
                client.sendEvent(msgEnum.toString(),sendMsg);
            }else {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("type",msgEnum.toString());
                jsonObject.put("content",sendMsg);
                redisTemplate.opsForList().rightPush(touser,jsonObject);
            }
        }
    }

    @Override
    public void pushMessageToDelete(String msg,String touser) {
        if(StringUtils.isNotEmpty(touser)){
            SocketIOClient client = clientMap.get(touser);
            if(client != null){
                client.sendEvent(MsgEnum.DELETE.toString(),msg);
            }
        }
    }


    /**
     * 此方法为获取client连接中的参数，可根据需求更改
     * @param client
     * @return
     */
    private String getParamsByClient(SocketIOClient client) {
        //从请求的连接中拿出参数（这里的loginUserPhone必须是唯一标识）
        Map<String, List<String>> params  = client.getHandshakeData().getUrlParams();
        List<String> list = params.get("loginUserPhone");
        if(list != null && list.size()>0){
            return list.get(0);
        }
        return null;
    }



}
