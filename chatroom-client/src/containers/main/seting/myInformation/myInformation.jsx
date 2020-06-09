import React,{Component} from "react";
import {Content, Layout, Nav, ScrollContent} from "../../../../components/layout/layout";
import {Link} from "react-router-dom";
import IconBtn from "../../../../components/iconbtn/iconbtn";
import {actions} from "../../me/store";
import {connect} from "react-redux";
import {Item, ItemOperator, ItemTitle, ItemUserInformation} from "../../../../components/useritem/useritem";
import locale from "antd/es/date-picker/locale/zh_CN";
import {Cascader, DatePicker} from "antd";
import {provinceList} from "../../../../assets/area";
import moment from "moment";
import {reqUpdateUser} from "../../../../api";

class MyInformation extends Component{

    state = {
        user:null
    }


    changeName= e =>{
        const {user} = this.state;
        user.userNickname = e.target.value.trim();
        console.log(user.userNickname)
        this.setState(user);
    }
    changeDescription= e =>{
        const {user} = this.state;
        user.userDescription = e.target.value.trim();
        this.setState(user);
    }
    changeBirthdate= e =>{
        const {user} = this.state;
        console.log(e)
        user.userBirthdate = e;
        console.log(user.userBirthdate)
        this.setState(user);
    }
    changeRedirect=e=>{
        console.log(e)
        const {user} = this.state;
        user.userProvince = e[0];
        user.userCity = e[1];
        user.userTown = e[2];
        this.setState(user);
    }
    changeAddress=e=>{
        const {user} = this.state;
        user.userAddress = e.target.value.trim();
        this.setState(user);
    }

    backAndUpdate=()=>{
        reqUpdateUser(this.state.user);
    }

    componentDidMount() {
        this.setState({user:this.props.user})
    }

    render() {
        const {user} = this.props;
        console.log(this.state.user)
        return(
            <Layout>
                <Content>
                    <ScrollContent>
                        <div style={{height:50}}/>
                        <Item>
                            <ItemTitle size={12} weight={800}>昵称</ItemTitle>
                            <ItemUserInformation>
                                <input type="text" defaultValue={user.userNickname} onChange={this.changeName}/>
                            </ItemUserInformation>
                        </Item>
                        <Item>
                            <ItemTitle size={12} weight={800}>签名</ItemTitle>
                            <ItemUserInformation>
                                <input type="text" defaultValue={user.userDescription} onChange={this.changeDescription}/>
                            </ItemUserInformation>
                        </Item>
                        <Item>
                            <ItemTitle size={12} weight={800}>生日</ItemTitle>
                            <ItemUserInformation>
                                <DatePicker onChange={this.changeBirthdate} disabledDate={this.disabledDate} defaultValue={moment(user.userBirthdate)} locale={locale} style={{width:"100%"}}/>
                            </ItemUserInformation>
                        </Item>
                        <Item>
                            <ItemTitle size={12} weight={800}>地址</ItemTitle>
                            <ItemUserInformation>
                                <Cascader onChange={this.changeRedirect} defaultValue={[user.userProvince, user.userCity, user.userTown]} options={provinceList} style={{width:"100%"}}/>
                            </ItemUserInformation>
                        </Item>
                        <Item>
                            <ItemTitle size={12} weight={800}>详细地址</ItemTitle>
                            <ItemUserInformation>
                                <input onChange={this.changeAddress} type="text" defaultValue={user.userAddress}/>
                            </ItemUserInformation>
                        </Item>
                        <div style={{height:50}}/>
                    </ScrollContent>
                </Content>
                <Nav>
                    <div className={"nav-icon"}>
                        <Link to={"/seting"} onClick={this.backAndUpdate}>
                            <IconBtn type={"left"}/>
                        </Link>
                    </div>
                    <div className={"nav-title"}>我的信息</div>
                    <div/>
                </Nav>
            </Layout>
        );
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

export default connect(mapStateToProps,mapDispatchToProps)(MyInformation);