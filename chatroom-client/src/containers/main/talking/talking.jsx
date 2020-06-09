import React, { Component } from 'react'
import {Modal, Icon, Button, Dropdown, Menu, Spin, Empty, message} from 'antd';
import './talking.less'
import IconBtn from '../../../components/iconbtn/iconbtn';
import TalkingBox from '../../../components/talkingbox/talkingbox';
import moment from 'moment';
import {connect} from "react-redux";
import {actions as SoketIOActions} from "../../socketIO/store";
import {actions as TemporaryActions} from '../temporary/store';
import {actions} from "./store";
import { reqGetUserByPhone, reqSetMessageList} from "../../../api";
import {Link} from "react-router-dom";
import {Content, Layout, Nav, ScrollContent} from "../../../components/layout/layout";
import QueueAnim from 'rc-queue-anim';
import {Base64} from "../../../utils/base";


function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


class Talking extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        user:null,
        scrollCount:0
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
          const phone =this.props.match.params.phone;
          const {currentUser,SendMessage,addMyMesageToList} = this.props;
          const data = {
              "group":false,
              "sendTime":moment().format("YYYY-MM-DD h:mm:ss"),
              "from":currentUser.userPhone,
              "typeIsImage":false,
              "message":this.message.textContent
          };

          this.message.innerHTML = "";
          addMyMesageToList(parseInt(phone),data);
          SendMessage({"touser":phone,"data":data});
      };


      sendImage=()=>{
          const phone =this.props.match.params.phone;
          const {currentUser,SendMessage,addMyMesageToList} = this.props;
          let {previewImage} = this.state;

          const data = {
              "group":false,
              "sendTime":moment().format("YYYY-MM-DD h:mm:ss"),
              "from":currentUser.userPhone,
              "typeIsImage":true,
              "message":previewImage
          };

          addMyMesageToList(parseInt(phone),data);
          SendMessage({"touser":phone,"data":data});
          this.setState({
              previewVisible: false,
          });
      }


    async componentDidMount() {
        const responce =  await reqGetUserByPhone(this.props.match.params.phone);
        const user = responce.data.data;
        if(user.friendId===undefined){
            message.error("对方不是你的好友！");
            this.props.updateTemporary();
            this.props.history.replace("/list");
        }else {
            this.setState({user});
            reqSetMessageList({from:user.userPhone,group:false,});
        }
    }
    goback=()=>{
        this.props.setUnread(this.props.match.params.phone);
        this.props.history.replace("/");
    }

    importTalkingMsg=()=>{
          const {exportFile,currentUser} = this.props;
          const {user} = this.state;
        var selectedFile = this.files.files[0];//获取读取的File对象
        var name = selectedFile.name;//读取选中文件的文件名
        var size = selectedFile.size;//读取选中文件的大小
        const filename=name.split(".");
        const fileExtension = filename[filename.length-1];
        console.log("文件名:"+name+"后缀名"+fileExtension+"大小："+size);
        if(fileExtension!="rh"){
            message.error("文件有误，非.rh记录文件！");
            return false;
        }
        var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile);//读取文件的内容
        let md5 = require("md5");
        const correctName = md5(user.userPhone+currentUser.userPhone);
        reader.onload = function(){
            let base64 = Base64.decode(this.result);//解密
            let json = JSON.parse(base64);
            const verifyName = json.splice(0,1)[0];
            if(verifyName !== correctName){
                message.error("文件有误，不是与该用户的记录！")
                return false;
            }
            exportFile(user.userPhone,json);
        };

    }

    exportTalkingMsg=(list)=>{
        let md5 = require("md5");
        let FileSaver = require('file-saver');
        const name = md5(this.state.user.userPhone+this.props.currentUser.userPhone);
        list.unshift(name);
        const StringList = JSON.stringify(list);
        const base64File = Base64.encode(StringList);
        console.log(name,base64File);
        const file = new File([base64File],name+".rh",{type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);
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
        }
    }


    render() {
          const { currentUser,talkingTo } = this.props;
        const { previewVisible, previewImage ,user} = this.state;
        let list = talkingTo.filter((item)=>{
            return parseInt(item.touser) === parseInt(this.props.match.params.phone);
        });

        if(list.length !== 0){
            list  = list[0].talkingList;
        }
        if(user){
            return (
                <Layout>

                    <Content>
                        <ScrollContent className={'talking-content'} ref={scroll=>this.scroll=scroll}>
                            <div style={{height:55}} ></div>

                            {currentUser.userStatus === -1?
                                <div style={{textAlign:"center",padding:20}}>
                                    <p style={{background:'rgba(0,0,0,0.7)',color:"white",padding:10,borderRadius:5}}>您因发布违规言论已被限制发言，对方不会接收到你任何消息！请自觉遵守网络文明！</p>
                                </div>
                                :null}
                                {list.map(
                                    (item,index)=>{
                                        return <TalkingBox key={index}
                                                           isRight={item.from === currentUser.userPhone}
                                                           header={item.from === currentUser.userPhone?currentUser.userHeader:user.userHeader}
                                                           time={moment(item.sendTime).format("mm:ss")}
                                                           message={item.typeIsImage?<img src={item.message} alt="图片消息"/>:item.message}
                                        />
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
                        </ScrollContent>
                    </Content>

                    <Nav style={{position:"absolute",top:0}}>
                        <div className='talk-top-icon' onClick={this.goback}>
                            <IconBtn type="left" />
                        </div>
                        <div className='talk-top-title'>
                            {user.friendRemark?user.friendRemark:user.userNickname}
                        </div>
                        <div className='talk-top-icon'>
                            <Dropdown overlay={
                                <Menu style={{padding:5}}>
                                    <Menu.Item key="0">
                                        <Link to={`/user/${user.userPhone}`}>
                                            <Icon type="solution" style={{marginRight:10,padding:10}}/>查看信息
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="1">
                                        <Link to={`/reportuser/${user.userPhone}`}>
                                            <Icon type="info-circle" style={{marginRight:10,padding:10}}/>举报用户
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="2" onClick={this.exportTalkingMsg.bind(this,list)}>
                                        <Icon type="file-protect" style={{marginRight:10,padding:10}}/>导出记录
                                    </Menu.Item>
                                    <Menu.Item key="3" onClick={()=>{this.files.click()}}>
                                        <input type="file" style={{display:"none"}} onChange={this.importTalkingMsg} ref={input=>this.files=input} />
                                        <Icon type="file-search" style={{marginRight:10,padding:10}}/>导入记录
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
       dispatch( SoketIOActions.SendMsg(data));
    },
    addMyMesageToList(phone,data){
        dispatch(actions.addMyMesageToList(phone,data));
    },
    setUnread(phone){
        dispatch(actions.SetRead(phone));
    },
    exportFile(phone,data){
        dispatch(actions.exportFile(phone,data))
    },
    updateTemporary(){
        dispatch(TemporaryActions.InitialList())
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(Talking) ;