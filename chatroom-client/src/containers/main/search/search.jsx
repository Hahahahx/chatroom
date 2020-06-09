import React,{Component} from "react";
import {connect} from "react-redux";
import {Content, Layout, Nav, ScrollContent} from "../../../components/layout/layout";
import IconBtn from "../../../components/iconbtn/iconbtn";
import {Item,  ItemUserHeader, ItemUserInformation} from "../../../components/useritem/useritem";
import {Avatar, Dropdown, Empty, Icon, Menu} from "antd";
import {Search, SearchInput, SeachIcon, SearchFriend} from "../../../components/search/search";
import {actions} from "./store";
import {actions as DetailActions} from '../userinformation/store';
import {Link} from "react-router-dom";
import {reqGetUserByCondition, reqGetUserByPhone} from "../../../api";
import { Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';


class SearchPage extends Component{

    state = {
        user:null,
        users:[],
        inputValue: '',
    };


    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm =() => {
        const { inputValue } = this.state;
        this.props.addSearch(inputValue);
        this.handleSearch(inputValue);
        this.setState({
            inputValue: '',
        });
    };

    handleSearch =async (condition)=>{
        const responceUser = await reqGetUserByPhone(condition);
        const responceUsers = await  reqGetUserByCondition(condition);
        const user = responceUser.data.data;
        const users = responceUsers.data.data;
        this.setState({user,users});
    };

    forMap = tag => {
        return (
            <span key={tag} style={{ display: 'inline-block',marginBottom:5 }}>
                <Tag closable
                     onClick={e => {e.preventDefault();}}
                     onClose={e => {
                         e.preventDefault();
                         this.props.subSearch(tag);}
                     }
                    style={{ border : 0}}>
                    <span
                        onClick={e => {
                            e.preventDefault();
                            this.handleSearch(tag);}
                        }>
                        {tag}
                    </span>
                </Tag>
            </span>
        );
    };

    handleUser=(user)=>{
        if(user.userPhone === this.props.user.userPhone){
            this.props.history.replace(`/me`)
        }else {
            this.props.setUser(user.userPhone);
            this.props.history.replace(`/user/${user.userPhone}`)
        }
    };

    render() {
        const { user,users , inputValue } = this.state;
        const {historyList} = this.props;
        const tagChild = historyList.map(this.forMap);
        return (
            <div>
                <Layout>
                    <Nav>
                        <Link to={"/list"}>
                            <div className={"nav-icon"}>
                                <IconBtn type={"left"}/>
                            </div>
                        </Link>
                        <div className={"nav-title"}>搜索</div>
                        <div className={"nav-icon"}>
                            <Dropdown overlay={
                                <Menu style={{padding:5}}>
                                    <Menu.Item key="0" >
                                        <Icon type="monitor" style={{padding:10}}/>精确搜索
                                    </Menu.Item>
                                </Menu>
                            } trigger={['click']}>
                                <div style={{marginLeft:10}}>
                                    <IconBtn type={"more"}/>
                                </div>
                            </Dropdown>
                        </div>
                    </Nav>
                    <Content>
                        <div style={{height:55}}></div>

                        <Search>
                            <SearchInput placeholder="账号/昵称"
                                         type="text"
                                         value={inputValue}
                                         onChange={this.handleInputChange}
                                         onPressEnter={this.handleInputConfirm}/>
                            <SeachIcon onClick={this.handleInputConfirm}><IconBtn type={"search"}/></SeachIcon>
                        </Search>


                        <div style={{ marginRight:10,marginLeft:10}}>
                            <div style={{ marginBottom:5}}>
                                <TweenOneGroup
                                    enter={{scale: 0.8,opacity: 0,type: 'from',duration: 100,
                                        onComplete: e => {
                                            e.target.style = '';
                                        },}}
                                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                    appear={false}>
                                    {tagChild}
                                </TweenOneGroup>
                            </div>
                        </div>

                        <ScrollContent>
                            <SearchFriend>——账号——</SearchFriend>
                            {
                                user ===null?<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />:
                                    <Item onClick={this.handleUser.bind(this,user)}>
                                        <ItemUserHeader>
                                            <Avatar src={user.userHeader} size={40} icon="user"/>
                                        </ItemUserHeader>
                                        <ItemUserInformation>
                                            <h5>{user.userNickname}({user.userPhone})</h5>
                                            <p>{user.userDescription}</p>
                                        </ItemUserInformation>
                                    </Item>
                            }
                            <SearchFriend>——昵称——</SearchFriend>
                            {
                                users.length === 0?<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />:
                                    users.map((item,index)=>(
                                        <Link to={`/user/${item.userPhone}`}>
                                            <Item key={index} >
                                                <ItemUserHeader>
                                                    <Avatar src={item.userHeader} size={40} icon="user"/>
                                                </ItemUserHeader>
                                                <ItemUserInformation>
                                                    <h5>{item.userNickname}({item.userPhone})</h5>
                                                    <p>{item.userDescription}</p>
                                                </ItemUserInformation>
                                            </Item>
                                        </Link>
                                    ))
                            }
                        </ScrollContent>


                    </Content>
                </Layout>
            </div>
        );
    }

}

const mapStateToProps=(state)=>({
    user:state.user,
    historyList:state.search,
    friendList:state.friendList,
});

const mapDispatchToProps=(dispatch)=>({
    addSearch(tag){
        dispatch(actions.AddSearch(tag));
    },
    subSearch(tag){
        dispatch(actions.SubSearch(tag));
    },
    setUser(phone){
        dispatch(DetailActions.setUser(phone))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage);