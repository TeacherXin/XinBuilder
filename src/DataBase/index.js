import React from 'react'
import { Button, Form, List, Modal, Input, message,Card } from 'antd';
import './index.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const { TextArea } = Input;

export default function DataBase() {

  const [showModal,setShowModal] = useState(false)
  const [showSchemaModal,setShowSchemaModa] = useState(false)
  const [entityName,setEntityName] = useState('')
  const [entityCode,setEntityCode] = useState('')
  const [schema,setSchema] = useState('')
  const [entityList,setEntityList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

  const getEntityList = async () => {
    const res = await axios.post(`http://${window.location.hostname}:3003/entity/getEntityList`,{
      username: JSON.parse(localStorage.getItem('user')).username
    })
    if(res.data.data){
      const entityList = res.data.data.map(item => {
        return {
          title: item.entityName,
          entitySchema: item.entitySchema
        }
      })
      setEntityList(entityList)
    }else{
      messageApi.open({
        type: 'error',
        content: '获取失败',
      });
    }
  }

  useEffect(() => {
    getEntityList()
  },[])

  const handleOk = () => {
    if(entityName && entityCode){
      setShowModal(false)
      setShowSchemaModa(true)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const schemaHandleOk = async () => {
    const res = await axios.post(`http://${window.location.hostname}:3003/entity/addEntity`,{
      entityName: entityName,
      entityCode: entityCode,
      entitySchema: JSON.parse(schema?.replaceAll('\n','') || '{}'),
      username: JSON.parse(localStorage.getItem('user')).username,
    })
    if(res.data.code === 200){
      setShowSchemaModa(false);
      setEntityCode('')
      setEntityName('')
      setSchema('')
      getEntityList()
    }else{
      messageApi.open({
        type: 'error',
        content: '新建失败',
      });
    }
  }

  const schemaHandleCancel =() => {
    setShowSchemaModa(false);
    setShowModal(true)
  }

  return (
    <div style={{overflow:'hidden'}}>
      {contextHolder}
      <div className='DBHeader'>
        <Button style={{position:'absolute',right:'20px'}} onClick={() => {setShowModal(true)}}>新建数据库</Button>
      </div>
      <div className='DBContainer'>
          <List
            itemLayout="horizontal"
            dataSource={entityList}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={<h2>数据库表：{item.title}</h2>}
                  description={
                    <Card title={item.title + '表字段'}>
                      {
                        Object.keys(item.entitySchema).map(_item => {
                          return <Card.Grid style={{width:'120px'}}>{_item}</Card.Grid>
                        })
                      }
                    </Card>
                  }
                />
              </List.Item>
            )}
          />
      </div>
      <Modal closable={false} title="新建数据库表" open={showModal} okText='下一步' cancelText='取消' onOk={handleOk} onCancel={handleCancel}>
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input your entityName!',
                },
              ]}
              label='数据库名'
            >
              <Input value={entityName} onChange={(e) => {setEntityName(e.target.value)}}/>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input your entityName!',
                },
              ]}
              label='数据库编码'
            >
              <Input value={entityCode} onChange={(e) => {setEntityCode(e.target.value)}} />
            </Form.Item>
          </Form>
      </Modal>
      <Modal closable={false} open={showSchemaModal} okText='新建' cancelText='上一步' onOk={schemaHandleOk} onCancel={schemaHandleCancel}>
        <TextArea value={schema} onChange={e => setSchema(e.target.value)} rows={4} placeholder="请输入数据库表中的字段"/>
      </Modal>
    </div>
  )
}
