import React,{useEffect, useState} from 'react'
import { Table } from 'antd';
import Store from '../../Store';
import _ from 'lodash'
import subscribe from '../../DefineHook/subscribe';


export default function XinTable(props) {

  const {comId,bordered,showHeader,size} = props;
  const attributeMap = _.cloneDeep(Store.getState().attributeMap);
  const [update,setUpdate] = useState({})

  const findNodeByComId = (id) => {
    for(let propName in attributeMap){
      if(propName === id){
        return attributeMap[propName];
      }
      if(attributeMap[propName].childList){
        for(let _propName in attributeMap[propName].childList){
          if(_propName === id){
            return attributeMap[propName].childList[_propName]
          }
        }
      }
    }
  }

  subscribe(() => {
    setUpdate({})
  },[])

  useEffect(() => {
    const columnsData = findNodeByComId(comId)?.columnsData || [
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
    findNodeByComId(comId).columnsData = columnsData;
    Store.dispatch({type:'change',attributeMap})
  },[])

  return (
    <div>
      <Table
        dataSource={findNodeByComId(comId).tableData}
        columns={findNodeByComId(comId).columnsData}
        bordered={bordered}
        showHeader={!showHeader}
        size={size}
        pagination={false}
      />
    </div>
  )
}
