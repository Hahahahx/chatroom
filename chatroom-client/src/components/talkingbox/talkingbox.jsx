import React, { Component } from 'react';
import './talkingbox.less'
import { Avatar } from 'antd';

class TalkingBox extends Component {
    
    render() { 
        const {username,header,message,isRight,time} = this.props;
        return ( 
            <div>
                <div className={`${isRight?"talkingbox-layout-right":"talkingbox-layout-left"}`}>
                    <Avatar icon="user" size={38} src={header}/>
                    <div className={`${isRight?"talkingbox-name-message-right":"talkingbox-name-message-left"}`}>
                        {username?
                            <div>
                                <div className={`talkingbox-name ${isRight?"fright":"fleft"}`}>{username}</div>
                            </div>:null
                        }
                        <div>
                            <div className="talkingbox-frame">
                                <div className={`talkingbox-box ${isRight?"right":"left"}`}>
                                    {message}
                                </div>
                            </div>
                        </div>
                        <div  className={`talkingbox-time`}>
                            {time}
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default TalkingBox;