import React,{Component} from "react";
import {Content, Layout, Nav, NavBar, ScrollContent} from "../../../components/layout/layout";
import {Avatar, Button, Card, Empty, Icon, List, message, Modal, Spin, Tabs, Tree, Upload} from "antd";
import back from '../../../assets/img/background-1.jpg';
import IconBtn from "../../../components/iconbtn/iconbtn";
import {reqAddGroupList, reqDissolveGroup, reqGetGroup, reqQuitGroup, reqSetMessageList} from "../../../api";
import moment from "moment";
import {Link} from "react-router-dom";
import UserItem from "../../../components/useritem/item";
import {connect} from "react-redux";
import {actions} from "../userlist/store";
import {actions as TemporaryActions} from "../temporary/store";
const { Meta } = Card;
const { TabPane } = Tabs;
const { TreeNode } = Tree;
const { confirm } = Modal;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('你只能上传JPG/PNG文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小应该小于2M');
    }
    return isJpgOrPng && isLt2M;
}

class GroupDetail extends Component{

    state={
        selectedItems: [],
        group:null,
        isList:false,
        visible:false
    }

    async componentDidMount() {
        const responce =  await reqGetGroup(this.props.match.params.group);
        const group = responce.data.data;
        console.log("好友是：",group);
        this.setState({group});
        reqSetMessageList({from:group.group.groupId,group:true,});
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    onCheck = (checkedKeys, info) => {
        this.setState({selectedItems:checkedKeys});
        console.log('onCheck', checkedKeys, info);
    };

    handleOk = async e => {
        let {selectedItems,group} = this.state;
        let list = selectedItems.filter(item=>(
            item.search("delete-") === -1
        ));

        if(list.length>0){
            const data = {group:group.group.groupId,list:list};
            console.log(data)
            const response = await reqAddGroupList(data);
            if(response.data.ok){
                message.success("成功邀请好友入伙");
                this.setState({group: response.data.data});
            }
        }else {
            message.info("未选择好友")
        }

        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel2 = () => this.setState({ previewVisible: false });

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
        const group = info.file.response.data;
        this.props.updateGroup();
        this.setState({group})

    };


    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {group,visible,previewVisible,imageUrl} = this.state;
        const {friendList,friendGroupList,currentUser,history,updateTemporary} = this.props;
        if(group){
            const groupData = group.group;
            const groupList = group.groupList;
            return(
                <Layout>
                    <Modal
                        centered
                        title="邀请新成员入伙"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div style={{height:300}}>
                            <ScrollContent>
                                <Tree
                                    checkable
                                    onCheck={this.onCheck}>
                                    {friendGroupList.map((item,index) => (
                                        <TreeNode title={<p style={{width:1000}}>{item.friendGroupName}</p>} key={"delete-"+index}>
                                            {
                                                friendList.map((user,index) =>(
                                                    <TreeNode disabled={
                                                        groupList.filter(u=>u.userPhone===user.userPhone).length>0
                                                    } key={user.friendFriendPhone} title={
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
                            </ScrollContent>
                        </div>
                    </Modal>

                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel2} width={150} centered>
                        <Upload
                            data={{id:groupData.groupId}}
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="/group/set/header"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Modal>
                    <Content>
                        <Card cover={<img alt="example" src={back}/> } style={{border:0}} >
                            <Meta
                                avatar={<Avatar src={groupData.groupHeader} icon={"team"}  onClick={()=>{this.setState({previewVisible: true})}}/>}
                                title={<Link to={`/group/update/${groupData.groupId}`}>{groupData.groupName}</Link>}
                                description={<Link to={`/group/update/${groupData.groupId}`}>{groupData.groupBrief}</Link>}
                            />
                        </Card>
                        <Tabs  defaultActiveKey="1"
                               tabBarExtraContent={
                                   this.state.isList?
                                       <Button type={"primary"}
                                               key={1} icon={"plus"}
                                               onClick={this.showModal}
                                       >
                                           邀请
                                       </Button>
                                       :null
                               }
                               onChange={
                                   ()=>this.setState({isList: !this.state.isList})
                               }
                               tabBarStyle={{paddingRight:10}}>
                            <TabPane tab="群组信息" key="1">
                                <div className="me-content-module" key="c">
                                    <div className="module-first-icon">
                                        <Icon theme="filled" type="layout"/>
                                    </div>
                                    群组创建于：{moment(groupData.groupCreatetime).format("YYYY-MM-DD HH")}时
                                </div>
                                <div className="me-content-module" key="c">
                                    <div className="module-first-icon">
                                        <Icon theme="filled" type="crown" />
                                    </div>
                                    群主：
                                    {
                                        groupList.filter(item=>item.groupListUserStatus === 2)
                                            .map((item,index)=>(
                                                <Link to={`/user/${item.userPhone}`} key={index}>{item.userNickname}({item.userPhone})</Link>
                                            ))
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab="成员列表" key="2">
                                {
                                    groupList.map((user,i)=>(
                                        <div key={i}>
                                            <Link to={user.userPhone === currentUser.userPhone?'/me':`/user/${user.userPhone}`}>
                                                <UserItem avatar={user.userHeader} name={user.groupListUserRemark?`${user.groupListUserRemark}(${user.userNickname})`:user.userNickname} description={user.userDescription}/>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </TabPane>
                        </Tabs>
                    </Content>
                    <Nav Transparent>
                        <div className={"nav-icon"} onClick={()=>{this.props.history.goBack()}}>
                                <IconBtn type={"left"}/>
                        </div>
                    </Nav>
                    {
                        groupData.groupCreateUser === currentUser.userPhone?
                            <NavBar onClick={()=>{
                                confirm({
                                    title: '确定要解散该群聊吗?',
                                    content: '解散后所有成员都将退出群聊',
                                    async onOk() {
                                        const response = await reqDissolveGroup(groupData.groupId);
                                        if(response.data.ok){
                                            message.success("群组已解散！");
                                            updateTemporary();
                                            history.replace("/list");
                                        }
                                    },
                                    onCancel() {},
                                });
                            }}>
                                <div>解散群组</div>
                            </NavBar>:
                            <NavBar onClick={()=>{
                                confirm({
                                    title: '真的要退出该群聊吗?',
                                    async onOk() {
                                        const response = await reqQuitGroup(groupData.groupId);
                                        if(response.data.ok){
                                            message.success("已退出群聊！");
                                            updateTemporary();
                                            history.replace("/list");
                                        }
                                    },
                                    onCancel() {},
                                });
                            }}>
                                <div>删除并退出</div>
                            </NavBar>
                    }
                </Layout>
            )
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
    friendGroupList:state.friendGroupList,
    friendList:state.friendList,
    currentUser:state.user
})
const mapDispatchToProps=(dispatch)=>({
    updateGroup(){
        dispatch(actions.initialGroupList())
    },
    updateTemporary(){
        dispatch(TemporaryActions.InitialList());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(GroupDetail);