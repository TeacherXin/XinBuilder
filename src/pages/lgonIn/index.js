import React, {useState} from 'react'
import './index.css'
import { Button, Checkbox, Card, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const tabList = [
  {
    key: 'tab1',
    tab: '普通登录',
  },
  {
    key: 'tab2',
    tab: '短信验证码登录',
  },
];

export default function Lgoin(props) {
  const navigate  = useNavigate();
  // 用来表示登录的tab页签
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  // 登录的账号
  const [username,setUserName] = useState('')
  // 登录的密码
  const [password,setPassword] = useState('')
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * 登录方法，调用接口，查询数据库，返回结果
   * @level 3
   */
  const login = async () => {
    axios.post(`http://${window.location.hostname}:80/login/getUser`,{
      username,
      password
    }).then(res => {
      if(res.data.data){
        messageApi.success('登录成功');
        localStorage.setItem('user',JSON.stringify({username: res.data.data.username,password:res.data.data.password}))
        navigate('/');
      }else{
        messageApi.error('用户名密码不正确')
      }
    })
  }

  const contentList = {
    tab1: <div>
      <Form>
        <Form.Item
          label="账号"
          name="username"
        >
          <Input placeholder='admin' onChange={(e) => {setUserName(e.target.value)}} value={username} />
        </Form.Item>
        <Form.Item
          label="密码"
          name="psw"
        >
          <Input.Password placeholder='666666' onChange={(e) => {setPassword(e.target.value)}} value={password} />
        </Form.Item>
        <Form.Item>
          <Checkbox>记住账号</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button onClick={login} type="primary" style={{width:'100%'}}>登录</Button>
        </Form.Item>
      </Form>
    </div>,
    tab2: <div>
    <Form>
      <Form.Item
        label="手机号"
        name="phone"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="验证码"
        name="code"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Checkbox>记住账号</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{width:'100%'}}>登录</Button>
      </Form.Item>
    </Form>
  </div>,
  };

  /**
   * 切换tab页签的时候触发
   * @param {string} key tab页签的key
   * @level 3
   */
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  
  return (
    <div className='mainLogin'>
      <div className='header'>
        <div className='title'>XinBulder</div>
        <div className='discription'>轻量级的低代码平台</div>
      </div>
      {contextHolder}
      <div className='login'>
        <div className='rightForm'>
          <Card
            className='card'
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={onTab1Change}
            headStyle={{height:'80px'}}
          >
            {contentList[activeTabKey1]}
          </Card>
        </div>
      </div>
    </div>
  )
}
