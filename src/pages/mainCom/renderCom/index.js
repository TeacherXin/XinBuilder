import {React, useEffect, useState} from 'react'
import EditAction from '../../../modal/editAction'
import EditStyle from '../../../modal/editStyle';
import subscribeHook from '../../../component/subscribe';
import * as myComponent from '../../../component'
import './index.css'
import Store from '../../../store';
import _ from 'lodash'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { message,Dropdown } from 'antd';
import { getItems } from './util/actionMenu';
import {COMADAPTER, COMADAPTERSTYLE} from './util/attributeMenu';
import { CONTAINERCOM } from './util/globalData'
import SelectContainer from './util/selectContainer.js' 
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
  //当前的事件类型
  const [actionName, setActionName] = useState('click')

  //画布区选中多个节点的框需要的属性
  const [mouseDownLeft,setMouseDownLeft] = useState()
  //画布区选中多个节点的框需要的属性
  const [mouseDownTop,setMouseDownTop] = useState()
  //画布区选中多个节点的框需要的属性
  const [mouseUpLeft,setMouseUpLeft] = useState()
  //画布区选中多个节点的框需要的属性
  const [mouseUpTop,setMouseUpTop] = useState()
  //画布区选中多个节点的框需要的属性
  const [mousedownFlag,setMousedownFlag] = useState(false)
  //画布区选中多个节点的框需要的属性
  const [showMouse,setShowMouse] = useState(false)

  // 展示选择容器的弹窗
  const [showSelectContainer,setShowSelectContainer] = useState(false)
  // 备选的所有容器
  const [containerOptions, setContainerOptions] = useState([])
  // 拖拽创建的节点
  const [newCom,setNewCom] = useState({})
  
  // redux更新时需要更新当前组件
  const [update,setUpdate] = useState({})

  const [isMobile, setIsMobile] = useState(false)
  const [is3D, setIs3D] = useState(false)
  const [scene, setScene] = useState(null)
  const [renderer, setRenderer] = useState(null)
  const [camera, setCamera] = useState(null)

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
  let startLeft,startTop,endLeft,endTop,itemLeft,itemTop;

  subscribeHook(() => {
    setUpdate({})
  })

  /**
   * 在预览状态返回的时候，保持信息
   * @level 4
   */
  useEffect(() => {
    if(state?.pageId){
      axios.post(`http://${window.location.hostname}:80/pageJson/findPageByID`,{
        pageId: state.pageId
      })
      .then(res => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        attributeMap = res.data.data?.pageJson || {};
        setIsMobile(res.data.data?.isMobile)
        setIs3D(res.data.data?.is3D)
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
    if(is3D) {
      const scene = new THREE.Scene();
      setScene(scene)
      const axesHelper = new THREE.AxesHelper(150);
      scene.add(axesHelper);
      const directionalLight = new THREE.DirectionalLight('white', 1);
      // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
      directionalLight.position.set(1000, 1000, 1000);
      // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
      scene.add(directionalLight);
      const width = document.getElementById('renderCom').clientWidth; //宽度
      const height = document.getElementById('renderCom').clientHeight; //高度
      const camera = new THREE.PerspectiveCamera(30, width/height, 1, 3000);
      setCamera(camera)
      camera.position.set(200, 200, 200);
      //相机观察目标指向Threejs 3D空间中某个位置
      camera.lookAt(0,0,0); //坐标原点
  
      const renderer = new THREE.WebGLRenderer();
      setRenderer(renderer)
  
      // 设置相机控件轨道控制器OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
      controls.addEventListener('change', function () {
          renderer.render(scene, camera); //执行渲染操作
      });//监听鼠标、键盘事件
  
      renderer.setSize(width, height);
      renderer.render(scene, camera);
      document.getElementById('renderCom').replaceChildren(renderer.domElement);
    }
  },[is3D])

  useEffect(() => {
    setActionJs(window.findNodeByComId(actionId,attributeMap)?.actionJs)
    setStyleCss(window.findNodeByComId(styleId,attributeMap)?.styleCss)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[showAction,showStyle])

  /**
   * 拖拽到画布区的节点，添加到全局的业务模型中
   * @param {Event} e 事件对象
   * @level 4
   */
  const onDrop = (e) => {
    // 3D
    if(is3D) {
      if(NowCom.groupType !== '3DCom') {
        message.error('请在3D页面中，使用3D组件');
        return;
      }
      let newCom = {comId: NowCom.name + e.clientX,comType: NowCom.name,groupType: NowCom.groupType, component: NowCom.component}
      setNewCom(newCom)
      let flag = dragToContainer(e.clientX,e.clientY,newCom);
      if(flag){
        return;
      }
      attributeMap[newCom.comId] = newCom;
      Store.dispatch({type: 'change',attributeMap});
      return
    }

    //用来确定拖拽的节点的位置
    if(NowCom.groupType === '3DCom') {
      message.error('在H5页面中，禁止使用3D组件');
      return;
    }

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

  const render3D = () => {
    if(scene) {
      scene.children = [scene.children[0],scene.children[1]]
    }
    Object.values(attributeMap).forEach(item => {
      let Com = myComponent[item.comType];
      Com({scene,renderer,camera,...item})
    })
  }

  /**
   * 当拖拽的节点位置，处在某个容器节点中触发
   * @param {number} clientX 拖拽节点的x轴位置
   * @param {number} clientY 拖拽节点的y轴位置
   * @param {xinNode} newCom 拖拽的节点
   * @level 4
   */
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

  /**
   * 向list中添加容器节点，如果容器节点下有容器，继续添加
   * @param {xinNode} node 容器节点
   * @param {Array} list 存储容器的list
   * @level 4
   */
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

  /**
   * 在画布区中拖拽时，更新节点的style属性
   * @param {Event} e 事件对象
   * @level 4
   */
  const onDragStart = (e) => {
    nowComId = e.target.id
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

  /**
   * 根据组件的id来更改右侧属性面板
   * @param {string} id 节点的id
   * @param {Array} list 要更新的属性列表
   * @param {string} type 更新的类型，属性，样式，动作
   * @param {string} actionName 动作的类型，click，change
   * @level 3
   */
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
      changeRightPanel(list,id)
    }
  }

  /**
   * 给组件绑定事件
   * @param {*} flag 点击确定还是取消
   * @level 3
   */
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

  /**
   * 给组件绑定样式
   * @param {*} flag 点击确定还是取消
   * @level 3
   */
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

  /**
   * 更改actionJs
   * @param {string} delay 用来表示节流的时间
   * @level 3
   */
  const changeActionJs = (delay) => {
    let timer = null;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const actionJs = {};
        actionJs[actionName] = value
        setActionJs(actionJs)
      }, delay);
    }
  }
  
  /**
   * 更改styleCss
   * @param {Event} e 事件对象
   * @level 3
   */
  const changeStyleCss = (e) => {
    setStyleCss(e.target.value)
  }

  /**
   * 通过鼠标开始和结束的位置算显示选中的蓝色div
   * @param {Event} e 事件对象
   * @level 3
   */
  const mouseDown = (e) => {
    setMouseDownLeft(e.clientX)
    setMouseDownTop(e.clientY)
    setMousedownFlag(true)
    setShowMouse(false)
  }

  /**
   * 通过鼠标开始和结束的位置算显示选中的蓝色div
   * @param {Event} e 事件对象
   * @level 3
   */
  const mouseMove = (e) => {
    if(mousedownFlag){
      setMouseUpLeft(e.clientX)
      setMouseUpTop(e.clientY)
      setShowMouse(true)
    }
  }

  /**
   * 通过鼠标开始和结束的位置算显示选中的蓝色div
   * @param {Event} e 事件对象
   * @level 3
   */
  const mouseUp = (e) => {
    setMousedownFlag(false)
    setShowMouse(false)
  }

  /**
   * 设置各个组件所展示的属性
   * @param {string} code 组件的编码。button，input
   * @param {string} id 组件的id
   * @param {string} type 属性的类型，action，style
   * @param {string} actionName 动作的类型
   * @level 3
   */
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
          return [item.packageConfig.attributeCode,item.packageConfig.attributeName]
        })
        changeRightPanelById(id,packageList,'attribute');
      }
    //动作弹窗
    }else if(type === 'action'){
      changeRightPanelById(id,['attributeValue'],'action',actionName);
    }else if(type === 'style'){
      changeRightPanelById(id,COMADAPTERSTYLE[code],'style');
    }
  }

  /**
   * 组件右键点击的菜单，可以设置属性，样式，动作
   * @param {string} code 组件的编码
   * @param {string} id 组件的id
   * @level 3
   */
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
        default : {
          break;
        }
      }
    }
  }

  const getComponent = (item,isChild) => {
    let Com = myComponent[item.comType];
    if(!Com && item.groupType === 'defineCom'){
      // eslint-disable-next-line no-new-func
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

  const getMobileComponent = (item,isChild) => {
    let Com = myComponent[item.comType];
    if(!Com && item.groupType === 'defineCom'){
      // eslint-disable-next-line no-new-func
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
    <div id='renderCom' className={isMobile ? 'isMobile':'renderCom'} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter}>
      {
        !is3D ? <div>
          {contextHolder}
          {(Object.keys(attributeMap)).map(item => {
              return isMobile ? getMobileComponent(attributeMap[item]) :  getComponent(attributeMap[item])
            })}
          <div style={{ display:(showMouse?'block':'none'),border:'1px solid blue',width: Math.abs(mouseUpLeft-mouseDownLeft)+'px',height:Math.abs(mouseUpTop-mouseDownTop)+'px',position:'absolute',left:mouseDownLeft<mouseUpLeft?mouseDownLeft:mouseUpLeft+'px',top:mouseDownTop<mouseUpTop?mouseDownTop:mouseUpTop+'px'}}></div>
          <EditAction actionName={actionName} showAction={showAction} changeActionJs={changeActionJs(800)} actionJs={actionJs} submitAction={submitAction} />
          <EditStyle showStyle={showStyle} changeStyleCss={changeStyleCss} styleCss={styleCss} submitStyle={submitStyle} />
          <SelectContainer newCom={newCom} containerOptions={containerOptions} setShowSelectContainer={setShowSelectContainer} showSelectContainer={showSelectContainer}/>
          <div onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseDown={mouseDown} style={{width:'60%',height:'100%',position:'absolute',zIndex:'10'}}></div>
        </div> : <div>
          {render3D()}
        </div>
      }
    </div>
  )
}
