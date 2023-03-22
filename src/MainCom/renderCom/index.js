import {React, useEffect, useState} from 'react'
import RightClickMenu from './rightClickMenu';
import EditAction from './editAction'
import EditStyle from './editStyle';
import './index.css'

export default function RenderCom(props) {

  //用来存储画布区的所有组件，以及组件的属性
  const [comList, setComList] = useState([])
  //展示动作弹窗
  const [showAction, setShowAction] = useState(false)
  //动作JS代码
  const [actionJs,setActionJs] = useState('')
  //确定当前动作的节点
  const [actionId,setActionId] = useState()
  //展示样式弹窗
  const [showStyle, setShowStyle] = useState(false)
  //样式css代码
  const [styleCss,setStyleCss] = useState('')
  //确定当前样式的节点
  const [styleId, setStyleId] = useState('')

  const { NowCom , changeRightPanel, atrributeMap, setAttributeMap, comId} = props
  let nowComId = ''
  let startLeft,startTop,endLeft,endTop,itemLeft,itemTop,itemWidth,itemHeight;
  //用来判断是左侧列表拖拽还是画布区拖拽
  let dragCom = null;

  //初始化动作和样式内容
  useEffect(() => {
    setActionJs(atrributeMap[actionId]?.actionJs)
    setStyleCss(atrributeMap[styleId]?.styleCss)
  },[showAction,showStyle])

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
      setComList([...comList]);
      atrributeMap[com.dragId].position = {left: style.left,top: style.top}
    }else{
      setComList([...comList,{component: dragCom || NowCom.component, style,dragId: NowCom.name + e.clientX,code: NowCom.name}]);
      atrributeMap[NowCom.name + e.clientX] = {}
      atrributeMap[NowCom.name + e.clientX].position = {left: style.left,top: style.top}
      atrributeMap[NowCom.name + e.clientX].comType = NowCom.name
    }
    setAttributeMap(atrributeMap)
  }


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
      if(item.code === 'Input'){
        return;
      }
      item.selected = !item.selected;
      setComList([...comList]);
    }
  }
  
  //右键菜单栏
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
        setActionId(id)
        setActionJs('')
        setShowAction(true)
      }else if(type === 'style'){
        setStyleId(id)
        setStyleCss('')
        setShowStyle(true)
      }
    }
  }

  //给组件绑定事件
  const submitAction = (flag) => {
    return () => {
      if(flag){
        if(!atrributeMap[actionId]){
          atrributeMap[actionId] = {}
        }
        atrributeMap[actionId].actionJs = actionJs;
        setAttributeMap({...atrributeMap})
      }
      setShowAction(false);
    }
  }

  //给组件绑定样式
  const submitStyle = (flag) => {
    return () => {
      if(flag){
        if(!atrributeMap[styleId]){
          atrributeMap[styleId] = {}
        }
        atrributeMap[styleId].styleCss = styleCss;
        setAttributeMap({...atrributeMap})
      }
      setShowStyle(false);
    }
  }

  const changeActionJs = (e) => {
    setActionJs(e.target.value)
  }

  const changeStyleCss = (e) => {
    setStyleCss(e.target.value)
  }

  return (
    <div onClick={clearAllShowMenu} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='renderCom'>
      {comList.map(item => {
        const Com = item.component;
        return <div id={item.dragId} key={item.dragId} onDragStart={onDragStart} draggable style={item.style}>
          {<Com styleCss={atrributeMap[item.dragId]?.styleCss} actionJs={atrributeMap[item.dragId]?.actionJs} onContextMenu={onContextMenu(item)} attributeValue={atrributeMap[item.dragId]?.attributeValue} onClick={onSelect(item)} className={item.selected? 'selected':''} />}
          <RightClickMenu code={item.code} changeRightPanelById={(changeRightPanelById(item.dragId))} showMenu={item.showMenu} left={item.style.minWidth} />
        </div>
      })}
      <EditAction showAction={showAction} changeActionJs={changeActionJs} actionJs={actionJs} submitAction={submitAction} />
      <EditStyle showStyle={showStyle} changeStyleCss={changeStyleCss} styleCss={styleCss} submitStyle={submitStyle} />
    </div>
  )
}
