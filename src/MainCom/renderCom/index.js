import {React, useEffect, useState} from 'react'
import RightClickMenu from './rightClickMenu';
import './index.css'

export default function RenderCom(props) {

  //用来存储画布区的所有组件，以及组件的属性
  const [comList, setComList] = useState([])
  //展示动作弹窗
  const [showAction, setShowAction] = useState(false)
  //动作JS代码
  const [actionJs,setActionJs] = useState('')
  const [actionId,setActionId] = useState()
  const { NowCom , changeRightPanel, atrributeMap, setAttributeMap, comId} = props
  let nowComId = ''
  let startLeft,startTop,endLeft,endTop,itemLeft,itemTop,itemWidth,itemHeight;
  //用来判断是左侧列表拖拽还是画布区拖拽
  let dragCom = null;

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
        minWidth: itemWidth,
        minHeight: itemHeight
      }
    }else{
      style = {
        position: 'absolute',
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        minWidth: itemWidth,
        minHeight: itemHeight
      }
    }
    const com = comList.find(item => item.dragId === nowComId);
    if(com){
      com.style = style;
      setComList([...comList])
    }else{
      setComList([...comList,{component: dragCom || NowCom.component, style,dragId: NowCom.name + e.clientX,code: NowCom.name}])
    }
  }

  //通过删除后再添加拖拽的节点，实现节点的画布区拖拽
  const onDragStart = (e) => {
    nowComId = e.target.id
    setComList(comList);

    startLeft = e.clientX;
    startTop = e.clientY;
    itemLeft = e.target.offsetLeft;
    itemTop = e.target.offsetTop;
    itemWidth = e.target.offsetWidth;
    itemHeight = e.target.offsetHeight;
  }

  const onDragEnter = (e) => {
    e.preventDefault()
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onSelect=(item) => {
    return (e) => {
      // e.stopPropagation();
      if(item.code === 'Input'){
        return;
      }
      item.selected = !item.selected;
      setComList([...comList]);
    }
  }

  const onContextMenu = (item) => {
    return (e) => {
      e.preventDefault();
      item.showMenu =!item.showMenu;
      setComList([...comList]);
    }
  }

  const clearAllShowMenu = (e) => {
    comList.forEach(item => {
      item.selected = false;
      item.showMenu = false
    })
    setComList([...comList]);
  }

  //根据组件的id来更改右侧属性面板
  const changeRightPanelById = (id) => {
    return (list,type) => {
      if(type === 'attribute'){
        changeRightPanel(list,id)
      }else if(type === 'action'){
        setShowAction(true)
        setActionId(id)
        setActionJs('')
      }
    }
  }

  const submitAction = () => {
    setShowAction(false);
    if(!atrributeMap[actionId]){
      atrributeMap[actionId] = {}
    }
    atrributeMap[actionId].actionJs = actionJs;
    setAttributeMap({...atrributeMap})
  }

  const changeActionJs = (e) => {
    setActionJs(e.target.value)
  }

  return (
    <div onClick={clearAllShowMenu} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='renderCom'>
      {comList.map(item => {
        const Com = item.component;
        return <div id={item.dragId} key={item.dragId} onDragStart={onDragStart} draggable style={item.style}>
          {<Com actionJs={atrributeMap[item.dragId]?.actionJs} onContextMenu={onContextMenu(item)} attributeValue={atrributeMap[item.dragId]?.attributeValue} onClick={onSelect(item)} className={item.selected? 'selected':''} />}
          <RightClickMenu code={item.code} changeRightPanelById={(changeRightPanelById(item.dragId))} showMenu={item.showMenu} left={item.style.minWidth} />
        </div>
      })}
      <div style={{display: showAction ? 'block' : 'none'}} className='editAction'>
        <input onChange={changeActionJs} value={actionJs}  type={'textarea'} style={{width: '300px',height:'100px'}}></input>
        <button onClick={submitAction}>确定</button>
      </div>
    </div>
  )
}
