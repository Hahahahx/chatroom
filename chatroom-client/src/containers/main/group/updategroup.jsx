import React,{Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Content, Layout, Nav, ScrollContent} from "../../../components/layout/layout";
import {Item, ItemTitle, ItemUserInformation} from "../../../components/useritem/useritem";
import IconBtn from "../../../components/iconbtn/iconbtn";
import {reqGetGroup, reqSetGroup, reqSetMessageList} from "../../../api";
import {Empty, Spin} from "antd";

class UpdateGroup extends Component{

    state = {
        group:null
    }

    backAndUpdate =()=>{
        reqSetGroup(this.state.group);
        this.props.history.goBack();
    }

    changeName= e =>{
        let {group} = this.state;
        group.groupName = e.target.value.trim();
        this.setState(group);
    }
    changeDescription= e =>{
        let {group} = this.state;
        console.log(group)
        group.groupBrief = e.target.value.trim();

        this.setState(group);
    }


    async componentDidMount() {
        const responce =  await reqGetGroup(this.props.match.params.group);
        const group = responce.data.data.group;
        this.setState({group});
    }


    render() {
        const {group} = this.state;

        if(group){
            return(
                <Layout>
                    <Content>
                        <ScrollContent>
                            <div style={{height:50}}/>
                            <Item>
                                <ItemTitle size={12} weight={800}>群组名称</ItemTitle>
                                <ItemUserInformation>
                                    <input type="text" defaultValue={group.groupName} onChange={this.changeName}/>
                                </ItemUserInformation>
                            </Item>
                            <Item>
                                <ItemTitle size={12} weight={800}>群组描述</ItemTitle>
                                <ItemUserInformation>
                                    <input type="text" defaultValue={group.groupBrief} onChange={this.changeDescription}/>
                                </ItemUserInformation>
                            </Item>
                            <div style={{height:50}}/>
                        </ScrollContent>
                    </Content>
                    <Nav>
                        <div className={"nav-icon"} onClick={this.backAndUpdate}>
                            <IconBtn type={"left"}/>
                        </div>
                        <div className={"nav-title"}>群组信息</div>
                        <div/>
                    </Nav>
                </Layout>
            );
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
})
const mapDispatchToProps=(dispatch)=>({
})

export default connect(mapStateToProps,mapDispatchToProps)(UpdateGroup);