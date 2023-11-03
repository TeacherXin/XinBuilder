import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, message,Select } from 'antd';
import axios from 'axios';
import { UnorderedListOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";

export default function Square() {
  const [pageList,setPageList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const navigate  = useNavigate();

  useEffect(() => {
    getPageList();
  },[])

  const getPageList = () => {
    axios.post(`http://${window.location.hostname}:80/pageJson/findAllPage`,{})
    .then(res => {
      setPageList(res.data.data)
    })
    .catch(err => {
      messageApi.open({
        type: 'error',
        content: '获取页面列表失败',
      });
    })
  }

  const toShowPage = (pageId) => {
    return () => {
      navigate('/metaRender',{state: {pageId}});
    }
  }

  const filterPageList = (list) => {
    return list.filter(item => item.isRelease)
  }

  const handleChange = () => {

  }

  const toSocket = (toName) => {
    return async () => {
      const username = JSON.parse(localStorage.getItem('user')).username;
      const res = await axios.post(`http://${window.location.hostname}:80/talk-record/addTalkRecord`,{
        fromName: username,
        toName,
        messageList: []
      })
      if(res) {
        navigate('/socket',{state: {toName}});
      }
    }
  }
 
  return (
    <div>
      {contextHolder}
      <div style={{display:'flex'}} className='DBHeader'>
        <UnorderedListOutlined style={{color:'#1677ff', fontSize:'28px', cursor:'pointer', marginTop:'23px', marginLeft:'10px'}}/>
        <h2 style={{position:'absolute',left:'100px',color:'rgb(192, 190, 230)'}}>在XinBuilder广场中，展示自己的页面和组件吧</h2>
        <Select
          defaultValue="page"
          style={{ width: 120, position:'absolute',right: '50px', top:'20px' }}
          onChange={handleChange}
          options={[
            { value: 'page', label: '页面' },
            { value: 'component', label: '组件' },
          ]}
        />
      </div>
      <div className='PageBody'>
        <Row style={{width:'100%'}} gutter={16}>
          {
            (filterPageList(pageList) || []).map(item => {
              return <Col style={{marginTop:'10px'}} key={item._id} span={6}>
                <Card
                  title={<div><span>{item.pageName || '匿名'}</span><span style={{width:'100px', position:'absolute', right:'20px'}}>作者：{item.username}</span></div>}
                  bordered={false}
                  headStyle={{fontSize:'14px'}}
                >
                  <div style={{height:'50px'}}>
                    <Button type='text' onClick={toShowPage(item.pageId)}>预览页面</Button>
                    <Button type='text' onClick={toShowPage(item.pageId)}>复制JSON</Button>
                    <Button disabled={JSON.parse(localStorage.getItem('user')).username === item.username} type='text' onClick={toSocket(item.username)}>联系作者</Button>
                  </div>
                </Card>
              </Col>
            })
          }
        </Row>
      </div>
    </div>
  )
}
