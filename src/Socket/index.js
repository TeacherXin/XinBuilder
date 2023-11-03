import React, { useEffect, useState,useRef } from 'react'
import { Button, Input, Card, Menu } from 'antd';
import {UnorderedListOutlined} from '@ant-design/icons';
import { useLocation } from 'react-router-dom'
import './index.css'
import axios from 'axios';

export default function Socket() {
  const state = useLocation().state;
  const [value, setValue] = useState('')
  const [ws, setWs] = useState(null)
  const [items, setItems] = useState([])
  const [sendName, setSendName] = useState('')
  const [messageList, setMessageList] = useState([])
  const [peopleList, setPeopleList] = useState([])
  const scrollRef = useRef({current: null})

  // 请求websocket连接
  useEffect(() => {
    var ws = new WebSocket('ws://localhost:3004');
    ws.onopen = function () {
      ws.send(JSON.stringify({message: 'start', name: JSON.parse(localStorage.getItem('user')).username}));
    }
    ws.onmessage = async function(mes) {
      const result = JSON.parse(mes.data)
      await addOneToMessageList(result.message, result.fromName, result.toName);
    }
    setWs(ws)

    return () => {
      ws.close()
    }
  },[])

  // 根据用户名获取聊天的人员记录
  useEffect(() => {
    getPeoppleList()
  },[])

  // 如果是从联系作者的入口进来的，给sendName附上初始值
  useEffect(() => {
    if(state?.toName) {
      setSendName(state.toName);
    }
  },[])

  // 当sendName发生变化时，切换聊天记录
  useEffect(() => {
    getNameMesList()
  },[sendName])

  // 根据聊天列表生成items，给Menu组件
  useEffect(() => {
    const items = (peopleList || []).map(item => {
      return {
        label: <div className='menu'><p className='title'>{item}</p><p style={{color:'black'}} className='content'>{messageList[messageList.length - 1]?.message || '暂无消息'}</p></div>,
        key: item
      }
    })
    setItems(items)
  },[peopleList,messageList])
 
  const getPeoppleList = async () => {
    const username = JSON.parse(localStorage.getItem('user')).username;
    const result = await axios.post(`http://${window.location.hostname}:80/talk-record/findAllTalkRecord`, {
      fromName: username
    })
    setPeopleList(result?.data?.data || [])
  }

  const getMessageList = async (fromName, toName) => {
    let result = await axios.post(`http://${window.location.hostname}:80/talk-record/findReacordMessageList`, {
      fromName,
      toName
    })
    return result?.data?.data?.messageList || []
  }

  const getNameMesList = async  () => {
    const username = JSON.parse(localStorage.getItem('user')).username;
    const list = await getMessageList(username, sendName);
    setMessageList(list)
  }

  const addOneToMessageList = async (mes, fromName, toName) => {
    const username = JSON.parse(localStorage.getItem('user')).username;
    axios.post(`http://${window.location.hostname}:80/talk-record/addOneToTalkRecord`, {
      fromName:fromName ||username,
      toName: toName || sendName,
      message: {
        name: fromName || username,
        message:mes
      }
    }).then(async res => {
      const username = JSON.parse(localStorage.getItem('user')).username;
      const list = await getMessageList(fromName || username, toName || sendName);
      setMessageList(list)
      setValue('');
      console.log(scrollRef.current);
    })
  }

  const sendMessage = async () => {
    if(ws && ws.send) {
      ws.send(JSON.stringify({message: value, fromName: JSON.parse(localStorage.getItem('user')).username,toName: sendName}));
      const username = JSON.parse(localStorage.getItem('user')).username;
      setMessageList([...messageList,{message: value, name: username}])
      setValue('');
    }else{
      await addOneToMessageList(value);
    }
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const menuClick = async (e) => {
    setSendName(e.key);
  };

  return (
    <div className='socket'>
      <div style={{display:'flex'}} className='DBHeader'>
        <UnorderedListOutlined style={{color:'#1677ff', fontSize:'28px', cursor:'pointer', marginTop:'23px', marginLeft:'10px'}}/>
        <h2 style={{position:'absolute',left:'100px',color:'rgb(192, 190, 230)'}}>在XinBuilder通讯录中，和伙伴交流你的看法</h2>
      </div>
      <div className='content'>
        <Card>
          <div style={{width: '256px'}}>
            <Menu
              onClick={menuClick}
              mode="inline"
              items={items}
              style={{height:500}}
              selectedKeys={sendName}
            />
          </div>
          <div style={{width:'1000px'}}>
            <div ref={ref => scrollRef.current = ref} style={{overflow:'scroll',padding:'20px',height:'240px', border:'1px solid gray',marginBottom:'10px',borderRadius:'5px'}}>
              {
                messageList.map((item,index) => {
                  return <div key={index} className={sendName === item.name ? 'provider' : 'providerOwn'}>
                  <span style={{marginLeft:'20px'}}>{item.message}</span>
                </div>
                })
              }
            </div>
            <Input.TextArea value={value} onChange={onChange} style={{height:'160px'}} />
            <Button onClick={sendMessage} style={{float:'right', marginTop:'10px'}}>发送</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
