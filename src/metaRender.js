import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as myComponent from './component'
import { message } from 'antd'
import subscribeHook from './component/subscribe'
import axios from 'axios'
import Store from './store'
import _ from 'lodash'
import * as THREE from 'three'

var getMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (getMobile.Android() || getMobile.BlackBerry() || getMobile.iOS() || getMobile.Opera() || getMobile.Windows());
  }
};

export default function MetaRender() {
  const state = useLocation().state;
  const [update,setUpdate] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [isMobile, setIsMobile] = useState(false)
  const [is3D, setIs3D] = useState(false)
  let attributeMap = _.cloneDeep(Store.getState().attributeMap);

  useEffect(() => {
    const pageId = state?.pageId || window.location.hash.replace('#/metaRender?pageId=','')
    if(pageId){
      axios.post(`http://${window.location.hostname}:80/pageJson/findPageByID`,{
        pageId
      })
      .then(res => {
        Store.dispatch({type:'change',attributeMap:res.data.data.pageJson})
        setIsMobile(res.data.data.isMobile);
        setIs3D(res.data.data.is3D);
        if(res.data.data.isMobile && !getMobile.any()) {
          message.warning('移动页面，请在手机端打开')
        }
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
  },[state])

  useEffect(() => {
    const scene = new THREE.Scene();
    const directionalLight = new THREE.DirectionalLight('red', 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(80, 100, 50);
    // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
    scene.add(directionalLight);
    const width = document.getElementById('metaRender').clientWidth; //宽度
    const height = document.getElementById('metaRender').clientHeight; //高度
    const camera = new THREE.PerspectiveCamera(30, width/height, 1, 3000);
    camera.position.set(200, 200, 200);
    //相机观察目标指向Threejs 3D空间中某个位置
    camera.lookAt(0,0,0); //坐标原点

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
    document.getElementById('metaRender').replaceChildren(renderer.domElement);
    render3D(scene, camera, renderer)

  },[is3D])

  const render3D = (scene, camera, renderer) => {
    Object.values(attributeMap).forEach(item => {
      let Com = myComponent[item.comType];
      Com({scene,renderer,camera,...item})
    })
  }

  subscribeHook(() => {
    setUpdate({})
  })

  const getComponent = (item) => {
    let Com = myComponent[item.comType];
    if(!Com && item.groupType === 'defineCom'){
      let fun = new Function('return ' + item.component)
      Com = fun();
    }
    if(!Com){
      return <></>
    }
    return <div id={item.comId} key={item.comId} style={item.style}>
      {<Com
        {...window.findNodeByComId(item.comId,attributeMap)}
        >
          {
            Object.keys(item.childList || {}).map(_item => {
              return getComponent(item.childList[_item])
            })
          }
        </Com>
      }
    </div>
  }

  return (
    <div id='metaRender' style={isMobile ? {transform: 'scale(1.5)', position:'relative', left: '-650px'} : {height: '100vh'}}>
      {contextHolder}
      {(Object.keys(attributeMap)).map(item => {
        return getComponent(attributeMap[item])
      })}
    </div>
  )
}
