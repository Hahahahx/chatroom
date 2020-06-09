import React, { Component } from 'react'
import {Avatar, Drawer, Icon, Modal, message, Upload, notification} from 'antd';
import img1 from '../../../assets/img/background-1.jpg'
import img2 from '../../../assets/img/background-2.jpg'
import img3 from '../../../assets/img/background-3.jpg'
import img4 from '../../../assets/img/background-4.jpg'
import img5 from '../../../assets/img/background-5.jpg'
import img6 from '../../../assets/img/background-6.jpg'
import NavBottom from "../../../components/navbottom/nav";
import IconBtn from "../../../components/iconbtn/iconbtn";
import { Layout, ScrollContent} from "../../../components/layout/layout";
import QueueAnim from 'rc-queue-anim';
import './me.less'
import {connect} from "react-redux";
import moment from "moment";
import {WhatIsYourConstellation} from "../../../utils/constellationUtil";
import {reqGetUserByPhone, reqSetUserBackground} from "../../../api";
import {actions} from "./store";
import {Link} from "react-router-dom";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('你只能上传JPG/PNG文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小应该小于2M');
    }
    return isJpgOrPng && isLt2M;
}


class Me extends Component {

    state = {
        imgList:[
            img1,
            img2,
            img3,
            img4,
            img5,
            img6,
        ],
        visibleDelete:false,
        previewVisible:false,
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
        const user = info.file.response.data;
        this.props.updateUser(user);

    };

    handleCancel = () => this.setState({ previewVisible: false });


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

    onClose = () => this.setState({visibleDelete: false});
    async componentDidMount() {
        const responce = await reqGetUserByPhone(this.props.user.userPhone);
        const user = responce.data.data;
        this.props.updateUser(user);
    }

    handleBackground=async (index)=>{
        const responce = await reqSetUserBackground({img:index});
        const user = responce.data.data;
        this.props.updateUser(user);
    }

    render() {
        const {user} = this.props;
        const { previewVisible, imageUrl} = this.state;
        let img ;
        switch (user.userBackground) {
            case "0": img = img1;break;
            case "1": img = img2;break;
            case "2": img = img3;break;
            case "3": img = img4;break;
            case "4": img = img5;break;
            case "5": img = img6;break;
        }

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const userDisables = user.userDisables;
        if(userDisables.length>0){
            const last = userDisables[userDisables.length-1];
            if(last.disableStatus){
                const args = {
                    message: '账号违规',
                    description:
                        '您的账号因违规操作已被限制，时间到'+moment(last.disableCreatetime).add(1,'days').format("YYYY-MM-DD HH:mm:ss"),
                    duration:null,
                };
                notification.error(args);
            }
        }
        return ( 
            <Layout animConfig={[
                { opacity: [1, 0],scale:[1,1.5]}
            ]}>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} width={150} centered>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/user/set/header"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Modal>
                <Drawer title={<span><Icon type="info-circle" style={{ color: 'rgba(100,100,250,.8)',marginRight:10 }} />替换背景图片</span>}
                        footer={"asfas"}
                        placement="bottom"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visibleDelete}
                        bodyStyle={{padding:0}}
                >
                    <div>
                        <div className="user-last-album">
                            {
                                this.state.imgList.map((imgs,index)=>(
                                    <div onClick={this.handleBackground.bind(this,index)} key={index} >
                                        {img===imgs?
                                            <div style={{position:"absolute",background:"rgba(0,0,0,0.4)"}}>
                                                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                            </div>
                                            :""}
                                        <img src={imgs} alt="1"/>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    <div style={{width:'100%',position:"absolute",bottom:0,display:"flex",flexDirection:"row"}}>
                        <div style={{background:'rgba(0,0,0,0.3)',textAlign:'center',width:'100%',height:50,borderLeft:'1px solid rgba(0,0,0,0.1)'}} onClick={this.onClose}>
                            <h2 style={{color:'white'}}>取消</h2>
                        </div>
                    </div>
                </Drawer>
                <div className="content" key="a">
                    <div className='me-layout'>
                        <div className="me-header">
                            <div className="me-header-setting">
                                <Link to={"/seting"}>
                                    <IconBtn theme="filled" type="setting"/>
                                </Link>
                            </div>
                            <div className="me-header-user-background" onClick={()=>{this.setState({visibleDelete:true})}}>
                                <img src={img} alt="背景图片"/>
                            </div>
                            <QueueAnim delay={300}
                                       animConfig={[
                                           { opacity: [1, 0], translateX: [0, 30] }
                                       ]}>
                                <div className="me-header-user-name" key="a">
                                    {user.userNickname}
                                </div>
                                <div className="me-header-user-description" key="b">
                                    <div>
                                        <Icon type="man" className={`me-user-gender ${"user-man"}`}/>
                                        {user.userProvince}{user.userCity?"-"+user.userCity:null}{user.userTown?"-"+user.userTown:null} {this.handleAge(user.userBirthdate)}岁  {this.handleConstellatione(user.userBirthdate)}
                                    </div>
                                </div>
                            </QueueAnim>

                            <QueueAnim delay={300}
                                       animConfig={[
                                           { opacity: [1, 0], translateX: [0, -30] }
                                       ]}>
                                <div className="me-header-user-avatar" key="a" onClick={()=>{this.setState({previewVisible: true})}}>
                                    <Avatar src={user.userHeader} size={80} className="user-avatar" icon={"user"}>
                                        {user.userNickname}
                                    </Avatar>
                                </div>
                            </QueueAnim>
                        </div>

                        <ScrollContent>
                            <div className="me-content">
                                <QueueAnim delay={300}
                                           animConfig={[
                                               { opacity: [1, 0], translateY: [0, 50] }
                                           ]}>
                                    <div className="me-content-module" key="b">
                                        <div className="module-first-icon">
                                            <Icon theme="filled" type="edit"/>
                                        </div>
                                        {user.userDescription?user.userDescription:<span style={{color:"rgba(0,0,0,0.3)"}}>[说点什么吧]</span>}
                                        <div className="module-last-icon">
                                            <Icon type="caret-right" theme="filled" />
                                        </div>
                                    </div>
                                </QueueAnim>
                            </div>
                        </ScrollContent>
                    </div>
                </div>
                <NavBottom key="b"/>
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
 
export default connect(mapStateToProps,mapDispatchToProps)(Me);