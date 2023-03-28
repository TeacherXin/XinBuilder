import React, { useState,useEffect } from 'react'
import './index.css'

export default function Table(props) {

  const [row,setRow] = useState(0);
  const [col,setCol] = useState(0);
  const [tableData,setTableData] = useState([[]])

  const [showModal,setShowModal] = useState(true)
  const {onContextMenu,actionJs,styleCss,changeTableData,tableRes,renderFlag} = props

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  useEffect(() => {
    if(changeTableData){
      changeTableData(tableData)
    }
  },[tableData])

  const changeRow = (e) => {
    if(e.target.value === ''){
      setRow(0)
    }else{
      setRow(parseInt(e.target.value))
    }
  }

  const changeCol = (e) => {
    if(e.target.value === ''){
      setCol(0)
    }else{
      setCol(parseInt(e.target.value))
    }
  }

  const submitData = () => {
    setShowModal(false);
    const data = new Array(row + 1);
    for(let i=0;i<data.length;i++){
      if(i === 0){
        data[i] = new Array(col).fill(0);
        for(let ii=0;ii<data[i].length;ii++){
          data[i][ii] = {caption: '标题'}
        }
      }else{
        data[i] = new Array(col).fill(0);
        for(let ii=0;ii<data[i].length;ii++){
          data[i][ii] = {caption: '内容'}
        }
      }
    }
    setTableData(data)
  }

  const changeTableItem = (item) => {
    return () => {
      if(renderFlag){
        return;
      }
      item.showInput = true
      setTableData([...tableData])
    }
  }

  const changeItemValue = (item) => {
    return (e) => {
      item.caption = e.target.value;
      setTableData([...tableData])
    }
  }

  const blurItemValue = (item) => {
    return () => {
      item.showInput = false;
      setTableData([...tableData])
    }
  }

  return (
    <div onContextMenu={onContextMenu}>
      <table className={renderFlag? 'renderComponentTable' : 'componentTable'} style={{display: showModal && !renderFlag ? 'none' : 'block'}}>
        {
          <tr>
            {tableRes?.[0].map(item => {
              return <th onDoubleClick={changeTableItem(item)}>{item.showInput ? <input value={item.caption} onChange={changeItemValue(item)} onBlur={blurItemValue(item)} /> : item.caption}</th>
            })}
          </tr>
        }
        {
          (tableRes || []).slice(1).map(item => {
            return <tr>
              {
                item.map(item => {
                return <td onDoubleClick={changeTableItem(item)}>{item.showInput ? <input value={item.caption} onChange={changeItemValue(item)} onBlur={blurItemValue(item)} /> : item.caption}</td>
                })
              }
            </tr>
          })
        }
      </table>
      <div style={{display: showModal && !renderFlag ? 'block' : 'none'}}>
        <input onChange={changeRow} placeholder='请输入表格行数' />
        <input onChange={changeCol} placeholder='请输入表格列数' />
        <button onClick={submitData}>确定</button>
      </div>
    </div>
  )
}
