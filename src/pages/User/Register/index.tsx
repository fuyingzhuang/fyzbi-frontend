import {Button, Form, Input, Card, Typography, Upload, message} from 'antd';
import React from 'react';

const {Title} = Typography;
import {history} from '@umijs/max';
import {userRegisterUsingPOST} from "@/services/fyzbi/userController";

const onFinish = (values: any) => {
  console.log('Success:', values)
  if (values.userPassword !== values.checkPassword) {
    message.error('两次密码不一致');
    return;
  }
  userRegisterUsingPOST(values).then(res => {
    if (res.code === 200) {
      message.success('注册成功');
      history.push('/user/login');
    } else {
      message.error(res.message);
    }
  })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const UserRegister: React.FC = () => (
  <div
    style={{
      backgroundImage: "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Card
      style={{
        width: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
      }}
    >
      <Title level={3} style={{textAlign: 'center'}}>
        用户注册
      </Title>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="userAccount"
          rules={[{required: true, message: '用户名不能为空'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="userPassword"
          rules={[{required: true, message: '密码不能为空'}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="checkPassword"
          rules={[{required: true, message: '密码不能为空'}]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          {/* 去登陆按钮*/}
          <Button type="primary" style={{marginLeft: '20px'}} htmlType="button" onClick={() => {
            // 通过路由跳转到登陆页面
            // window.location.href = '/user/login';
            history.push('/user/login');
          }}> 去登陆 </Button>
        </Form.Item>

      </Form>
    </Card>
  </div>
);

export default UserRegister;
