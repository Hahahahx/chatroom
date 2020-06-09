import React, { Component } from 'react';
import UserItem from '../../../components/useritem/item';
import NavBottom from '../../../components/navbottom/nav';
import IconBtn from '../../../components/iconbtn/iconbtn';
import { connect } from 'react-redux';
import {actions} from "./store";
import {Empty, Popconfirm, message, Spin, Modal} from "antd";
import QueueAnim from 'rc-queue-anim';
import {Layout, Nav, ScrollContent} from "../../../components/layout/layout";
import {Link} from "react-router-dom";
import {reqAskNotice, reqDeleteNotice, reqDeleteTemporary} from "../../../api";
import {actions as TalkingActions} from '../talking/store'
import {Item} from "../../../components/useritem/useritem";


class Temporary extends Component {

    state={
        loading:false
    }

    handleSearch=()=>{
        this.props.history.replace('/search');
    }

    async componentDidMount() {
        this.props.Initial()
        const response = await reqAskNotice();
        if(response.data){
            this.setState({loading:false});
        }
    }


    onTouchStart=(item)=> {
        const {Initial} = this.props;
        this.timeOutEvent = setTimeout(()=> {
            this.timeOutEvent = 0;
            Modal.confirm({
                centered:true,
                title: '确定删除该信息吗',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                async onOk(){
                    const response = await reqDeleteTemporary(item.temporaryId);
                    if(response.data.ok){
                        Initial();
                        Modal.destroyAll();
                    }
                }
            });
        }, 400);
    }


    render() {

        const {SetEmpty,temporary,friendList,groupList,talking} = this.props;
        function handleEmpty(){
            message.success("成功清空未读信息");
            SetEmpty();
        }
        let count = 0;
        for(var i =0 ;i<talking.length;i++){
            count=count+parseInt(talking[i].unread);
        }

        if(this.state.loading){
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
            )
        }else {
            return (
                <Layout animConfig={[
                    { opacity: [1, 0],scale:[1,1.5]}
                ]}>
                    <ScrollContent className="demo-tbody" key="b">
                        <div style={{height:50}}></div>
                        <QueueAnim delay={300}
                                   animConfig={[
                                       { opacity: [1, 0], translateY: [0, 20] }
                                   ]}>
                            {
                                temporary?temporary.map((item,index)=>{
                                    if(!item.temporaryGroup){
                                        let talk =talking.filter(talk => talk.touser == item.temporaryFrom);
                                        const unread = talk.length!==0?talk[0].unread:0;
                                        const description = talk.length!==0?
                                            talk[0].talkingList[talk[0].talkingList.length-1].typeIsImage != false?"[图片]":talk[0].talkingList[talk[0].talkingList.length-1].message
                                            :null;
                                        return (
                                            <div key={index}  onTouchStart={this.onTouchStart.bind(this,item)} >
                                                <Link to={`/talkuser/${item.information.userPhone}`}>
                                                    <UserItem
                                                        avatar={item.information.userHeader}
                                                        name={item.information.friendRemark?item.information.friendRemark:item.information.userNickname}
                                                        description={description}
                                                        unread = {unread}
                                                    />
                                                </Link>
                                            </div>
                                        )
                                    }else {
                                        let talk =talking.filter(talk => talk.touser == item.temporaryFrom);
                                        const unread = talk.length!==0?talk[0].unread:0;
                                        const description = talk.length!==0?
                                            talk[0].talkingList[talk[0].talkingList.length-1].typeIsImage != false?"[图片]":talk[0].talkingList[talk[0].talkingList.length-1].message
                                            :null;
                                        return (
                                            <div key={index}  onTouchStart={this.onTouchStart.bind(this,item)} >
                                                <Link to={`/group/talk/${item.information.groupId}`}>
                                                    <UserItem
                                                        avatar={item.information.groupHeader}
                                                        name={item.information.groupName}
                                                        description={null}
                                                        unread = {unread}
                                                        description = {description}
                                                    />
                                                </Link>
                                            </div>
                                        )
                                    }
                                }):<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            }
                        </QueueAnim>
                        <div style={{height:55}}></div>
                    </ScrollContent>
                    <Nav key="a">
                        <div className='top-title'>
                            消息
                            <span className='message-top-title-unread' onClick={this.handleEmpty}>
                            <Popconfirm
                                placement="bottomLeft"
                                title={"是否要清空未读消息？"}
                                onConfirm={handleEmpty}
                                okText="确认清空"
                                cancelText="我点错了"
                            >({count})</Popconfirm>
                        </span>
                        </div>

                        <Link to={`/search`}>
                            <div className='top-icon' onClick={this.handleSearch}>
                                <IconBtn type='search'/>
                            </div>
                        </Link>
                    </Nav>
                    <NavBottom key="c"/>
                </Layout>

            );
        }
    }
}

const mapStateToProps = (state)=>({
    temporary:state.temporary,
    friendList:state.friendList,
    groupList:state.groupList,
    talking:state.talking
})
const mapDispatchToProps = (dispatch)=>({
    Initial(){
        dispatch(actions.InitialList());
    },
    SetEmpty(){
        dispatch(TalkingActions.SetEmpty());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Temporary)