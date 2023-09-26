import React from 'react'
import { Button, Form, Modal, Input, message,Tree,Table, Card, Dropdown } from 'antd';
import './index.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const { TextArea } = Input;
const items = [
  {label: '删除数据库',key: 'del'}
]
const columns = [
  {
    title: '字段编码',
    key: 'code',
    dataIndex: 'code'
  },
  {
    title: '字段类型',
    key: 'type',
    dataIndex: 'type'
  }
]

export default function DataBase() {

  const [showModal,setShowModal] = useState(false)
  const [showSchemaModal,setShowSchemaModa] = useState(false)
  const [entityName,setEntityName] = useState('')
  const [entityCode,setEntityCode] = useState('')
  const [schema,setSchema] = useState('')
  const [entityList,setEntityList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [tableData,setTableData] = useState([]);
  const [tableColumns,setTableColumns] = useState([]);
  const [schemaTableData,setSchemaTableData] = useState([]);
  const [showEditSchema,setShowEditSchema] = useState(false);
  const [textArea,setTextArea] = useState(false)
  const [schemaEdit,setSchemaEdit] = useState({})


  const getEntityList = async () => {
    const res = await axios.post(`http://${window.location.hostname}:80/entity/getEntityList`,{
      username: JSON.parse(localStorage.getItem('user')).username
    })
    if(res.data.data){
      const entityList = res.data.data.map((item,index) => {
        return {
          title: <Dropdown menu={{onClick:changeConnection(item.entityCode),items}} trigger={['contextMenu']}><div style={{fontSize:'18px'}}>{item.entityName}</div></Dropdown>,
          key: item.entityCode,
          children: Object.keys(item.entitySchema).map((_item,_index) => {
            return {
              title: <div style={{fontSize:'16px'}}>{_item}</div>,
              key: item.entityCode + '.' + _item
            }
          })
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

  useEffect(() => {
    let schemaData;
    try {
      schemaData = JSON.parse(schema);
    } catch (error) {
      schemaData = {}
    }
    setSchemaTableData(Object.keys(schemaData).map(item => {
      return {
        code: item,
        type: schemaData[item]
      }
    }))
  },[schema])

  const handleOk = () => {
    if(entityName && entityCode){
      setShowModal(false)
      setShowSchemaModa(true)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setEntityName('')
    setEntityCode('')
  }

  const schemaHandleOk = async () => {
    const res = await axios.post(`http://${window.location.hostname}:80/entity/addEntity`,{
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
    setSchema('')
  }

  const onSelect = async (data) => {
    const res = await axios.post(`http://${window.location.hostname}:80/entity/getEntityItem`,{
      entityCode: data[0]
    });
    const columns = new Set();
    if(res.data.code === 200){
      const resList = res.data.data;
      setTableData(resList)
      for(let i=0;i<resList.length;i++){
        const resData = resList[i];
        Object.keys(resData).forEach(propName => {
          columns.add(propName);
        })
      }
      setTableColumns(Array.from(columns).map(item => {
        return {
          key: item,
          dataIndex: item,
          title: item
        }
      }))
    }else{
      messageApi.open({
        type: 'error',
        content: '查询失败',
      });
    }
  }

  const changeConnection = (entityCode) => {
    return (menuItem,e) => {
      switch (menuItem.key){
        case 'del' : {
          axios.post(`http://${window.location.hostname}:80/entity/delEntityItem`,{
            entityCode
          })
          .then(res => {
            getEntityList();
            messageApi.open({
              type: 'sucess',
              content: '删除成功',
            });
          })
          .catch(err => {
            messageApi.open({
              type: 'error',
              content: '删除失败',
            });
          })
          break;
        }
      }
    }
  }

  const changeSchemaEdit = (dataIndex) => {
    return (e) => {
      if(dataIndex === 'code'){
        schemaEdit.code = e.target.value
      }else{
        schemaEdit.type = e.target.value
      }
      setSchemaEdit({...schemaEdit})
    }
  }

  const addSchema = () => {
    const schemaObj = JSON.parse(schema || '{}');
    schemaObj[schemaEdit.code] = schemaEdit.type;
    setSchema(JSON.stringify(schemaObj))
    setShowEditSchema(false)
    setSchemaEdit({})
  }

  return (
    <div style={{overflow:'hidden'}}>
      {contextHolder}
      <div style={{display:'flex'}} className='DBHeader'>
        <h2 style={{position:'absolute',left:'100px',color:'rgb(192, 190, 230)'}}>基于MongoDB实现动态创建表，字段</h2>
        <Button style={{position:'absolute',right:'20px',top:'20px'}} onClick={() => {setShowModal(true)}}>新建数据库</Button>
      </div>
      <div className='DBContainer'>
        <Card className='DBLeftList'>
          <h2>数据库表：</h2>
          <Tree onSelect={onSelect} treeData={entityList} />
        </Card>
        <Card className='DBRightTable'>
          <Table dataSource={tableData} columns={tableColumns}></Table>
        </Card>
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
        {textArea ? <div>
          <Button onClick={() => {setTextArea(false)}} style={{float:'right'}} type='text'>表格编辑</Button>
          <TextArea value={schema} onChange={e => setSchema(e.target.value)} rows={4} placeholder="请输入数据库表中的字段"/>
        </div>:
        <div>
          <Button style={{float:'right'}} type='text' onClick={() => {setShowEditSchema(true)}}>新增</Button>
          <Button onClick={() => {setTextArea(true)}} style={{float:'right'}} type='text'>JSON编辑</Button>
          <Table
            columns={columns}
            dataSource={schemaTableData}
          />
          <Modal open={showEditSchema} closable={false} okText='添加' cancelText='取消' onCancel={() => {setShowEditSchema(false)}} onOk={addSchema}>
              <Form>
                <Form.Item label='字段编码'>
                  <Input value={schemaEdit.code} onChange={changeSchemaEdit('code')}/>
                </Form.Item>
                <Form.Item label='字段类型'>
                  <Input value={schemaEdit.type} onChange={changeSchemaEdit('type')}/>
                </Form.Item>
              </Form>
          </Modal>
        </div>}
      </Modal>
    </div>
  )
}
