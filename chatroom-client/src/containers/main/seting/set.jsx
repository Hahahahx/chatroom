import React,{Component} from "react";
import {Content, Layout, Nav} from "../../../components/layout/layout";
import IconBtn from "../../../components/iconbtn/iconbtn";
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import {Item, ItemOperator, ItemUserInformation, ItemTitle} from "../../../components/useritem/useritem";
import {actions} from "../me/store";
import {connect} from "react-redux";
import MyInformation from "./myInformation/myInformation";




class Set extends Component{

    render() {
        const {user} = this.props
        return (
            <Layout>
                <div style={{height:50}}/>
                <Content>
                    <Link to={`/seting/detail/${user.userPhone}`} style={{color:"rgba(0,0,50,0.8)"}}>
                        <Item>
                            <ItemTitle size={12} weight={800}>我的信息</ItemTitle>
                            <ItemUserInformation/>
                            <ItemOperator style={{textAlign:"right"}}>
                                <IconBtn type={"right"} />
                            </ItemOperator>
                        </Item>
                    </Link>
                    <Link to={`/seting/report/${user.userPhone}`} style={{color:"rgba(0,0,50,0.8)"}}>
                        <Item>
                            <ItemTitle size={12} weight={800}>举报信息</ItemTitle>
                            <ItemUserInformation/>
                            <ItemOperator style={{textAlign:"right"}}>
                                <IconBtn type={"right"} />
                            </ItemOperator>
                        </Item>
                    </Link>
                </Content>
                <Nav>
                    <div className={"nav-icon"}>
                        <Link to={"/me"}>
                            <IconBtn type={"left"}/>
                        </Link>
                    </div>
                    <div className={"nav-title"}>设置</div>
                    <div/>
                </Nav>
            </Layout>
        )
    }
}


const mapStateToProps=(state)=>({
    user:state.user
})
const mapDispatchToProps=(dispatch)=>({
    updateUser(user){
        dispatch(actions.setUser(user));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Set);