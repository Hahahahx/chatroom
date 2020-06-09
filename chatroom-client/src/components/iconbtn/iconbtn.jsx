import React, { Component } from 'react'
import { Icon } from 'antd';
import './iconbtn.less'

class IconBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            click:false
         }
    }

    clickIcon=()=>{
        this.setState({click:true})
    }


    componentDidUpdate(){
            setTimeout(() => {
                if(this.state.click)
                this.setState({click:false})
            },2500);
    }

    render() { 
        const {click} = this.state;
        return ( 
            <div onClick={this.clickIcon} className={`${click?"bounceIn":""}`} >
                <Icon type={this.props.type} className="icon" theme={this.props.theme?this.props.theme:""}/>
            </div>
         );
    }
}
 
export default IconBtn;