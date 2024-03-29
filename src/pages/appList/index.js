import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button,Input, message, Modal,Divider, Select  } from 'antd';
import { useNavigate } from "react-router-dom";
import './index.css'
import axios from 'axios';
import {DeleteOutlined,DatabaseOutlined,FormOutlined,InsertRowBelowOutlined,UsergroupDeleteOutlined} from '@ant-design/icons';
import Store from '../../store';
const { Search } = Input

export default function PageList() {

  const navigate  = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [pageList,setPageList] = useState([])
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [pageName,setPageName] = useState('')
  const [pageType,setPageType] = useState('PC')
  const [searchValue,setSearchValue] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user){
      axios.post(`http://${window.location.hostname}:80/login/getUser`,{
        username: user.username,
        password: user.password
      }).then(res => {
        if(res.data.data){
          getPageList();
        }else{
          navigate('/login');
        }
      })
    }
  },[])

  useEffect(() => {
    window.stackIndex = 0;
    window.attributeStack = [];
  },[])


  const onSearch = (value) => {
    setSearchValue(value)
  }

  const getPageList = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    axios.post(`http://${window.location.hostname}:80/pageJson/findAllPage`,{
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
    setIsModalOpen(true);
    setPageName('')
    setPageType('PC')
  }
  
  const handleOk = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    axios.post(`http://${window.location.hostname}:80/pageJson/addPage`,{
      pageName: pageName,
      pageId:'pageInfo_' + new Date().getTime(),
      pageJson: {},
      username: user.username,
      isMobile: pageType === 'mobile',
      is3D: pageType === '3D'
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

  const changePageType = (value) => {
    setPageType(value)
  }

  const deletePage = (pageId) => {
    return () => {
      axios.post(`http://${window.location.hostname}:80/pageJson/deletePage`,{
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
    navigate('/login')
  }

  const toXinBuilderDoc = () => {
    window.open(`http://${window.location.hostname}:9000/#/Xinbuilder/createPage`)
  }

  const toXinBuilderCom = () => {
    window.open(`http://${window.location.hostname}:3000/#/`)
  }

  const toDataBase = () => {
    if(window.location.hostname.includes('localhost')) {
      window.open(`/#/dataBase`)
    }else{
      window.open('http://www.xbuilder.top/builder/#/dataBase')
    }
  }

  const toSquare = () => {
    if(window.location.hostname.includes('localhost')) {
      window.open(`/#/square`)
    }else{
      window.open('http://www.xbuilder.top/builder/#/square')
    }
  }

  const toSocket = () => {
    if(window.location.hostname.includes('localhost')) {
      window.open(`/#/socket`)
    }else{
      window.open('http://www.xbuilder.top/builder/#/socket')
    }
  }

  const releasePage = (pageId) => {
    return () => {
      axios.post(`http://${window.location.hostname}:80/pageJson/releasePage`, {
        pageId
      })
      .then(res => {
        messageApi.open({
          type: 'success',
          content: '发布成功',
        });
        getPageList()
      })
      .catch(err => {
        messageApi.open({
          type: 'error',
          content: '发布失败',
        });
      })
    }
  }

  const copyToClipboard = (pageId) => {
    const text = `http://www.xbuilder.top/renderPage?pageId=${pageId}`
    return () => {
      if(!navigate.clipboard) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
    
        try {
            document.execCommand('copy');
            message.success('URL已经复制到剪贴板，可在浏览器中打开')
        } catch (err) {
          message.error('URL生成失败')
        }
    
        document.body.removeChild(textArea);
      }else{
        navigator.clipboard.writeText(text).then(function() {
          message.success('URL已经复制到剪贴板，可在浏览器中打开')
        }, function(err) {
          message.error('URL生成失败')
        });
      }
    }
  }

  return (
    <div className='PageList'>
      {contextHolder}
      <div className='pageLeft'>
        <div className='leftHeader'>XinBuilder</div>
        <div className='leftDiscribe'>轻量级的低代码平台</div>
        <Divider />
        <Button onClick={toDataBase} size='large' type='link'>构建数据库</Button>
        <DatabaseOutlined />
        <Divider />
        <Button onClick={toXinBuilderCom} size='large' type='link'>自定义组件</Button>
        <FormOutlined />
        <Divider />
        <Button onClick={toSquare} size='large' type='link'>前往大广场</Button>
        <InsertRowBelowOutlined />
        <Divider />
        <Button onClick={toSocket} size='large' type='link'>消息通讯录</Button>
        <UsergroupDeleteOutlined />
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
            <Button onClick={toXinBuilderDoc} type='link'>使用文档</Button>
            <Button type='link'>API参考</Button>
            <Button type='link'>管理控制台</Button>
            <Button onClick={refeshLogin} type='link'>退出登录</Button>
          </div>
        </div>
        <Divider />
        <div className='PageBody'>
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
                      {
                        item.isRelease ? <Button style={{width: '87px'}} disabled type='text'>已发布</Button>:
                        <Button type='text' onClick={releasePage(item.pageId)}>发布页面</Button>
                      }
                      <Button type='text' onClick={copyToClipboard(item.pageId)}>生成URL</Button>
                    </div>
                  </Card>
                </Col>
              })
            }
          </Row>
        </div>
      </div>
      <Modal title="创建页面" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='创建' cancelText='取消'>
          <Input addonBefore="页面名称" value={pageName} onChange={changePageName} />
          <p>页面类型</p>
          <Select style={{width:'200px'}} value={pageType} onChange={changePageType} options={[{label: 'PC端', value: 'PC'},{label: '移动端', value:'mobile'},{label: '3D页面', value: '3D'}]}></Select>
      </Modal>
    </div>
  )
}
