import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button,Input, message, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import './index.css'
import axios from 'axios';
import {DeleteOutlined} from '@ant-design/icons';
import Store from '../Store';
const { Search } = Input

export default function PageList() {

  const navigate  = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [pageList,setPageList] = useState([])
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [pageName,setPageName] = useState('')

  useEffect(() => {
    getPageList();
  },[])


  const onSearch = () => {

  }

  const getPageList = () => {
    axios.get('http://localhost:3003/pageJson/findAllPage')
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
      navigate('/home',{state: {pageId}});
    }
  }

  const addNewPage = () => {
    setIsModalOpen(true);
    setPageName('')
  }
  
  const handleOk = () => {
    axios.post('http://localhost:3003/pageJson/addPage',{
      pageName: pageName,
      pageId:'pageInfo_' + new Date().getTime(),
      pageJson: {}
    })
    .then(res => {
      messageApi.open({
        type: 'success',
        content: '新建页面成功',
      });
      getPageList()
      setIsModalOpen(false)
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
      axios.post('http://localhost:3003/pageJson/deletePage',{
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

  return (
    <div>
      {contextHolder}
      <div className='PageHeader'>
        <Search
          style={{ width: 304 }}
          onSearch={onSearch}
        />
        <Button onClick={addNewPage}>新建页面</Button>
      </div>
      <div className='PageBody'>
        <Row gutter={16}>
          {
            pageList.map(item => {
              return <Col key={item._id} span={6}>
                <Card title={<div><span>{item.pageName || '匿名'}</span><DeleteOutlined onClick={deletePage(item.pageId)} style={{float:'right',cursor:'pointer'}} /></div>} bordered={false}>
                  <Button type='text' onClick={toBuilderPage(item.pageId)}>Card content</Button>
                </Card>
              </Col>
            })
          }
        </Row>
      </div>
      <Modal title="创建页面" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input addonBefore="页面名称" value={pageName} onChange={changePageName} />
      </Modal>
    </div>
  )
}
