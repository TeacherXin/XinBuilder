import {React, useEffect, useState} from 'react'
import RightClickMenu from './rightClickMenu';
import EditAction from '../../Modal/editAction'
import EditStyle from '../../Modal/editStyle';
import subscribeHook from '../../DefineHook/subscribe';
import * as myComponent from '../../Component'
import './index.css'
import Store from '../../Store';
import _ from 'lodash'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import {  message } from 'antd';

export default function RenderCom(props) {

  //展示动作弹窗
  const [showAction, setShowAction] = useState(false)
  //动作JS代码
  const [actionJs,setActionJs] = useState({})
  //确定当前动作的节点
  const [actionId,setActionId] = useState('')
  //展示样式弹窗
  const [showStyle, setShowStyle] = useState(false)
  //样式css代码
  const [styleCss,setStyleCss] = useState('')
  //确定当前样式的节点
  const [styleId, setStyleId] = useState('')

  const [actionName, setActionName] = useState('click')
  
  //全选节点的父节点的宽度
  const [groupWidth,setGroupWidth] = useState()
  //全选节点的父节点的高度
  const [groupHeight,setGroupHeight] = useState()

  //画布区选中多个节点的框需要的属性
  const [mouseDownLeft,setMouseDownLeft] = useState()
  const [mouseDownTop,setMouseDownTop] = useState()
  const [mouseUpLeft,setMouseUpLeft] = useState()
  const [mouseUpTop,setMouseUpTop] = useState()
  const [mousedownFlag,setMousedownFlag] = useState(false)
  const [showMouse,setShowMouse] = useState(false)
  
  const [update,setUpdate] = useState({})

  const state = useLocation().state;
  const [messageApi, contextHolder] = message.useMessage();

  
  let attributeMap = _.cloneDeep(Store.getState().attributeMap);
  const { NowCom , changeRightPanel } = props
  let nowComId = ''
  let startLeft,startTop,endLeft,endTop,itemLeft,itemTop,itemWidth,itemHeight,clientWidth,clientHeight;

  subscribeHook(() => {
    setUpdate({})
  })

  //在预览状态返回的时候，保持信息
  useEffect(() => {
    if(state?.pageId){
      axios.post(`http://${window.location.hostname}:3003/pageJson/findPageByID`,{
        pageId: state.pageId
      })
      .then(res => {
        attributeMap = res.data.data.pageJson;
        Store.dispatch({type:'change',attributeMap})
      })
      .catch(err => {
        messageApi.open({
          type: 'error',
          content: '获取页面详情失败',
        });
      })
    }else{
      messageApi.open({
        type: 'error',
        content: '获取页面详情失败',
      });
    }
  },[])

  useEffect(() => {
    setActionJs(findNodeByComId(actionId)?.actionJs)
    setStyleCss(findNodeByComId(styleId)?.styleCss)
  },[showAction,showStyle])


  const onDrop = (e) => {
    //用来确定拖拽的节点的位置

    endLeft = e.clientX;
    endTop = e.clientY;

    let style;
    if(startLeft && startTop){
      style = {
        position: 'fixed',
        left: (endLeft - startLeft) + itemLeft + 'px',
        top: (endTop - startTop) + itemTop + 'px',
        minWidth: itemWidth,
        minHeight: itemHeight,
        zIndex:100
      }
    }else{
      style = {
        position: 'fixed',
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        minWidth: itemWidth,
        minHeight: itemHeight,
        zIndex:100
      }
    }
    let node = findNodeByComId(nowComId)
    if(node){
      node.style = style
    }else{
      let newCom = {style,comId: NowCom.name + e.clientX,comType: NowCom.name}
      let flag = dragToContainer(e.clientX,e.clientY,newCom);
      if(flag){
        return;
      }
      attributeMap[newCom.comId] = newCom
    }
    Store.dispatch({type: 'change',attributeMap})
  }

  const dragToContainer = (clientX,clientY,newCom) => {
    let parentNode;
    for(let propName in attributeMap){
      if(attributeMap[propName].comType === 'XinForm' && parseInt(attributeMap[propName].style.left) < clientX && parseInt(attributeMap[propName].style.top) < clientY){
        parentNode = attributeMap[propName]
      }
    }
    if(parentNode){
      delete newCom.style
      if(parentNode.childList){
        parentNode.childList[newCom.comId] = newCom
      }else{
        parentNode.childList = {}
        parentNode.childList[newCom.comId] = newCom
      }
      Store.dispatch({type: 'change',attributeMap})
      return true;
    }
  }


  const onDragStart = (e) => {
    nowComId = e.target.id
    startLeft = e.clientX;
    startTop = e.clientY;
    itemLeft = e.target.offsetLeft;
    itemTop = e.target.offsetTop;
    itemWidth = e.target.offsetWidth;
    itemHeight = e.target.offsetHeight;
  }

  //多个节点的拖拽方法
  const dragGoupStart = (e) => {
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
  
  //右键菜单栏
  const onContextMenu = (item) => {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      item.showMenu =!item.showMenu;
      Store.dispatch({type:"change",attributeMap})
    }
  }

  const clearAllShowMenu = (e) => {
    Object.keys(attributeMap || {}).forEach(item => {
      attributeMap[item].showMenu = false
      if(attributeMap[item].childList){
        (Object.keys(attributeMap[item].childList || {})).forEach(_item => {
          attributeMap[item].childList[_item].showMenu = false
        })
      }
    })

    Store.dispatch({type:"change",attributeMap})
  }

  //根据组件的id来更改右侧属性面板
  const changeRightPanelById = (id) => {
    return (list,type,actionName) => {
      if(type === 'attribute'){
        changeRightPanel(list,id)
      }else if(type === 'action'){
        setActionId(id)
        setActionJs({})
        setShowAction(true)
        setActionName(actionName)
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
        let node = findNodeByComId(actionId)
        if(!node.actionJs){
          node.actionJs = {}
        }
        node.actionJs[actionName] = actionJs?.[actionName];
        Store.dispatch({type: 'change',attributeMap})
      }
      setShowAction(false);
    }
  }

  //给组件绑定样式
  const submitStyle = (flag) => {
    return () => {
      if(flag){
        let node = findNodeByComId(styleId)
        node.styleCss = styleCss;
        Store.dispatch({type: 'change',attributeMap})
      }
      setShowStyle(false);
    }
  }

  const changeActionJs = (e) => {
    const actionJs = {};
    actionJs[actionName] = e.target.value
    setActionJs(actionJs)
  }

  const changeStyleCss = (e) => {
    setStyleCss(e.target.value)
  }

  //通过鼠标开始和结束的位置算显示选中的蓝色div
  const mouseDown = (e) => {
    setMouseDownLeft(e.clientX)
    setMouseDownTop(e.clientY)
    setMousedownFlag(true)
    setShowMouse(false)
  }

  const mouseMove = (e) => {
    if(mousedownFlag){
      setMouseUpLeft(e.clientX)
      setMouseUpTop(e.clientY)
      setShowMouse(true)
    }
  }

  const mouseUp = (e) => {
    setMousedownFlag(false)
    setShowMouse(false)
    setGroupWidth(mouseUpLeft-mouseDownLeft);
    setGroupHeight(mouseUpTop-mouseDownTop);
  }

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

  const getComponent = (item,isChild) => {
    const Com = myComponent[item.comType];
    return <div id={item.comId} key={item.comId} onDragStart={onDragStart} draggable={!isChild} style={item.style}>
      {<Com
        {...findNodeByComId(item.comId)}
        onContextMenu={onContextMenu(item)}
        >
          {
            Object.keys(item.childList || {}).map(_item => {
              return getComponent(item.childList[_item],true)
            })
          }
        </Com>
      }
      <RightClickMenu code={item.comType} changeRightPanelById={(changeRightPanelById(item.comId))} showMenu={item.showMenu} left={item?.style?.minWidth} />
    </div>
  }

  return (
    <div onClick={clearAllShowMenu} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='renderCom'>
      {contextHolder}
      {(Object.keys(attributeMap)).map(item => {
        return getComponent(attributeMap[item])
      })}
      <div style={{ display:(showMouse?'block':'none'),border:'1px solid blue',width: Math.abs(mouseUpLeft-mouseDownLeft)+'px',height:Math.abs(mouseUpTop-mouseDownTop)+'px',position:'absolute',left:mouseDownLeft<mouseUpLeft?mouseDownLeft:mouseUpLeft+'px',top:mouseDownTop<mouseUpTop?mouseDownTop:mouseUpTop+'px'}}></div>
      <EditAction actionName={actionName} showAction={showAction} changeActionJs={changeActionJs} actionJs={actionJs} submitAction={submitAction} />
      <EditStyle showStyle={showStyle} changeStyleCss={changeStyleCss} styleCss={styleCss} submitStyle={submitStyle} />
      <div onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseDown={mouseDown} style={{width:'60%',height:'100%',position:'absolute',zIndex:'10'}}></div>
    </div>
  )
}
