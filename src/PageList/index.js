import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button,Input, message, Modal,Divider  } from 'antd';
import { useNavigate } from "react-router-dom";
import './index.css'
import axios from 'axios';
import {DeleteOutlined} from '@ant-design/icons';
import Store from '../Store';
import Lgoin from '../LgonIn';
const { Search } = Input

export default function PageList() {

  const navigate  = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [pageList,setPageList] = useState([])
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [pageName,setPageName] = useState('')
  const [searchValue,setSearchValue] = useState('')
  const [loginStatu,setLoginStatu] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user){
      axios.post(`http://${window.location.hostname}:3003/login/getUser`,{
        username: user.username,
        password: user.password
      }).then(res => {
        if(res.data.data){
          setLoginStatu(true)
          getPageList();
        }
      })
    }
  },[loginStatu])


  const onSearch = (value) => {
    setSearchValue(value)
  }

  const getPageList = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    axios.post(`http://${window.location.hostname}:3003/pageJson/findAllPage`,{
      username: user.username
    })
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

  const toBuilderPage = (pageId) => {
    return () => {
      Store.dispatch({type:'change',attributeMap:{}})
      navigate('/home',{state: {pageId}});
    }
  }

  const toShowPage = (pageId) => {
    return () => {
      navigate('/metaRender',{state: {pageId}});
    }
  }

  const addNewPage = () => {
    if(loginStatu){
      setIsModalOpen(true);
      setPageName('')
    }else{
      messageApi.warning('请先登录')
    }
  }
  
  const handleOk = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    axios.post(`http://${window.location.hostname}:3003/pageJson/addPage`,{
      pageName: pageName,
      pageId:'pageInfo_' + new Date().getTime(),
      pageJson: {},
      username: user.username
    })
    .then(res => {
      messageApi.open({
        type: 'success',
        content: '新建页面成功',
      });
      getPageList()
      setIsModalOpen(false)
      Store.dispatch({type:'change',attributeMap:{}})
    })
    .catch(err => {
      messageApi.open({
        type: 'error',
        content: '新建页面失败',
      });
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const changePageName = (e) => {
    setPageName(e.target.value)
  }

  const deletePage = (pageId) => {
    return () => {
      axios.post(`http://${window.location.hostname}:3003/pageJson/deletePage`,{
        pageId
      })
      .then(res => {
        messageApi.open({
          type: 'success',
          content: '删除成功',
        });
        getPageList()
      })
      .catch(err => {
        messageApi.open({
          type: 'error',
          content: '删除失败',
        });
      })
    }
  }

  const getSearchList = (list) => {
    return (list || []).filter(item => {
      return item.pageName.indexOf(searchValue) > -1
    })
  }

  const refeshLogin = () => {
    localStorage.removeItem('user');
    setLoginStatu(false)
  }

  return (
    <div className='PageList'>
      {contextHolder}
      <div className='pageLeft'>
        <div className='leftHeader'>XinBuilder</div>
        <div className='leftDiscribe'>轻量级的低代码平台</div>
        <Divider />
      </div>
      <div className='pageRight'>
        <div className='PageHeader'>
          <Search
            style={{ width: 304 }}
            onSearch={onSearch}
          />
          <Button className='pageButton' onClick={addNewPage}>新建页面</Button>
          <div style={{display:'flex',float:'right'}}>
            <Button type='link'>使用文档</Button>
            <Button type='link'>API参考</Button>
            <Button type='link'>生态系统</Button>
            <Button onClick={refeshLogin} type='link'>退出登录</Button>
          </div>
        </div>
        <Divider />
        {loginStatu ? <div className='PageBody'>
          <Row style={{width:'100%'}} gutter={16}>
            {
              (getSearchList(pageList) || []).map(item => {
                return <Col style={{marginTop:'10px'}} key={item._id} span={6}>
                  <Card
                    title={<div><span>{item.pageName || '匿名'}</span><DeleteOutlined onClick={deletePage(item.pageId)}style={{float:'right',cursor:'pointer'}} /></div>}
                    bordered={false}
                    headStyle={{fontSize:'14px'}}
                  >
                    <div style={{height:'50px'}}>
                      <Button type='text' onClick={toBuilderPage(item.pageId)}>编辑页面</Button>
                      <Button type='text' onClick={toShowPage(item.pageId)}>预览页面</Button>
                    </div>
                  </Card>
                </Col>
              })
            }
          </Row>
        </div> : <Lgoin setLoginStatu={setLoginStatu} />}
      </div>
      <Modal title="创建页面" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input addonBefore="页面名称" value={pageName} onChange={changePageName} />
      </Modal>
    </div>
  )
}
