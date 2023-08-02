import {React, useEffect, useState} from 'react'
import EditAction from '../../Modal/editAction'
import EditStyle from '../../Modal/editStyle';
import subscribeHook from '../../DefineHook/subscribe';
import * as myComponent from '../../Component'
import './index.css'
import Store from '../../Store';
import _ from 'lodash'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { message,Dropdown } from 'antd';
import { getItems } from './Util/actionMenu';
import {COMADAPTER} from './Util/attributeMenu';
import { CONTAINERCOM } from './Util/globalData'
import SelectContainer from './Util/selectContainer.js' 
import SetIcon from '../../Modal/setIcon';

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
  const [showSelectContainer,setShowSelectContainer] = useState(false)
  const [containerOptions, setContainerOptions] = useState([])
  const [newCom,setNewCom] = useState({})
  
  const [update,setUpdate] = useState({})

  const state = useLocation().state;
  const [messageApi, contextHolder] = message.useMessage();

  const initStyle = {
    XinForm: [400,200],
    XinMenu: [600,100],
    XinRadioGroup: [250,40],
    XinCard: [300,400],
    XinFlex: [400,400],
    XinCarousel: [600,200],
    XinTabs: [400,400],
    XinList: [600,600]
  }

  
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
        attributeMap = res.data.data?.pageJson || {};
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
    setActionJs(window.findNodeByComId(actionId,attributeMap)?.actionJs)
    setStyleCss(window.findNodeByComId(styleId,attributeMap)?.styleCss)
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
        zIndex:100
      }
    }else{
      style = {
        position: 'absolute',
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        zIndex:100
      }
    }
    let node = window.findNodeByComId(nowComId,attributeMap)
    if(node){
      node.style = style
    }else{
      let newCom = {style,comId: NowCom.name + e.clientX,comType: NowCom.name,groupType: NowCom.groupType, component: NowCom.component}
      setNewCom(newCom)
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
      if(CONTAINERCOM.includes(attributeMap[propName].comType)
          && parseInt(attributeMap[propName].style.left) < clientX 
          && parseInt(attributeMap[propName].style.left) + (attributeMap[propName].style.width || initStyle[attributeMap[propName].comType][0]) > clientX 
          && parseInt(attributeMap[propName].style.top) < clientY
          && parseInt(attributeMap[propName].style.top) + (attributeMap[propName].style.height || initStyle[attributeMap[propName].comType][1]) > clientY
        ){
        parentNode = attributeMap[propName]
      }
    }
    if(parentNode && (Object.values(parentNode.childList || [])).filter(item => item.groupType === 'container').length > 0){
      const parentNodeList = []
      countParentNode(parentNode,parentNodeList);
      if(parentNodeList.length > 1){
        setContainerOptions(parentNodeList)
        setShowSelectContainer(true)
        return true;
      }
    }else if(parentNode){
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

  const countParentNode = (node,list) =>{
    if(node.childList){
      list.push(node)
      const childValueList = Object.values(node.childList);
      for(let i=0; i<childValueList.length;i++){
        if(childValueList[i].groupType === 'container'){
          list.push(childValueList[i])
        }
        if(childValueList[i].childList){
          Object.values(childValueList[i].childList).forEach(element => {
            countParentNode(element,list)
          });
        }
      }
    }else if(node.groupType === 'container'){
      list.push(node)
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

  const onDragEnter = (e) => {
    e.preventDefault()
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  //根据组件的id来更改右侧属性面板
  const changeRightPanelById = (id,list,type,actionName) => {
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

  //给组件绑定事件
  const submitAction = (flag) => {
    return () => {
      if(flag){
        let node = window.findNodeByComId(actionId,attributeMap)
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
        let node = window.findNodeByComId(styleId,attributeMap)
        node.styleCss = styleCss;
        Store.dispatch({type: 'change',attributeMap})
      }
      setShowStyle(false);
    }
  }

  const changeActionJs = (value) => {
    const actionJs = {};
    actionJs[actionName] = value
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

  //设置各个组件所展示的属性
  const showRightPanel = async (code,id,type,actionName) => {
      //属性面板
    if(type === 'attribute'){
      if(COMADAPTER[code]){
        changeRightPanelById(id,COMADAPTER[code],'attribute');
      }else{
        const fileDirNameRes = await axios.get(`http://${window.location.hostname}:3000/api/getpackage?code=${code}`)
        const fileDirName = fileDirNameRes.data.packageList.fileDirName
        const res = await axios.get(`http://${window.location.hostname}:3000/api/getpackageConfig?fileDirName=${fileDirName}`);
        const list = res.data.packageConfig;
        const packageList = list.map(item => {
          return item.packageConfig.attributeName
        })
        changeRightPanelById(id,packageList,'attribute');
      }
    //动作弹窗
    }else if(type === 'action'){
      changeRightPanelById(id,['attributeValue'],'action',actionName);
    }else if(type === 'style'){
      changeRightPanelById(id,['attributeValue'],'style');
    }
  }

  const menuOnClick = (code,id) => {
    return (menuItem) => {
      switch (menuItem.key) {
        case 'setAttribute': {
          showRightPanel(code,id,'attribute');
          break;
        }
        case 'setStyle': {
          showRightPanel(code,id,'style');
          break;
        }
        case 'setClick': {
          showRightPanel(code,id,'action','click')
          break;
        }
        case 'setChange': {
          showRightPanel(code,id,'action','change');
          break;
        }
        case 'setLoad': {
          showRightPanel(code,id,'action','load');
          break;
        }
      }
    }
  }

  const getComponent = (item,isChild) => {
    let Com = myComponent[item.comType];
    if(!Com && item.groupType === 'defineCom'){
      let fun = new Function('return ' + item.component)
      Com = fun();
    }
    if(!Com){
      return <></>
    }
    return <div id={item.comId} key={item.comId} onDragStart={onDragStart} draggable={!isChild} style={item.style}>
      {
        <Dropdown menu={{items: getItems(item.comType),onClick: menuOnClick(item.comType,item.comId)}} trigger={['contextMenu']}>
          <div onContextMenu={(e) => {e.stopPropagation()}}>
            <Com
            {...window.findNodeByComId(item.comId,attributeMap)}
            >
              {
                Object.keys(item.childList || {}).map(_item => {
                  return getComponent(item.childList[_item],true)
                })
              }
            </Com>
          </div>
        </Dropdown>
      }
    </div>
  }

  return (
    <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='renderCom'>
      {contextHolder}
      {(Object.keys(attributeMap)).map(item => {
        return getComponent(attributeMap[item])
      })}
      <div style={{ display:(showMouse?'block':'none'),border:'1px solid blue',width: Math.abs(mouseUpLeft-mouseDownLeft)+'px',height:Math.abs(mouseUpTop-mouseDownTop)+'px',position:'absolute',left:mouseDownLeft<mouseUpLeft?mouseDownLeft:mouseUpLeft+'px',top:mouseDownTop<mouseUpTop?mouseDownTop:mouseUpTop+'px'}}></div>
      <EditAction actionName={actionName} showAction={showAction} changeActionJs={changeActionJs} actionJs={actionJs} submitAction={submitAction} />
      <EditStyle showStyle={showStyle} changeStyleCss={changeStyleCss} styleCss={styleCss} submitStyle={submitStyle} />
      <SelectContainer newCom={newCom} containerOptions={containerOptions} setShowSelectContainer={setShowSelectContainer} showSelectContainer={showSelectContainer}/>
      <div onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseDown={mouseDown} style={{width:'60%',height:'100%',position:'absolute',zIndex:'10'}}></div>
    </div>
  )
}
