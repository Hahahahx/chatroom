import React,{Component} from "react";
import {Content, Layout, Nav, ScrollContent} from "../../../../components/layout/layout";
import {Link} from "react-router-dom";
import IconBtn from "../../../../components/iconbtn/iconbtn";
import {reqGetReport} from "../../../../api";
import {actions} from "../../me/store";
import {connect} from "react-redux";
import {Collapse, Empty, Radio, Spin} from "antd";
import report from "../../report/report";
import moment from "moment";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


class ReportInformation extends Component{

    state={
        report:null
    }

    async componentDidMount() {

        const response = await reqGetReport(this.props.user.userId);
        const report = response.data.data;
        console.log(report);
        this.setState({report})
    }

    reportType =(i)=>{
        switch (i){
            case 1: return "色情传播";
            case 2: return "暴力血腥";
            case 3: return "政治倾向";
            case 4: return "谣言散播";
            case 5: return "其他——";
        }
    }

    render() {
        const {report} = this.state;
        if(report){
            return(
                <Layout>
                    <Content>
                        <ScrollContent>
                            <div style={{height:50}}/>
                            <Collapse accordion>
                                {
                                    report.map((item,index)=>(
                                        <Panel header={
                                            <span>
                                                        举报对象：<Link to={`/user/${item.to.userPhone}`}>{item.to.userNickname}</Link>
                                                    </span>
                                        }
                                               extra={
                                                   <span>
                                                       {moment(item.reportCreatetime).format('YYYY-MM-DD HH:mm:ss')}_
                                                       {item.reportStatus?"已处理":"未处理"}
                                                    </span>
                                               } key={index}>
                                            <div>举报类型：{this.reportType(item.reportType)}{item.reportType===5?item.reportMessage:null}</div>
                                            <div>
                                                举报消息：
                                                <ol>
                                                {
                                                    JSON.parse(item.reportContent).map(msg=>(<li>{msg}</li>))
                                                }
                                                </ol>
                                            </div>
                                            <div>
                                                举报图片：{item.img.length}张
                                            </div>

                                        </Panel>
                                    ))
                                }
                            </Collapse>
                        </ScrollContent>
                    </Content>
                    <Nav>
                        <div className={"nav-icon"}>
                            <Link to={"/seting"}>
                                <IconBtn type={"left"}/>
                            </Link>
                        </div>
                        <div className={"nav-title"}>举报信息</div>
                        <div/>
                    </Nav>
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
            )
        }

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

export default connect(mapStateToProps,mapDispatchToProps)(ReportInformation);