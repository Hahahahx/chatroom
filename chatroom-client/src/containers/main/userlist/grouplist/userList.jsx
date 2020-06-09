import React, { Component } from 'react'
import {Collapse, Empty} from 'antd';
import UserItem from '../../../../components/useritem/item';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import QueueAnim from 'rc-queue-anim';

const { Panel } = Collapse;

class ListFriend extends Component {

    TalkingToUser=(user)=>{
        this.props.history.replace(`/user/${user.userPhone}`);
    }
    
    render() {
        const {friendGroupList,friendList} = this.props;
        if(friendGroupList.length === 0){
            return(
                <QueueAnim animConfig={[
                               { opacity: [1, 0], translateY: [0, 20] }
                           ]}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                           description={<span>您还没有好友，赶快去 <Link to="/search">添加好友</Link></span>}
                    />
                </QueueAnim>
            );
        }else{
            return (
                <QueueAnim animConfig={[
                               { opacity: [1, 0], translateY: [0, 20] }
                           ]}>
                    {
                        friendGroupList.map((item,index)=>(
                            <Collapse key={index} bordered={false} accordion={true} expandIconPosition={"right"} destroyInactivePanel={true} className={"user-list-content"}>
                                <Panel header={item.friendGroupName}  style={{border:0}}>
                                    <QueueAnim animConfig={[
                                                   { opacity: [1, 0], translateX: [0, 50] }
                                               ]}>
                                        {
                                            friendList.map((user,i)=>{
                                                if(user.friendGroupId === item.friendGroupId){
                                                    return(
                                                        <div key={i} onClick={this.TalkingToUser.bind(this,user)}>
                                                            <UserItem avatar={user.userHeader} name={user.friendRemark?`${user.friendRemark}(${user.userNickname})`:user.userNickname}description={user.userDescription}/>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </QueueAnim>
                                </Panel>
                            </Collapse>
                        ))
                    }
                </QueueAnim>
            );
        }
    }
}

const mapStateToProps = (state)=>({
    friendGroupList:state.friendGroupList,
    friendList:state.friendList
})
const mapDispatchToProps = (dispatch)=>({
})

export default connect(mapStateToProps, mapDispatchToProps)(ListFriend) ;