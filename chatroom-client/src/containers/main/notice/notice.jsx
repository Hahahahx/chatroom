import React, { Component } from 'react'
import {connect} from "react-redux";
import {Content, Layout, Nav, ScrollContent} from "../../../components/layout/layout";
import IconBtn from "../../../components/iconbtn/iconbtn";
import {Item , ItemOperator , ItemUserHeader, ItemUserInformation} from "../../../components/useritem/useritem";
import {Avatar, Button, Empty, Icon, Modal} from "antd";
import {actions } from './store'
import {
    reqAddFriend,
    reqHandleApplication,
    reqEmptyNotice,
    reqDeleteNotice, reqReadNotice
} from "../../../api";
import QueueAnim from 'rc-queue-anim';
import moment from "moment";

class Notice extends Component {

    state = {
        Visible: false,
    };

    handleBack=()=>{
        this.props.history.goBack()
    };

    handleAccept=async (data)=>{
        const response =await reqHandleApplication({user:data.noticeFrom,status:1});
        const notice = response.data.data;
        this.props.update(notice);

    };

    handleReject=async (data)=>{
        const response =await reqHandleApplication({user:data.noticeFrom,status:2});
        const notice = response.data.data;
        this.props.update(notice);

    };

    handleStatus=(item)=>{
        switch (parseInt(item.noticeStatus)) {
            case -1:
                return (<div>等待响应中..</div>);
            case 0:
                return (
                    <Button.Group >
                        <Button type="danger" onClick={this.handleReject.bind(this,item)}>
                            拒绝
                            <Icon type="close" />
                        </Button>
                        <Button type="primary" onClick={this.handleAccept.bind(this,item)}>
                            <Icon type="check" />
                            接收
                        </Button>
                    </Button.Group>
                );
            case 1:
                return (<div>已同意</div>);
            case 2:
                return (<div>已拒绝</div>);
        }
    }

    async componentDidMount() {
        const response = await reqReadNotice();
        if(response.data.ok){
            this.props.initial();
        }
    }

    async componentWillUnmount() {
        const response = await reqReadNotice();
        if(response.data.ok){
            this.props.initial();
        }
    }

    onTouchStart=(item)=> {
        const {deleteNotice} = this.props;
        this.timeOutEvent = setTimeout(()=> {
            this.timeOutEvent = 0;
            Modal.confirm({
                centered:true,
                title: '确定删除该信息吗',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                async onOk(){
                    const response = await reqDeleteNotice(item.noticeId);
                    if(response.data.ok){
                        deleteNotice(item.noticeId);
                        Modal.destroyAll();
                    }
                }
            });
        }, 400);
    }

    onTouchMove=()=> {
        clearTimeout(this.timeOutEvent);
        this.timeOutEvent = 0;
    }

    onTouchEnd=()=> {
        clearTimeout(this.timeOutEvent);
        if (this.timeOutEvent != 0) {

            console.log('你点击了');
        }
        return false;
    }

    handleEmpty=()=>{
        const {empty} = this.props;
        Modal.confirm({
            centered:true,
            title: '确定清空全部通知吗',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            async onOk() {
                const response = await reqEmptyNotice();
                if(response.data.ok){
                    empty();
                }
            },
            onCancel(){}
        });
    }

    render() {
        const {notice} = this.props;
        return (
            <>
                <Layout animConfig={[
                    { opacity: [1, 0],scale:[1,1.5]}
                ]}>
                    <Content key="b">
                        <ScrollContent>
                            <div style={{height:50}}></div>
                            <QueueAnim delay={300}
                                       animConfig={[
                                           { opacity: [1, 0], translateY: [0, 30] }
                                       ]}>
                                {
                                    notice!==0?notice.map((item,index)=>(
                                        <Item key={index} onTouchStart={this.onTouchStart.bind(this,item)} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>

                                            <ItemUserHeader>
                                                <Avatar src={item.userHeader} size={40} icon="user"/>
                                            </ItemUserHeader>
                                            <ItemUserInformation>
                                                <h5>{item.userNickname}</h5>
                                                <span>
                                                    {moment(item.noticeCreatetime).format('YY.MM.DD HH:mm')}
                                                    ：
                                                    {item.noticeContent}
                                                </span>
                                            </ItemUserInformation>
                                            <ItemOperator>
                                                {this.handleStatus(item)}
                                            </ItemOperator>
                                        </Item>
                                    )):<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                }
                            </QueueAnim>
                        </ScrollContent>
                    </Content>
                    <Nav key="a">
                        <div className={"nav-icon"} onClick={this.handleBack}><IconBtn type={"left"}/></div>
                        <div className={"nav-title"}>通知</div>
                        <div className={"nav-icon"} onClick={this.handleEmpty}><IconBtn type={"delete"}/></div>
                    </Nav>
                </Layout>
            </>
        );
    }
}

const mapStateToProps =(state)=>({
    currentUser:state.user,
    notice:state.notice
});

const mapDispatchToProps =(dispatch)=>({
    initial(){
        dispatch(actions.InitialNotice());
    },
    update(notice){
        dispatch(actions.UpdateNotice(notice))
    },
    deleteNotice(id){
        dispatch(actions.DeleteNotice(id));
    },
    empty(){
        dispatch(actions.EmptyNotice())
    },
    read(){

    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Notice) ;