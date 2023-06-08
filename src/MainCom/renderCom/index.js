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
import {  message,Dropdown } from 'antd';

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

  const initStyle = {
    XinForm: [400,200],
    XinMenu: [600,100],
    XinRadioGroup: [250,40],
    XinCard: [300,400],
    XinFlex: [400,400],
    XinCarousel: [600,200]
  }

  const getItems = (type) => {
    const items = [
      {
        label: '设置属性',
        key: 'setAttribute'
      },
      {
        label: '设置样式',
        key: 'setStyle'
      }
    ]
    switch (type) {
      case 'XinButton': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onClick事件',
              key: 'setClick'
            }
          ]
        })
        break;
      }
      case 'XinCheckBox': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onChange事件',
              key: 'setChange'
            }
          ]
        })
        break;
      }
      case 'XinDatePicker': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onChange事件',
              key: 'setChange'
            }
          ]
        })
        break;
      }
      case 'XinInput': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onChange事件',
              key: 'setChange'
            }
          ]
        })
        break;
      }
      case 'XinMenu': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onChange事件',
              key: 'setChange'
            }
          ]
        })
        break;
      }
      case 'XinNumber': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onChange事件',
              key: 'setChange'
            }
          ]
        })
        break;
      }
      case 'XinRadio': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onClick事件',
              key: 'setClick'
            },
            {
              label: 'onChange事件',
              key: 'setChange'
            }

          ]
        })
        break;
      }
      case 'XinRadioGroup': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onChange事件',
              key: 'setChange'
            }
          ]
        })
        break;
      }
      case 'XinLable': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onClick事件',
              key: 'setClick'
            }
          ]
        })
        break;
      }
      case 'XinIcon': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onClick事件',
              key: 'setClick'
            }
          ]
        })
        break;
      }
      case 'XinDiv': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onClick事件',
              key: 'setClick'
            }
          ]
        })
        break;
      }
      case 'XinCarousel': {
        items.push({
          label: '设置动作',
          key: 'setAction',
          children: [
            {
              label: 'onChange事件',
              key: 'setChange'
            }
          ]
        })
        break;
      }
    }
    return items
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
    let node = findNodeByComId(nowComId)
    if(node){
      node.style = style
    }else{
      let newCom = {style,comId: NowCom.name + e.clientX,comType: NowCom.name}
      let flag = dragToContainer(e.clientX,e.clientY,newCom);
      if(flag){
        return;
      }
      if(newCom.comType === 'defineCom'){
        setActionId(newCom.comId)
        setShowAction(true)
      }
      attributeMap[newCom.comId] = newCom
    }
    Store.dispatch({type: 'change',attributeMap})
  }

  const dragToContainer = (clientX,clientY,newCom) => {
    let parentNode;
    for(let propName in attributeMap){
      if(['XinForm','XinMenu','XinRadioGroup','XinCard','XinFlex','XinCarousel'].includes(attributeMap[propName].comType)
          && parseInt(attributeMap[propName].style.left) < clientX 
          && parseInt(attributeMap[propName].style.left) + (attributeMap[propName].style.width || initStyle[attributeMap[propName].comType][0]) > clientX 
          && parseInt(attributeMap[propName].style.top) < clientY
          && parseInt(attributeMap[propName].style.top) + (attributeMap[propName].style.height || initStyle[attributeMap[propName].comType][1]) > clientY
        ){
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
        let node = findNodeByComId(actionId)
        if(node.comType === 'defineCom'){
          node.defineComJs = actionJs?.[actionName];
          Store.dispatch({type: 'change',attributeMap});
          setShowAction(false);
          return;
        }
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

  //设置各个组件所展示的属性
  const showRightPanel = (code,id,type,actionName) => {
      //属性面板
    if(type === 'attribute'){
      switch (code) {
        case 'XinButton': {
          changeRightPanelById(id,['attributeValue','visible','buttonType','size','disabled','danger','ghost'],'attribute');
          break;
        }
        case 'XinInput': {
          changeRightPanelById(id,['attributeValue','visible','addonBefore','addonAfter','placeholder','size','prefix','suffix','allowClear','label','required','requiredMessage'],'attribute');
          break;
        }
        case 'XinLable': {
          changeRightPanelById(id,['attributeValue','visible'],'attribute');
          break;
        }
        case 'XinCheckBox': {
          changeRightPanelById(id,['attributeValue','visible','disabled','checked','label','required','requiredMessage'],'attribute');
          break;
        }
        case 'XinRadio': {
          changeRightPanelById(id,['attributeValue','visible','disabled','checked'],'attribute');
          break;
        }
        case 'XinForm': {
          changeRightPanelById(id,['visible','disabled','size','layout','colon','labelAlign'],'attribute');
          break;
        }
        case 'XinRadioGroup': {
          changeRightPanelById(id,['visible','disabled','buttonStyle','optionType','size','selectedID'],'attribute');
          break;
        }
        case 'XinIcon': {
          changeRightPanelById(id,['visible','iconType','twoToneColor','rotate'],'attribute');
          break;
        }
        case 'XinMenu': {
          changeRightPanelById(id,['visible','mode','selectedKey'],'attribute');
          break;
        }
        case 'XinDatePicker': {
          changeRightPanelById(id,['attributeValue','visible','picker','showTime','dateFormat','disabled','size','allowClear','label','required','requiredMessage'],'attribute');
          break;
        }
        case 'XinNumber': {
          changeRightPanelById(id,['attributeValueNumber','visible','placeholder','size','prefix','allowClear','max','min','label','required','requiredMessage','step'],'attribute');
          break;
        }
        case 'XinRate': {
          changeRightPanelById(id,['allowHalf','count','disabled'],'attribute');
          break;
        }
        case 'XinCard': {
          changeRightPanelById(id,['bordered','size','title','visible'],'attribute');
          break;
        }
        case 'XinTable': {
          changeRightPanelById(id,['setColumns','setTableData','bordered','showHeader','size'],'attribute');
          break;
        }
        case 'XinFlex': {
          changeRightPanelById(id,['visible'],'attribute');
          break;
        }
        case 'XinLink': {
          changeRightPanelById(id,['visible','attributeValue','pageUrl'],'attribute');
          break;
        }
        case 'XinDiv': {
          changeRightPanelById(id,['visible'],'attribute');
          break;
        }
        case 'XinCarousel': {
          changeRightPanelById(id,['visible','autoplay'],'attribute');
          break;
        }
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
      }
    }
  }

  const getComponent = (item,isChild) => {
    let Com = myComponent[item.comType];
    if(!Com && item.defineComJs){
      let fun = new Function(item.defineComJs)
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
            {...findNodeByComId(item.comId)}
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
      <div onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseDown={mouseDown} style={{width:'60%',height:'100%',position:'absolute',zIndex:'10'}}></div>
    </div>
  )
}
