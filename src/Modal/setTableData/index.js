import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Modal } from 'antd';
import Store from '../../store'
import _ from 'lodash'
import subscribe from '../../component/subscribe'
import './index.css'
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

export default function SetTableData(props) {
 
  const {showSetTableData,setShowTableData,comId} = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  const [update,setUpdate] = useState({})
  const [count, setCount] = useState(3);
  const [columnsList,setColumnsList] = useState([])

  const defaultColumns = [
    {
      title:'key',
      dataIndex:'key',
      key:'key',
      editable: true
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
      columnsList.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ]

  useEffect(() => {
    (window.findNodeByComId(comId,attributeMap)?.columnsData || []).forEach(element => {
      element.editable = true
    })
    setColumnsList([...(window.findNodeByComId(comId,attributeMap)?.columnsData || []),...defaultColumns])
  },[showSetTableData])

  subscribe(() => {
    setUpdate({})
  },[])

  const columns = columnsList.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleDelete = (key) => {
    const index = window.findNodeByComId(comId,attributeMap)?.tableData.findIndex((item) => item.key === key);
    window.findNodeByComId(comId,attributeMap)?.tableData.splice(index,1)
    Store.dispatch({type:'change',attributeMap})
  };

  const handleSave = (row) => {
    const newData = [...window.findNodeByComId(comId,attributeMap)?.tableData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    window.findNodeByComId(comId,attributeMap).tableData= newData
    Store.dispatch({type:'change',attributeMap})
  };

  const handleAdd = () => {
    let columnsData = window.findNodeByComId(comId,attributeMap).columnsData;
    const newData = {};
    for(let i=0;i<columnsData.length;i++){
      newData[columnsData[i].dataIndex] = columnsData[i].dataIndex + count
    }
    newData.key = count;
    if(window.findNodeByComId(comId,attributeMap).tableData){
      window.findNodeByComId(comId,attributeMap).tableData.push(newData)
    }else{
      window.findNodeByComId(comId,attributeMap).tableData = [newData]
    }
    Store.dispatch({type:'change',attributeMap})
    setCount(count + 1);
  };

  return (
    <div>
      <Modal
        open={showSetTableData}
        className='editStyle'
        width={1000}
        closable={true}
        footer={null}
        onCancel={() => {setShowTableData(false)}}
      >
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          scroll={{y: 300}}
          columns={columns}
          dataSource={window.findNodeByComId(comId,attributeMap)?.tableData}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          pagination={false}
        />
      </Modal>
    </div>
  )
}
