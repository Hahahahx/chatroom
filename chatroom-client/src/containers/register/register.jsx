import React, { Component } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader, 
    Radio,
    Checkbox,
    Button,DatePicker, message 
  } from 'antd';
import moment from "moment";
import {provinceList} from '../../assets/area';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import { Logo } from '../../components/logo/logo';
import { Modal } from 'antd';
import Background from '../../components/background/background';
import { reqRegister } from '../../api';
import './register.less';
import { connect } from 'react-redux';
import {actions as loginActions} from '../login/store/index';
import {actions as UserActions} from '../main/me/store'
import {actions} from './store';
import { Redirect } from 'react-router-dom';

  
  class RegistrationForm extends Component {
      state = {
          confirmDirty: false, //是否通过密码一致验证
          previewVisible:false // 文明宣言
      };
  
    handleSubmit = e => {
      e.preventDefault();
      console.log("log")
      this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (err) {
          return;
        }
        // 在提交之前日期组件应该先格式化成正常的YYYY-MM-DD格式
        const values = {
          ...fieldsValue,
          'birthdate': fieldsValue['birthdate'].format('YYYY-MM-DD')
        };
        const response = reqRegister(values);
        response.then((result)=>{
          if(result.data.ok){
            message.destroy();
            message.success(result.data.message,2)
            setTimeout(() => {
              this.props.SetUser(result.data.data);
              this.props.UserExist();
            }, 3000);
          }else{
              message.destroy();
              message.error(result.data.message,2);

              setTimeout(() => {
                this.props.LoginError()
                this.props.history.replace("/login");
              }, 1);
          }
        });
      });
    }; 
  
    /**失去焦点时验证 */ 
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    /**验证规则 判断确认密码 */
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码输入不一致!');
      } else {
        callback();
      }
    };
  
    /**验证规则 密码不通过则阻止组件提交 */
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    /**验证规则 确保已经阅读过相关协议 */
    validateToAgreement = (rule, value, callback) => {
      if (!value) {
        callback("请确保你已经阅读!");
      }
      callback();
    };
  
    /**日期组件只能选择当天之前的日期 */
    disabledDate=(current)=> {
      return current && current > moment().endOf('day');
    }
    
    handleCancel = () => this.setState({ previewVisible: false });
  
    render() {
      console.log("register")
      const { previewVisible } = this.state;
      const { getFieldDecorator } = this.props.form;
      if(this.props.hasUser) return <Redirect to="/"></Redirect>
      return (
        <div>
          
          <Background/>
          <Modal visible={previewVisible}  footer=""  onCancel={this.handleCancel}>
              文明上网，不发奇怪言论信息
          </Modal>
        <Form  onSubmit={this.handleSubmit} className="register-form">
          <Form.Item>
              <div className="logo">
                <Logo/>
                <h2>注册信息</h2>
              </div>
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [{required: true,message: '密码不能为空!'}, {validator: this.validateToNextPassword}],
            })(
              <Input.Password placeholder="密码"/>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [{required: true, message: '确认密码不能为空!'},{ validator: this.compareToFirstPassword,}],
            })(<Input.Password placeholder="确认密码" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '昵称不能为空!', whitespace: true }],
            })(
              <Input placeholder="昵称"
              suffix={
                <Tooltip title="起个好听的名字吧!">
                  <Icon type="question-circle-o" />
                </Tooltip>
              }
            />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('gender',{
              initialValue: '1',
            })(
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="0">女</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('residence', {
              initialValue: ['福建', '福州市', '鼓楼区'],
              rules: [
                { type: 'array', required: true, message: '请选择所在地址!' },
              ],
            })(<Cascader placeholder="地址" options={provinceList} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('birthdate', {
              rules: [{type: 'object',required: true, message: '请选择出生日期!' }],
            })(
              <DatePicker disabledDate={this.disabledDate} placeholder="出生日期" locale={locale} style={{width:"100%"}}/>
            )}
          </Form.Item>
          <Form.Item >
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [ {validator: this.validateToAgreement}],
            })(
              <Checkbox>
                我已阅读 <span className="register-read-agreement" onClick={()=>(this.setState({previewVisible:true}))}>《文明上网》</span>，并同意
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              进入
            </Button>
          </Form.Item>
        </Form>
          
        </div>
      );
    }
  }
  
const mapStateToProps =(state)=>({
  hasUser:state.register.hasUser,
})

const mapDispatchToProps=(dispatch)=>({
  SetUser(user){
    dispatch(UserActions.setUser(user));
  },
  LoginError(){
    dispatch(loginActions.loginErrorAction());
  },
  UserExist(){
    dispatch(actions.userExist());
  }
})


export default 
connect(mapStateToProps,mapDispatchToProps)(Form.create({ name: 'register' })(RegistrationForm));
