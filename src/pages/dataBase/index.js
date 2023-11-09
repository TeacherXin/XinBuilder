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

  // 用来展示新建数据库的弹窗
  const [showModal,setShowModal] = useState(false)
  // 用来展示编辑数据库schema的弹窗
  const [showSchemaModal,setShowSchemaModa] = useState(false)
  // 数据库名称
  const [entityName,setEntityName] = useState('')
  // 数据库编码
  const [entityCode,setEntityCode] = useState('')
  // 数据库的schema 字符串形式的输入
  const [schema,setSchema] = useState('')
  // 所有数据库信息的集合
  const [entityList,setEntityList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  // 数据库字段展示表格的数据
  const [tableData,setTableData] = useState([]);
  // 数据库字段展示表格中的columns，表头
  const [tableColumns,setTableColumns] = useState([]);
  // 数据库字段展示表格中的data，表格数据
  const [schemaTableData,setSchemaTableData] = useState([]);
  // 展示编辑字段编码和名称的弹窗
  const [showEditSchema,setShowEditSchema] = useState(false);
  // 通过json编辑的schema
  const [textArea,setTextArea] = useState(false)
  // 数据库字段的编码和类型的集合 { code, type }
  const [schemaEdit,setSchemaEdit] = useState({})


  /**
   * 通过调用getEntityList接口，获取所有的数据库集合list
   * @level 3
   */
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

  /**
   * 调用getEntityList
   * @level 3
   */
  useEffect(() => {
    getEntityList()
  },[])

  /**
   * 将获取到的schema，转换为数据库字段信息表格的表头，columns
   * @level 3
   */
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

  /**
   * 新建数据库后，点击保存触发。
   * @level 3
   */
  const handleOk = () => {
    if(entityName && entityCode){
      setShowModal(false)
      setShowSchemaModa(true)
    }
  }

  /**
   * 新建数据库后，点击取消触发
   * @level 3
   */
  const handleCancel = () => {
    setShowModal(false)
    setEntityName('')
    setEntityCode('')
  }

  /**
   * 编辑好数据库的schema后，点击新建按钮触发。调用接口保存相关数据库信息
   * @level 3
   */
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

  /**
   * 编辑好数据库的schema后，点击取消按钮触发。调用接口保存相关数据库信息
   * @level 3
   */
  const schemaHandleCancel =() => {
    setShowSchemaModa(false);
    setShowModal(true)
    setSchema('')
  }

  /**
   * 左侧树中，选中某条数据库触发，调取getEntityItem接口获取到相关数据。更新右侧表格
   * @param {Object} data 数据库Tree中的节点
   * @level 3
   */
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

  /**
   * 调用delEntityItem接口，删除对应code的数据库
   * @param {string} entityCode 数据库的编码
   * @level 3
   * @returns 
   */
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

  /**
   * 更新字段的编码或者类型
   * @param {string} dataIndex code | type
   * @returns 
   * @level 3
   */
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

  /**
   * 新增schema字段
   * @level 3
   */
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
