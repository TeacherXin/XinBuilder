import React,{useEffect, useState} from 'react'
import { Table,message } from 'antd';
import Store from '../../store';
import _ from 'lodash'
import subscribe from '../subscribe';


export default function XinTable(props) {

  const {comId,bordered,showHeader,size,styleCss,actionJs} = props;
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const attributeMap = _.cloneDeep(Store.getState().attributeMap);
  const [update,setUpdate] = useState({})

  useEffect((e) => {
    let clickFun = new Function(actionJs?.load);
    clickFun(e)
  },[])

  subscribe(() => {
    setUpdate({})
  },[])

  useEffect(() => {
    const columnsData = window.findNodeByComId(comId,attributeMap)?.columnsData || [
      {
        key: '1',
        title: '标题1',
        type: '文本',
        dataIndex: 'title1'
      },
      {
        key: '2',
        title: '标题2',
        type: '文本',
        dataIndex:'title2'
      },
    ]
    window.findNodeByComId(comId,attributeMap).columnsData = columnsData;
    Store.dispatch({type:'change',attributeMap})
  },[])
  
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"300px","minHeight":"200px"}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {
        minWidth:'300px',
        minHeight:'200px'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth:'300px',
        minHeight:'200px'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])


  return (
    <div>
      {contextHolder}
      <Table
        style={{maxWidth:'1285px',...style}}
        dataSource={window.findNodeByComId(comId,attributeMap).tableData}
        columns={window.findNodeByComId(comId,attributeMap).columnsData}
        bordered={bordered}
        showHeader={!showHeader}
        size={size}
        pagination={false}
      />
    </div>
  )
}
