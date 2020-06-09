import React,{Component} from "react";
import {Content, Layout, Nav, NavBar, ScrollContent} from "../../../components/layout/layout";
import IconBtn from "../../../components/iconbtn/iconbtn";
import {Avatar, List, Tree} from "antd";
import {Input} from "../../../components/imput/input";
import {SearchFriend} from "../../../components/search/search";
import {connect} from "react-redux";
import {reqCreateGroup} from "../../../api";
import {actions} from "../userlist/store";
const { TreeNode } = Tree;

class CreateGroup extends Component{

    state = {
        selectedItems: [],
    };

    onCheck = (checkedKeys, info) => {
        this.setState({selectedItems:checkedKeys});
        console.log('onCheck', checkedKeys, info);
    };

    handleCreate=async ()=>{
        let {selectedItems} = this.state;
        let list = selectedItems.filter(item=>(
            item.search("delete-") === -1
        ));
        const data = {
            name:this.groupname.value,
            brief:this.groupbrief.value,
            header:"",
            users:list
        };
        const responce = await reqCreateGroup(data);
        this.props.addGroupList(responce.data.data);
        this.props.history.replace('/list')
    };

    handleBack=()=>{
        this.props.history.replace('/list')
    };

    render() {
        const {friendList,friendGroupList} = this.props;
        return(
            <>
                <Layout>
                    <Content>
                        <div style={{height:50}}></div>
                        <SearchFriend>——群组名称——</SearchFriend>
                        <Input>
                            <input className={"input"} type={"text"} placeholder={"我的群聊"} ref={input=>this.groupname=input}/>
                        </Input>
                        <SearchFriend>——群组描述——</SearchFriend>
                        <Input>
                            <input className={"input"} type={"text"} placeholder={"[没有啥描述]"} ref={input=>this.groupbrief=input}/>
                        </Input>

                        <SearchFriend>——群组人员——</SearchFriend>
                        <ScrollContent>
                            <Tree
                                checkable
                                onCheck={this.onCheck}>
                                {friendGroupList.map((item,index) => (
                                    <TreeNode title={<p style={{width:1000}}>{item.friendGroupName}</p>} key={"delete-"+index}>
                                        {
                                            friendList.map((user,index) =>(
                                                <TreeNode key={user.friendFriendPhone} title={
                                                    <List.Item.Meta
                                                        style={{width:1000}}
                                                        avatar={<Avatar size={25} src={user.userHeader} />}
                                                        title={`${user.friendRemark?user.friendRemark:user.userNickname}(${user.friendFriendPhone})`}
                                                    />
                                                }/>
                                            ))
                                        }
                                    </TreeNode>
                                ))}
                            </Tree>
                            <div style={{height:55}}></div>
                        </ScrollContent>
                    </Content>

                    <Nav>
                        <div className={"nav-icon"} onClick={this.handleBack}><IconBtn type={"left"}/></div>
                        <div className={"nav-title"}>创建群聊</div>
                        <div className={"nav-icon"}><IconBtn type/></div>
                    </Nav>
                    <NavBar onClick={this.handleCreate}>
                        <div className={"nav-icon"}><IconBtn type/></div>
                        <div className={"nav-title"}>创建</div>
                        <div className={"nav-icon"}><IconBtn type/></div>
                    </NavBar>
                </Layout>
            </>
        )
    }
}

const mapStateToProps =(state)=>({
    friendGroupList:state.friendGroupList,
    friendList:state.friendList
})

const mapDispatchToProps =(dispatch)=>({
    addGroupList(data){
        dispatch(actions.addGroupList(data))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CreateGroup) ;