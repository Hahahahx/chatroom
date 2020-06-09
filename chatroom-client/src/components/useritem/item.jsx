import React, { Component } from 'react';
import { Avatar} from 'antd';
import './item.less'

class UserItem extends Component { 

    render() {  
        const {avatar,name,description,unread} = this.props;
        return ( 
                <div className="list-item">
                    <div className="item-header" onClick={this.handleClick}> 
                        <Avatar src={avatar} size={50} icon="user"/>
                    </div>
                    <div className="item-show">
                        <div className="item-name">
                            {name} 
                        </div>
                        {
                            description?<div className="item-description">{description}</div>:""
                        }
                    </div>
                    <div className="item-unread">
                        {
                            unread===0||!unread?null:
                            <div>
                                {unread}
                            </div>
                        }
                    </div>
                </div>
         );
    }
}
 
export default UserItem;
