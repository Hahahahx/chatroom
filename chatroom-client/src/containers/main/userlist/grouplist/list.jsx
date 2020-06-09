import React, { Component } from 'react'
import ListFriend from "./userList";
import ListGroup from "./groupList";

class GroupList extends Component {

    
    render() {
        if(this.props.isFriend){
            return <ListFriend history={this.props.history}/>
        }else {
            return <ListGroup history={this.props.history}/>
        }
    }
}


export default GroupList ;