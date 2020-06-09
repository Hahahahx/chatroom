import React, { Component } from 'react'
import {Modal, Icon, Button, Dropdown, Menu, Spin, Empty, Divider, message} from 'antd';
import './talking.less'
import IconBtn from '../../../components/iconbtn/iconbtn';
import TalkingBox from '../../../components/talkingbox/talkingbox';
import moment from 'moment';
import {connect} from "react-redux";
import {actions as SoketIOActions} from "../../socketIO/store";
import {actions} from "./store";
import {reqGetGroup, reqSetMessageList} from "../../../api";
import {Link} from "react-router-dom";
import {Content, Layout, Nav, ScrollContent} from "../../../components/layout/layout";
import QueueAnim from 'rc-queue-anim';


function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


class GroupTalking extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        group:null
      };
    
      handleCancel = () => this.setState({ previewVisible: false });
    
      handlePreview = async file => {
        if (!file.files || !file.files[0]){
            return;
        }
          const isJpgOrPng = file.files[0].type === 'image/jpeg' || file.files[0].type === 'image/png';
          if (!isJpgOrPng) {
              message.error('你只能上传JPG/PNG文件!');
              return ;
          }
          const isLt2M = file.files[0].size / 1024 / 1024 < 2;
          if (!isLt2M) {
              message.error('图片大小应该小于2M');
              return ;
          }

          file.preview = await getBase64(file.files[0]);
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
    
      handleUpload=()=>{
        this.file.click();
      }

      handleHasFile= evnet =>{
        this.handlePreview(evnet.target)
      }

      sendMessage=()=>{
          const phone =this.props.match.params.group;
          const {currentUser,SendMessage,addMyMesageToList} = this.props;
          const data = {
              "group":true,
              "sendTime":moment().format("YYYY-MM-DD h:mm:ss"),
              "from":this.state.group.group.groupId,
              "user":currentUser.userPhone,
              "typeIsImage":false,
              "message":this.message.textContent
          };

          this.message.innerHTML = "";
          SendMessage({"touser":phone,"data":data});
      };


      sendImage=()=>{
          const phone =this.props.match.params.group;
          const {currentUser,SendMessage} = this.props;
          let {previewImage} = this.state;
          const data = {
              "group":true,
              "sendTime":moment().format("YYYY-MM-DD h:mm:ss"),
              "from":this.state.group.group.groupId,
              "user":currentUser.userPhone,
              "typeIsImage":true,
              "message":previewImage
          };

          SendMessage({"touser":phone,"data":data});
          this.setState({
              previewVisible: false,
          });
      }


    async componentDidMount() {
        const responce =  await reqGetGroup(this.props.match.params.group);
        const group = responce.data.data;
        if(group === undefined || group === null){
            message.error("该群聊已不存在");
            this.props.history.replace("/");
        }else {
            this.setState({group});
        }
    }

    goback=()=>{
        this.props.setUnread(this.props.match.params.group);
        this.props.history.goBack();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const ele = this.scroll;

        if(ele){
            ele.scrollTop=ele.scrollHeight;
            let i = ele.scrollTop
            setInterval(()=>{
                if(i<=ele.scrollHeight){
                    i++;
                    ele.scrollTo(0, i);
                }
            },1)
            // while (ele.scrollTop != ele.scrollTopMax){
            //     ele.scrollTop ++;
            // }
        }
    }
    toEnd=()=>{
        const ele = this.scroll;
        if(ele){
            let i = ele.scrollTop
            console.log(ele.scrollTop)
            console.log(ele.scrollHeight)
            setInterval(()=>{
                if(i<=ele.scrollHeight){
                    i=i+(ele.scrollHeight-ele.scrollTop)/100+5;
                    ele.scrollTo(0, i);
                }
            },10)
            // while (ele.scrollTop != ele.scrollTopMax){
            //     ele.scrollTop ++;
            // }
        }
    }


    render() {
          const { currentUser,talkingTo } = this.props;
        const { previewVisible, previewImage ,group} = this.state;
        let list = talkingTo.filter((item)=>{
            return parseInt(item.touser) === parseInt(this.props.match.params.group);
        });

        if(list.length !== 0){
            list  = list[0].talkingList;
        }
        if(group){
            const groupData = group.group;
            const groupList = group.groupList;
            return (
                <Layout>
                    <Content>
                        <ScrollContent id={"scroll"} className={'talking-content'} ref={scroll=>this.scroll=scroll}>
                            <div style={{height:50}}></div>
                            {groupData.groupStatus === -1?
                                <div style={{textAlign:"center",padding:20}}>
                                    <p style={{background:'rgba(0,0,0,0.7)',color:"white",padding:10,borderRadius:5}}>该群因发布违规言论已被限制禁止用户发言！请自觉遵守网络文明！</p>
                                </div>
                                :null}
                            {/*<Divider style={{opacity:0.8,color:"rgba(0,0,90,0.8)"}}>
                                <Icon type="file-sync" /><Divider type="vertical" /><small>查看更多</small>
                            </Divider>*/}
                                {list.map(
                                    (item,index)=>{
                                        let user = groupList.filter(user => item.user == user.userPhone)[0];
                                        return <TalkingBox key={index}
                                                           header={user.userHeader}
                                                           username={user.groupListUserRemark?user.groupListUserRemark:user.userNickname}
                                                           isRight={item.user === currentUser.userPhone}
                                                           time={moment(item.sendTime).format("mm:ss")}
                                                           message={item.typeIsImage?<img src={item.message} alt="图片消息"/>:item.message}/>
                                    }
                                )}
                                <QueueAnim delay={300} animConfig={[
                                    { opacity: [1, 0], translateY: [0, 10],scale:[1.2,0.8] }
                                ]}>
                                    <div style={{position:"absolute",bottom:109,right:50}} key={1}>
                                        <Button onClick={this.toEnd} style={{background:"rgba(0,0,10,.5)",color:"white"}} icon="download" size={"large"} shape="circle" />
                                    </div>
                                </QueueAnim>
                                <div style={{height:155}}></div>
                            <div style={{height:55}}></div>
                        </ScrollContent>
                    </Content>

                    <Nav>
                        <div className='talk-top-icon' onClick={this.goback}>
                            <IconBtn type="left" />
                        </div>
                        <div className='talk-top-title'>
                            {groupData.groupName}({groupList.length})
                        </div>
                        <div className='talk-top-icon'>
                            <Dropdown overlay={
                                <Menu style={{padding:5}}>
                                    <Menu.Item key="0">
                                        <Link to={`/group/detail/${groupData.groupId}`}>
                                            <Icon type="solution" style={{marginRight:10,padding:10}}/>查看信息
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="1">
                                        <Link to={`/group/report/${groupData.groupId}`}>
                                            <Icon type="info-circle" style={{marginRight:10,padding:10}}/>举报该群
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            } trigger={['click']}>
                                <div style={{marginLeft:10}}>
                                    <IconBtn type="more" />
                                </div>
                            </Dropdown>
                        </div>
                    </Nav>

                    <div className="talk-bottom-input">
                        <div className="talk-input">
                            <div className="talk-send-image">
                                <div onClick={this.handleUpload}>
                                    <input type="file" style={{display:"none"}} onChange={this.handleHasFile} ref={input=>this.file=input} accept='image/*'/>
                                    <IconBtn theme="filled" type="file-image"/>
                                </div>
                                <Modal visible={previewVisible} footer={[
                                    <Button type="primary" onClick={this.sendImage}>
                                        发送
                                    </Button>,
                                ]} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                            <div contentEditable="true" className="talk-send-text" ref={message=>this.message=message}>

                            </div>
                            <div className="talk-send-button" onClick={this.sendMessage}>
                                <button>发送</button>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
        }else {
            return (
                <Layout>
                    <ScrollContent>
                        <Empty
                            image={
                                <Spin size="large" style={{margin:"auto"}}/>}
                            imageStyle={{
                                height: 60,
                            }}
                            style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}
                            description={
                                <span>
                                    加载中
                                  </span>
                                                        }
                        />
                    </ScrollContent>
                </Layout>
            );
        }

    }
}


const mapStateToProps=(state)=>({
    currentUser:state.user,
    talkingTo : state.talking
});

const mapDispatchToProps=(dispatch)=>({
    SendMessage(data){
       dispatch( SoketIOActions.SendMsgGroup(data));
    },
    setUnread(phone){
        dispatch(actions.SetRead(phone));
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(GroupTalking) ;