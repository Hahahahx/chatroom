import React, { Component } from 'react'
import {Collapse} from 'antd';
import UserItem from '../../../../components/useritem/item';
import {connect} from "react-redux";
import QueueAnim from 'rc-queue-anim';
import {Link} from "react-router-dom";

const { Panel } = Collapse;

class ListGroup extends Component {

    render() {
        const {groupList} = this.props;
        return (
            <QueueAnim animConfig={[
                           { opacity: [1, 0], translateY: [0, 20] }
                       ]}>
                <Collapse key={1} bordered={false} accordion={true} expandIconPosition={"right"} destroyInactivePanel={true} className={"user-list-content"}>
                    <Panel header="管理的群聊" style={{border:0}} >
                        <QueueAnim animConfig={[
                                       { opacity: [1, 0], translateX: [0, 50] }
                                   ]}>
                            {
                                groupList.filter(item=>parseInt(item.GroupListUserStatus)!== 0)
                                .map((group,i)=>(
                                    <Link key={i}  to={`/group/talk/${group.groupId}`}>
                                        <div >
                                            <UserItem avatar={group.groupHeader} name={group.groupName} description={group.groupBrief}/>
                                        </div>
                                    </Link>
                                ))
                            }
                        </QueueAnim>
                    </Panel>
                </Collapse>
                <Collapse key={2} bordered={false} accordion={true} expandIconPosition={"right"} destroyInactivePanel={true} className={"user-list-content"}>
                    <Panel header="加入的群聊" style={{border:0}}>
                        <QueueAnim animConfig={[
                                       { opacity: [1, 0], translateX: [0, 50] }
                                   ]}>
                            {
                                groupList.filter(item=>parseInt(item.GroupListUserStatus)=== 0)
                                    .map((group,i)=>(
                                        <div key={i} onClick={this.TalkingToGroup.bind(this,group)}>
                                            <UserItem avatar={group.groupHeader} name={group.groupName} description={group.groupBrief}/>
                                        </div>
                                    ))
                            }
                        </QueueAnim>
                    </Panel>
                </Collapse>
            </QueueAnim>
        );
    }
}

const mapStateToProps = (state)=>({
    groupList:state.groupList
})
const mapDispatchToProps = (dispatch)=>({
})

export default connect(mapStateToProps, mapDispatchToProps)(ListGroup) ;