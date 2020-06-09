import React,{Component} from "react";
import {Avatar, Button, Drawer, Dropdown, Empty, Icon, Input, Menu, Modal, Spin} from "antd";
import IconBtn from "../../../components/iconbtn/iconbtn";
import {WhatIsYourConstellation} from '../../../utils/constellationUtil';
import moment from 'moment'
import {reqDeleteFriend, reqSetRemarkname} from "../../../api";
import img1 from '../../../assets/img/background-1.jpg'
import img2 from '../../../assets/img/background-2.jpg'
import img3 from '../../../assets/img/background-3.jpg'
import img4 from '../../../assets/img/background-4.jpg'
import img5 from '../../../assets/img/background-5.jpg'
import img6 from '../../../assets/img/background-6.jpg'
import {Layout, NavBar, ScrollContent} from "../../../components/layout/layout";

export class Information extends Component{

    state = {
        visibleDelete:false,    //删除框
        previewVisible:false, // 备注框
        remark:"",
    };

    handleBack=()=>{
        this.props.history.replace(`/list`);
    };

    handleConstellatione=(birthdate)=>{

        const year =  parseInt(moment(birthdate).format('YYYY'));
        const month =  parseInt(moment(birthdate).format('MM'));
        const day = parseInt( moment(birthdate).format('DD'));

        const result = WhatIsYourConstellation(year,month,day);
        return result;
    };

    handleAge=(birthdate)=>{
        const year =  parseInt(moment(birthdate).format('YYYY'));
        const nowYear =  parseInt( moment().format("YYYY"));
        return nowYear-year;
    }

    handleRemark=()=>{
        this.setState({previewVisible:true})
    };

    handleUpdateRemark=async ()=>{
        const data = {
            phone:this.props.user.userPhone,
            remark:this.input.input.value
        }
        const responce = await reqSetRemarkname(data);
        this.setState({previewVisible:false})
        this.props.setUser(responce.data.data);
    }

    handleDeleteUser =async ()=>{
        const responce = await reqDeleteFriend(this.props.user.userPhone);
        this.props.setUser(responce.data.data);
    }

    //备注
    handleCancel = () => this.setState({ previewVisible: false });

    //删除
    showDrawer = () => this.setState({visibleDelete: true});
    onClose = () => this.setState({visibleDelete: false});

    handleCreateTime =(date)=>{
        const time = moment().diff(moment(date),"minutes")
        let year = Math.floor(time/365/24/60);
        let month = Math.floor((time-year*365*24*60)/24/60/30)
        let day = Math.floor((time-year*365*24*60-month*24*60*30)/24/60)
        let hour = Math.floor((time-year*365*24*60-month*24*60*30-day*24*60)/60)
        let minute = Math.floor((time-year*365*24*60-month*24*60*30-day*24*60-hour*60));

       return (
           <div style={{textAlign:"right",whiteSpace:20,color:'rgba(50,50,250,0.8)'}}>
               {year!==0?<span style={{fontSize:35}}>{year}年</span>:null}
               {month!==0?<span style={{fontSize:30}}>{month}月</span>:null}
               {day!==0?<span style={{fontSize:25}}>{day}天</span>:null}
               {hour!==0?<span style={{fontSize:20}}>{hour}小时</span>:null}
               {minute!==0?<span style={{fontSize:20}}>{minute}分钟...</span>:null}
           </div>
       );
    };


    render() {
        const {user} = this.props;
        let img ;
        switch (user.userBackground) {
            case "0": img = img1;break;
            case "1": img = img2;break;
            case "2": img = img3;break;
            case "3": img = img4;break;
            case "4": img = img5;break;
            case "5": img = img6;break;
        }
        if(!user.hasOwnProperty("userPhone")){
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
        }else {
            if(user.friendId){
                return (
                    <div className='userinformation-layout'>

                    <div>
                        <Drawer title={<span><Icon type="info-circle" style={{ color: 'rgba(250,100,100,.8)',marginRight:10 }} />删除好友(也从对方好友中删除)</span>}
                            placement="bottom"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visibleDelete}
                            bodyStyle={{padding:0}}
                        >
                            <div style={{marginBottom:20}}>
                                你们一起走过了
                                <div>
                                    {this.handleCreateTime(user.friendCreatetime)}
                                </div>
                            </div>

                            <NavBar>
                                <div onClick={this.handleDeleteUser}>
                                    <h3 style={{color:'rgba(100,0,0,0.7)'}}>删除</h3>
                                </div>
                                <div onClick={this.onClose}>
                                    <h3 style={{color:'rgba(0,0,100,0.7)'}}>取消</h3>
                                </div>
                            </NavBar>
                        </Drawer>
                    </div>

                        <Modal visible={this.state.previewVisible} footer={
                            <Button type="primary" onClick={this.handleUpdateRemark}>
                                修改
                            </Button>
                        } onCancel={this.handleCancel}>
                            <div>
                                <div style={{marginBottom:5}}>好友备注：</div>
                                <Input type={"text"} placeholder={user.friendRemark} ref={input=>this.input=input}/>
                            </div>
                        </Modal>

                        <div className="userinformation-header">
                            <div className="userinformation-header-setting" onClick={this.handleBack}>
                                <IconBtn type="left"/>
                            </div>
                            <div className="me-header-setting">
                                <Dropdown overlay={
                                    <Menu style={{padding:5}}>
                                        <Menu.Item key="0"  onClick={this.handleRemark}>
                                            <Icon type="solution" style={{marginRight:10,padding:10}}/>设置备注
                                        </Menu.Item>
                                        <Menu.Item key="1"  onClick={this.handleSearch}>
                                            <Icon type="team" style={{marginRight:10,padding:10}}/>修改分组
                                        </Menu.Item>
                                        <Menu.Item key="2" onClick={this.showDrawer}>
                                            <Icon type="user-delete" style={{marginRight:10,padding:10}}/>删除好友
                                        </Menu.Item>
                                    </Menu>
                                } trigger={['click']}>
                                    <div style={{marginLeft:10}}>
                                        <IconBtn  type="menu"/>
                                    </div>
                                </Dropdown>
                            </div>
                            <div className="userinformation-header-user-background">
                                <img src={img} alt="背景图片"/>
                            </div>
                            <div className="userinformation-header-user-name">
                                {user.friendRemark?`${user.friendRemark}(${user.userNickname})`:user.userNickname}
                            </div>
                            <div className="userinformation-header-user-description">
                                <div>
                                    <Icon type="man" className={`userinformation-user-gender ${"user-man"}`}/>
                                    {user.userProvince}{user.userCity?"-"+user.userCity:null}{user.userTown?"-"+user.userTown:null}
                                </div>
                                <div>
                                    {this.handleAge(user.userBirthdate)}岁  {this.handleConstellatione(user.userBirthdate)}
                                </div>
                            </div>
                            <div className="userinformation-header-user-avatar">
                                <Avatar src={user.userHeader} size={80} className="user-avatar" icon={"user"}/>
                            </div>
                        </div>

                        <div className="userinformation-content">
                            <div className="userinformation-content-module">
                                <div className="module-first-icon">
                                    <Icon theme="filled" type="edit"/>
                                </div>
                                {user.userDescription?user.userDescription:<span style={{color:"rgba(0,0,0,0.3)"}}>[这个用户很懒什么都没有留下]</span>}
                            </div>
                            <div className="userinformation-content-module">
                                <div className="module-first-icon">
                                    <Icon theme="filled" type="layout"/>
                                </div>
                                {user.userNickname}的相册
                                <div className="module-last-icon">
                                    <Icon type="caret-right" theme="filled" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }else {
                return (
                    <div className='userinformation-layout'>
                        <div className="userinformation-header">
                            <div className="userinformation-header-setting" onClick={this.handleBack}>
                                <IconBtn type="left"/>
                            </div>
                            <div className="userinformation-header-user-background">
                                <img src={img} alt="背景图片"/>
                            </div>
                            <div className="userinformation-header-user-name">
                                {user.userNickname}
                            </div>
                            <div className="userinformation-header-user-description">
                                <div>
                                    <Icon type="man" className={`userinformation-user-gender ${"user-man"}`}/>
                                    {user.userProvince}{user.userCity?"-"+user.userCity:null}{user.userTown?"-"+user.userTown:null}
                                </div>
                                <div>
                                    {this.handleAge(user.userBirthdate)}岁  {this.handleConstellatione(user.userBirthdate)}
                                </div>
                            </div>
                            <div className="userinformation-header-user-avatar">
                                <Avatar src={user.userHeader} size={80} className="user-avatar" icon={"user"}/>
                            </div>
                        </div>

                        <div className="userinformation-content">
                            <div className="userinformation-content-module">
                                <div className="module-first-icon">
                                    <Icon theme="filled" type="edit"/>
                                </div>
                                {user.userDescription?user.userDescription:<span style={{color:"rgba(0,0,0,0.3)"}}>[这个用户很懒什么都没有留下]</span>}
                            </div>
                            <div className="userinformation-content-module">
                                <div className="module-first-icon">
                                    <Icon theme="filled" type="layout"/>
                                </div>
                                {user.userNickname}的相册
                                <div className="module-last-icon">
                                    <Icon type="caret-right" theme="filled" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

}