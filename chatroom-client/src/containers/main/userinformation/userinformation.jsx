import React, { Component } from 'react'
import { Button, Modal} from 'antd';
import './userinformation.less'
import IconBtn from "../../../components/iconbtn/iconbtn";
import {connect} from "react-redux";
import {reqGetUserByPhone, reqSendFriendApplication} from "../../../api";
import {Content, Layout, NavBar} from "../../../components/layout/layout";
import {Information} from "./information";
import {actions as TemproryAcitons} from '../temporary/store'


class UserInformation extends Component {
    state = {
        user:{},
        previewVisible:false // 模态框
    };


    handleAdd=()=>{
        this.setState({previewVisible:true})
    };

    handleCancel = () => this.setState({ previewVisible: false });

   /* handleSend=()=>{
        this.handleCancel();
        const {userDetail,currentUser} = this.props;
        this.text.value = "";
        const send={
            touser:userDetail.userPhone,
            data:{isSend:false,userPhone:currentUser.userPhone,userName:currentUser.userNickname,userHeader:currentUser.userHeader,application:this.text.value,status:"wait"}
        };
        const addNewFriend = {isSend:true,userPhone:userDetail.userPhone,userName:userDetail.userNickname,userHeader:userDetail.userHeader,application:this.text.value,status:"等待回应"};
        this.props.addNewfriend(addNewFriend);
        reqSendFriendApplication(send);
    };*/


    handleSend=()=>{
        this.handleCancel();
        const data={
            phone:this.state.user.userPhone,
            content:this.text.value,
        };
        this.text.value = "";
        reqSendFriendApplication(data);

    }

    handleSendMessage=()=>{
        this.props.history.replace(`/talkuser/${this.state.user.userPhone}`);
    }


    async componentDidMount() {
        const phone = this.props.match.params.phone;
        const response  = await reqGetUserByPhone(phone);
        const user = response.data.data;
        this.setState({user});
    }

    setUser=(user)=>{
        this.props.deleteUser();
        this.setState({user});
    }

    render() {

        const {user} = this.state;
            return (
                <Layout>
                    <Content>
                        <Modal visible={this.state.previewVisible} footer={
                            <Button type="primary" onClick={this.handleSend}>
                                发送
                            </Button>
                        } onCancel={this.handleCancel}>
                            <div>
                                <div>好友申请理由：</div>
                                <textarea className="userinformation-text" ref={text=>this.text = text}/>
                            </div>
                        </Modal>
                        <Information setUser={this.setUser} user={user} history={this.props.history}/>
                    </Content>

                    {
                        user.hasOwnProperty("friendId")?
                        <NavBar onClick={this.handleSendMessage}>
                            <div className={"nav-icon"}><IconBtn type/></div>
                            <div className={"nav-title"}>发送消息</div>
                            <div className={"nav-icon"}><IconBtn type/></div>
                        </NavBar>:
                        <NavBar onClick={this.handleAdd}>
                            <div className={"nav-icon"}><IconBtn type/></div>
                            <div className={"nav-title"}>加为好友</div>
                            <div className={"nav-icon"}><IconBtn type/></div>
                        </NavBar>
                    }

                </Layout>

            );
        }
}

const mapStateToProps =(state)=>({
    currentUser:state.user,
    userDetail:state.userDetail.userDetail
});

const mapDispatchToProps =(dispatch)=>({
    deleteUser(user){
        dispatch(TemproryAcitons.InitialList());
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(UserInformation) ;