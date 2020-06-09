import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {actions} from './store/index';
import {actions as SocketActions} from '../socketIO/store/index'
import {actions as RegisterActions} from '../register/store'
import {actions as UserActions} from '../main/me/store'
import { Form, Icon, Input, Button, Checkbox,message, Row, Col } from 'antd';
import { reqSendVerifyCode, reqPasswordLogin,reqVerifyLogin } from '../../api';

import {LoginLogo} from '../../components/logo/logo';
import Background from '../../components/background/background';
import './login.less';
import {actions as TemporaryAcitons} from "../main/temporary/store";
import {actions as FriendListActions} from "../main/userlist/store";
import {actions as NoticeActions} from "../main/notice/store";


class Login extends Component { 

    state={
        isPwd:false,
    }

    handleClick=()=>{
        this.setState({isPwd:!this.state.isPwd})
    }

    handleSendsms =()=>{ 
        const {form} = this.props;
        const phone = form.getFieldValue('phone');
        form.validateFields(['phone'],{force:true}); 
        if (phone){
            message.loading('验证码正在发送中...', 0);
            const response = reqSendVerifyCode({phone});
            response.then((result)=>{
                if(result.data.ok){
                    //等待三秒钟
                    setTimeout(() => {
                        message.destroy();
                        message.success(result.data.message,2)
                    }, 3000);
                }else{
                    message.destroy();
                    message.error(result.data.message,2)
                }
            })
        }
    }

    handleSubmit = e => {
        const {form,LoginError,LoginSuccess,userExist,userUnExist,SetUser,InitialList} = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const response = this.state.isPwd?reqPasswordLogin(values):reqVerifyLogin(values);
                response.then((result)=>{
                    if(result.data.ok){
                        if(result.data.data.hasUser) {
                            SetUser(result.data.data.user);
                            InitialList();
                            userExist();
                            message.loading("登录成功，加载页面中..",2);
                            //等待三秒钟
                            setTimeout(() => {
                                LoginSuccess();
                            }, 3000);
                        }else{
                            userUnExist()
                            LoginSuccess();
                        }
                    }else{
                        message.error(result.data.message,2);
                        LoginError();
                    }
                });
            }
        });
    }; 


    render() {
        console.log("login")
        const {isPwd} = this.state;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const {loginStatus,ConnectSocket,} = this.props; 
        
        if(!loginStatus){
            return ( 
                <>
                    <Background/>
                    <LoginLogo/>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入你的手机号！'}, {validator: this.validateToSendCode}],
                        })(
                            <Input type="phone" allowClear maxLength={11}
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.2)' }} />}
                            placeholder="手机"
                            />,
                        )}
                        </Form.Item>
                        {isPwd?
                        <Form.Item>
                            {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入你的密码！' }],
                            })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                            )}
                        </Form.Item>:
                            
                        <Form.Item>
                        <Row gutter={16}>
                            <Col span={14}>
                            {getFieldDecorator('verification', {
                            rules: [{ required: true, message: '请输入6位验证码!' }],
                            })(
                                <Input type="phone" allowClear maxLength={6}
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.2)' }} />}
                                placeholder="验证码"/>
                            )}
                            </Col>
                            <Col span={6}>
                                <Button style={{ color: 'rgba(120,150,255,.8)' }}
                                onClick = {this.handleSendsms}
                                >发送验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        }
                        
                        <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住登录状态</Checkbox>)}
                        <div className="login-form-usepwd" onClick={this.handleClick}>
                            <p>{isPwd?"验证码登录":"使用密码登录"}</p>
                        </div>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            {isPwd?"登录":"登录 / 注册"}
                        </Button>
                        </Form.Item>
                    </Form>
                </>
             );
        }else{
            ConnectSocket(getFieldValue('phone'));
            return <Redirect to="/register"/>
        }
        
    }
}
 

const mapStateToProps = (state) => ({
    loginStatus: state.login.loginStatus
})
  
const mapDispatchToProps = (dispatch) => ({
    SetUser(user){
        dispatch(UserActions.setUser(user));
    },
    LoginSuccess(){
        dispatch(actions.loginSuceedAction());
    },
    LoginError(){
        dispatch(actions.loginErrorAction());
    },
    ConnectSocket(phone){
        dispatch(SocketActions.setSocketClient(phone));
    },
    userExist(){
        dispatch(RegisterActions.userExist());
    },
    InitialList(){
        dispatch(TemporaryAcitons.InitialList());
        dispatch(FriendListActions.initialFriendGroup());
        dispatch(FriendListActions.initialFriendList());
        dispatch(FriendListActions.initialGroupList());
        dispatch(NoticeActions.InitialNotice())
    },
    userUnExist(){
        dispatch(RegisterActions.userUnExist());
    }
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Form.create({ name: 'normal_login' })(Login));