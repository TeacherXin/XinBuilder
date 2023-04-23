import {React, useEffect, useState} from 'react'
import RightClickMenu from './rightClickMenu';
import EditAction from '../../Modal/editAction'
import EditStyle from '../../Modal/editStyle';
import subscribeHook from '../../DefineHook/subscribe';
import './index.css'
import Store from '../../Store';
import _ from 'lodash'

export default function RenderCom(props) {

  //用来存储画布区的所有组件，以及组件的属性
  const [comList, setComList] = useState([])

  const [selectedComList,setSelectedComList] = useState([])

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

  //全选节点的父节点样式
  const [groupStyle,setGruopStyle] = useState({})
  //是否全选
  const [groupFlag,setGroupFlag] = useState(false)
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

  
  const attributeMap = _.cloneDeep(Store.getState().attributeMap);
  const { NowCom , changeRightPanel } = props
  let nowComId = ''
  let startLeft,startTop,endLeft,endTop,itemLeft,itemTop,itemWidth,itemHeight;
  //用来判断是左侧列表拖拽还是画布区拖拽
  let dragCom = null;

  subscribeHook(() => {
    setUpdate({})
  })


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

    //拖拽的为多个节点
    if(groupFlag){
      setGruopStyle(style);
      selectedComList.forEach(item => {
        let style = JSON.parse(JSON.stringify(item.style))
        style.left = parseInt(style.left) +  (endLeft - startLeft);
        style.top = parseInt(style.top) +  (endTop - startTop);
        item.style = style;
        item.selected = false;
      })
      let list = [...comList];
      for(let i=0;i<selectedComList.length;i++){
        let node = selectedComList[i];
        const index = comList.findIndex(item => item.dragId === node.dragId);
        if(index === -1){
          list.push(node);
          const attributeItem = attributeMap[node.dragId];
          attributeItem.position = {
            left: node.style.left + 'px',
            top: node.style.top + 'px'
          }
        }
      }
      Store.dispatch({type: 'change',attributeMap})
      setComList(list);
      setSelectedComList([])
      setGroupFlag(false)
      return;
    }
    const com = comList.find(item => item.dragId === nowComId);
    if(com){
      com.style = style;
      setComList([...comList]);
      attributeMap[com.dragId].position = {left: style.left,top: style.top}
    }else{
      setComList([...comList,{component: dragCom || NowCom.component, style,dragId: NowCom.name + e.clientX,code: NowCom.name}]);
      attributeMap[NowCom.name + e.clientX] = {}
      attributeMap[NowCom.name + e.clientX].position = {left: style.left,top: style.top}
      attributeMap[NowCom.name + e.clientX].comType = NowCom.name
    }
    Store.dispatch({type: 'change',attributeMap})
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

  const onSelect=(item) => {
    return (e) => {
      if(item.code === 'Input'){
        return;
      }
      // item.selected = !item.selected;
      // setComList([...comList]);
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
      item.showMenu = false
    })
    selectedComList.forEach(item => {
      item.showMenu = false;
    })
    setComList([...comList]);
    setSelectedComList([...selectedComList]);
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
        if(!attributeMap[actionId]){
          attributeMap[actionId] = {}
        }
        if(!attributeMap[actionId].actionJs){
          attributeMap[actionId].actionJs = {}
        }
        attributeMap[actionId].actionJs[actionName] = actionJs?.[actionName];
        Store.dispatch({type: 'change',attributeMap})
      }
      setShowAction(false);
    }
  }

  //给组件绑定样式
  const submitStyle = (flag) => {
    return () => {
      if(flag){
        if(!attributeMap[styleId]){
          attributeMap[styleId] = {}
        }
        attributeMap[styleId].styleCss = styleCss;
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

  //用来保存表格的内容
  const changeTableData = (dragId) => {
    return (tableData) => {
      if(!attributeMap[dragId]){
        attributeMap[dragId] = {}
      }
      attributeMap[dragId].tableData = tableData
      Store.dispatch({type: 'change',attributeMap})
    }
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
    getAllSelectedNode()
    setGroupWidth(mouseUpLeft-mouseDownLeft);
    setGroupHeight(mouseUpTop-mouseDownTop);
  }

  const getAllSelectedNode = () => {
    for(let i=0;i<comList.length;i++){
      let left = parseInt(comList[i].style.left);
      let top = parseInt(comList[i].style.top);
      if((left > mouseDownLeft && left < mouseUpLeft && top > mouseDownTop && top < mouseUpTop) || left > mouseUpLeft && left < mouseDownLeft && top > mouseUpTop && top < mouseDownTop){
        let com = comList.splice(i,1)[0];
        com.selected = true;
        i--
        selectedComList.push(com)
      }
    }
    if(selectedComList.length){
      setGroupFlag(true);
    }
    setComList([...comList]);
    setSelectedComList([...selectedComList])
  }

  const setSameLeft = (e) => {
    e.stopPropagation();
    let left = selectedComList[0].style.left;
    selectedComList.forEach(item => {
      item.style = {...item.style,left};
      attributeMap[item.dragId].position = {
        left: item.style.left,
        top: item.style.top
      }
    })
    setSelectedComList([...selectedComList])
    Store.dispatch({type: 'change',attributeMap})
  }

  const setSameTop = (e) => {
    e.stopPropagation();
    let top = selectedComList[0].style.top;
    selectedComList.forEach(item => {
      item.style = {...item.style,top};
      attributeMap[item.dragId].position = {
        left: item.style.left,
        top: item.style.top
      }
    })
    setSelectedComList([...selectedComList])
    Store.dispatch({type: 'change',attributeMap})
  }

  const deleteCom = (e) => {
    selectedComList.forEach(item => {
      delete attributeMap[item.dragId];
    })
    e.stopPropagation();
    setSelectedComList([]);
    setGroupFlag(false);
    Store.dispatch({type: 'change',attributeMap})
  }

  const copyCom = (e) => {
    e.stopPropagation();
    let copySelectedList = [];
    for(let i=0;i<selectedComList.length;i++){
      selectedComList[i].selected = false
      let newCom = {
        code: selectedComList[i].code,
        component: selectedComList[i].component,
        dragId: selectedComList[i].dragId + new Date().getTime(),
        selected: false,
        style: {
          position: 'fixed',
          left: parseInt(selectedComList[i].style.left) + 100 + 'px',
          top: parseInt(selectedComList[i].style.top) + 100 + 'px',
          zIndex: selectedComList[i].style.zIndex,
          minHeight: selectedComList[i].style.minHeight,
          minWidth: selectedComList[i].style.minWidth
        }
      }
      attributeMap[newCom.dragId] = {
        comType: selectedComList[i].code,
        position: {
          left: newCom.style.left,
          top: newCom.style.top
        }
      }
      copySelectedList.push(newCom)
    }
    Store.dispatch({type: 'change',attributeMap})
    setComList([...comList,...selectedComList,...copySelectedList]);
    setSelectedComList([]);
    setGroupFlag(false)
  }

  return (
    <div onClick={clearAllShowMenu} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='renderCom'>
      <div style={{display: groupFlag? 'block' : 'none'}} className='topMenu'>
        <p className='topMenuItem' onClick={setSameLeft}>左对齐</p>
        <p className='topMenuItem' onClick={setSameTop}>上对齐</p>
        <p className='topMenuItem' onClick={deleteCom}>删除</p>
        <p className='topMenuItem' onClick={copyCom}>复制</p>
      </div>
      {comList.map(item => {
        const Com = item.component;
        return <div id={item.dragId} key={item.dragId} onDragStart={onDragStart} draggable style={item.style}>
          {<Com
            styleCss={attributeMap[item.dragId]?.styleCss}
            actionJs={attributeMap[item.dragId]?.actionJs}
            onContextMenu={onContextMenu(item)}
            attributeValue={attributeMap[item.dragId]?.attributeValue}
            onClick={onSelect(item)}
            className={item.selected? 'selectedComponent':''}
            changeTableData={changeTableData(item.dragId)}
            tableRes={attributeMap[item.dragId]?.tableData}
            size={attributeMap[item.dragId]?.size}
            disable={attributeMap[item.dragId]?.disable}
            />}
          <RightClickMenu code={item.code} changeRightPanelById={(changeRightPanelById(item.dragId))} showMenu={item.showMenu} left={item.style.minWidth} />
        </div>
      })}
      <div style={{ display:(showMouse?'block':'none'),border:'1px solid blue',width: Math.abs(mouseUpLeft-mouseDownLeft)+'px',height:Math.abs(mouseUpTop-mouseDownTop)+'px',position:'absolute',left:mouseDownLeft<mouseUpLeft?mouseDownLeft:mouseUpLeft+'px',top:mouseDownTop<mouseUpTop?mouseDownTop:mouseUpTop+'px'}}></div>
      <EditAction actionName={actionName} showAction={showAction} changeActionJs={changeActionJs} actionJs={actionJs} submitAction={submitAction} />
      <EditStyle showStyle={showStyle} changeStyleCss={changeStyleCss} styleCss={styleCss} submitStyle={submitStyle} />
      <div onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseDown={mouseDown} style={{width:'60%',height:'100%',position:'absolute',zIndex:'10'}}></div>
      <div style={{display:(groupFlag?'block':'none'),...groupStyle,width:Math.abs(groupWidth)+'px',height:Math.abs(groupHeight)+'px',position:'fixed',zIndex:101}} onDragStart={dragGoupStart} draggable={groupFlag}>
        {selectedComList.map(item => {
            const Com = item.component;
            return <div id={item.dragId} key={item.dragId} style={item.style}>
              {<Com
                styleCss={attributeMap[item.dragId]?.styleCss}
                actionJs={attributeMap[item.dragId]?.actionJs}
                onContextMenu={onContextMenu(item)}
                attributeValue={attributeMap[item.dragId]?.attributeValue}
                onClick={onSelect(item)}
                className={item.selected? 'selectedComponent':''}
                changeTableData={changeTableData(item.dragId)}
                tableRes={attributeMap[item.dragId]?.tableData}
                size={attributeMap[item.dragId]?.size}
                disable={attributeMap[item.dragId]?.disable}
                />}
              <RightClickMenu code={item.code} changeRightPanelById={(changeRightPanelById(item.dragId))} showMenu={item.showMenu} left={item.style.minWidth} />
            </div>
          })}
      </div>
    </div>
  )
}
