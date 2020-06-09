import React,{Component} from "react";
import { Layout, Nav, NavBar, ScrollContent} from "../../../components/layout/layout";
import IconBtn from "../../../components/iconbtn/iconbtn";
import {Avatar, Col, Empty, Row, Tree, Checkbox, Divider, Radio, Card, Spin, message} from "antd";
import {connect} from "react-redux";
import {reqGetUserByPhone, reqReportToUser} from "../../../api";
const { TreeNode } = Tree;
const { Meta } = Card;

class ReportUser extends Component{

    state = {
        user:null,
        textMsg: [],
        imgMsg: [],
        value:1,
        text:""
    };

    onChangeOther=e=>{
        this.setState({
            text:e.target.value
        })
    }

    handleSubmit=async ()=>{
        const {user,textMsg,imgMsg,value,text}=this.state;
        const {currentUser} = this.props;
        const data = {
            from:currentUser.userId,
            to:user.userId,
            content:JSON.stringify(textMsg),
            images:imgMsg,
            message:text,
            type:value,
            isgroup:false
        }
        const response  = await reqReportToUser(data);
        const result  = response.data;
        if(result.ok){
            message.success("感谢您的反馈！",2);
            this.props.history.goBack();
        }else{
            message.error(result.message,2);
            this.props.history.goBack();
        }
    }

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    onCheckText = (checkedKeys, info) => {
        this.setState({textMsg:checkedKeys});
    };

    onCheckImg = (checkedValues) => {
        const result = checkedValues[checkedValues.length-1].split(",")[1];
        console.log(result);
        let {imgMsg}  = this.state;
        imgMsg.push(result);
        this.setState({imgMsg});
    };

    handleBack=()=>{
        this.props.history.goBack();
    };

    async componentDidMount() {
        const {phone} = this.props.match.params;
        const response = await reqGetUserByPhone(phone);
        const user = response.data.data;
        this.setState({user});
    }


    render() {
        const {user} = this.state;
        const {talking,currentUser} = this.props;
        const {phone} = this.props.match.params;
        let talkList = talking.length!==0?talking.filter(item=>parseInt(item.touser) === parseInt(phone)):[];
        talkList = talkList.length !==0?talkList[0].talkingList:[];
        console.log(talkList)
        if(user===null){
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
        return (
            <Layout>
                <ScrollContent>
                    <div style={{height:55}}></div>
                    <Card style={{ width: '100%', marginTop: 16}}>
                        <Meta
                            avatar={
                                <Avatar src={user.userHeader} size={40} />
                            }
                            title={user.userNickname}
                            description={user.userDescription}
                        />
                    </Card>
                    <Divider orientation="left">原因</Divider>
                    <Radio.Group onChange={this.onChange} value={this.state.value} style={{paddingLeft:20,paddingRight:20}}>
                        <Radio value={1}>色情传播</Radio>
                        <Radio value={2}>暴力血腥</Radio>
                        <Radio value={3}>政治倾向</Radio>
                        <Radio value={4}>谣言散播</Radio>
                        <Radio value={5}>其他</Radio>
                    </Radio.Group>
                    {
                        this.state.value===5?
                            <div>
                                <Divider orientation="left">其他</Divider>
                                <textarea className="userinformation-text" value={this.state.text} onChange={this.onChangeOther}/>
                            </div>
                            :null
                    }
                    <Divider orientation="left">消息</Divider>
                    <Tree
                        checkable
                        onCheck={this.onCheckText}>
                        {
                            talkList.filter(talk=>parseInt(talk.from)!==parseInt(currentUser.userPhone)&&!talk.typeIsImage)
                                .map(talk=>{
                                    if(!talk.typeIsImage){
                                        return (
                                            <TreeNode key={`${talk.sendTime}：${talk.message}`} title={`${talk.sendTime}：${talk.message}`}/>
                                        );
                                    }
                                })
                        }
                    </Tree>
                    <Divider orientation="left">图片</Divider>
                    <div style={{paddingLeft:20,paddingRight:20}}>
                        <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckImg}>
                            <Row>
                                {
                                    talkList.map((talk) => {
                                        if (parseInt(talk.from)!==parseInt(currentUser.userPhone)&&talk.typeIsImage === true) {
                                            console.log(talk)
                                            return (
                                                <Col span={8}>
                                                    <Checkbox value={talk.message}>
                                                        <div >
                                                            <img src={talk.message} style={{width:"100px"}}/>
                                                        </div>
                                                    </Checkbox>
                                                </Col>
                                            );
                                        }
                                    })
                                }
                            </Row>
                        </Checkbox.Group>
                    </div>
                    <div style={{height:55}}></div>
                </ScrollContent>

                <Nav>
                    <div className={"nav-icon"} onClick={this.handleBack}><IconBtn type={"left"}/></div>
                    <div className={"nav-title"}>举报用户</div>
                    <div className={"nav-icon"}><IconBtn type/></div>
                </Nav>
                <NavBar onClick={this.handleSubmit} style={{boxShadow:'1px -2px 5px rgba(0,0,100,0.1)'}}>
                    <div className={"nav-title"}>提交</div>
                </NavBar>
            </Layout>
        );
    }

}

const mapStateToProps = (state)=>({
    talking:state.talking,
    currentUser:state.user,
})
const mapDispatchToProps = (dispatch)=>({
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportUser)