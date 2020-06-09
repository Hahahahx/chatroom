import React, { Component } from 'react'
import {Icon, Menu, Dropdown, Badge, Tabs, Button} from 'antd';
import IconBtn from '../../../components/iconbtn/iconbtn';
import NavBottom from '../../../components/navbottom/nav';
import GroupList from './grouplist/list';
import "./list.less";
import {connect} from "react-redux";
import {actions} from "./store";
import {Content, Layout, Nav, ScrollContent} from "../../../components/layout/layout";
import {Link} from "react-router-dom";
import QueueAnim from 'rc-queue-anim';

const { TabPane } = Tabs;
class UserList extends Component {

    state={
        isFriend:true,
        click:false
    }

    async componentDidMount() {
        this.props.InitialList()
    }

    render() {
        const {notice} = this.props;
        const {isFriend} = this.state;
        const list = notice.filter(notice=>!notice.noticeRead);
        return (
            <Layout animConfig={[
                { opacity: [1, 0],scale:[1,1.5]}
            ]}>
                <Content key="b">
                    <div style={{height:50}}></div>
                    <Link to={"/notice"}>
                        <div className="user-list-newfriend">
                            <div>
                                <Badge dot={list.length!==0} offset={[5,0]}>通知</Badge>
                            </div>
                            <IconBtn type="right"></IconBtn>
                        </div>
                    </Link>
                    <Tabs defaultActiveKey="1"
                          tabBarExtraContent={
                              this.state.isFriend?
                                  null
                                  :null
                          }
                          onChange={
                              ()=>this.setState({isFriend: !this.state.isFriend})
                          }
                          tabBarStyle={{paddingRight:10}}>
                        <TabPane tab="好友" key="1"/>
                        <TabPane tab="群组" key="2"/>
                    </Tabs>
                    <ScrollContent style={{top:-10}}>
                        <GroupList history={this.props.history} isFriend={isFriend} />
                    </ScrollContent>
                    <div style={{height:55}}></div>
                </Content>

                <Nav key="a">
                    <div className='top-title'>好友列表</div>
                    <div className='top-icon'>

                        <Link to={"/search"}>
                            <div><IconBtn type="search"/></div>
                        </Link>

                        <Dropdown overlay={
                            <Menu style={{padding:5}}>

                                <Menu.Item key="0" >
                                    <Link to={"/group/create"}>
                                        <Icon type="plus-circle" style={{marginRight:10,padding:10}}/>创建群聊
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="1" >
                                    <Link to={"/search"}>
                                        <Icon type="user-add" style={{marginRight:10,padding:10}}/>添加好友
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        } trigger={['click']}>
                            <div style={{marginLeft:10}}>
                                <IconBtn type="plus" />
                            </div>
                        </Dropdown>
                    </div>
                </Nav>

                <NavBottom key="d"/>
            </Layout>
           
         );
    }
}

const mapStateToProps=(state)=>({
    notice:state.notice
})

const mapDispatchToProps=(dispatch)=>({
    InitialList(){
        dispatch(actions.initialFriendGroup());
        dispatch(actions.initialFriendList());
        dispatch(actions.initialGroupList());
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(UserList) ;