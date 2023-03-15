import {React, useState} from 'react'
import './index.css'

export default function RenderCom(props) {

  //用来存储画布区的所有组件，以及组件的属性
  const [comList, setComList] = useState([])

  let startLeft,startTop,endLeft,endTop,itemLeft,itemTop;
  //用来判断是左侧列表拖拽还是画布区拖拽
  let dragCom = null;
  const {NowCom} = props

  const onDrop = (e) => {
    //用来确定拖拽的节点的位置

    endLeft = e.clientX;
    endTop = e.clientY;

    let style;
    if(startLeft && startTop){
      style = {
        position: 'absolute',
        left: (endLeft - startLeft) + itemLeft + 'px',
        top: (endTop - startTop) + itemTop + 'px',
      }
    }else{
      style = {
        position: 'absolute',
        left: e.clientX + 'px',
        top: e.clientY + 'px',
      }
    }
    setComList([...comList,{component: dragCom || NowCom.component, style,dragId: NowCom.name + e.clientX}])
  }

  //通过删除后再添加拖拽的节点，实现节点的画布区拖拽
  const onDragStart = (e) => {
    const index = comList.findIndex(item => item.dragId === e.target.id);
    if(index > -1){
      const component = comList.splice(index,1)[0].component;
      dragCom = component;
    }
    setComList(comList);
    startLeft = e.clientX;
    startTop = e.clientY;
    itemLeft = e.target.offsetLeft;
    itemTop = e.target.offsetTop;
  }

  const onDragEnter = (e) => {
    e.preventDefault()
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='renderCom'>
      {comList.map(item => {
        return <div id={item.dragId} key={item.dragId} onDragStart={onDragStart} draggable style={item.style}>
          {item.component}
        </div>
      })}
    </div>
  )
}
