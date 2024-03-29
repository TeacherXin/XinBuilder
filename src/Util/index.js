import _ from 'lodash';
import Store from '../store'
import axios from 'axios'
import { createHashHistory } from 'history'

const history = createHashHistory();


window.xinCtx = {}
window.xinComEvent = {}

window.proxyAttributeMap = () => {
  let xinCtx = window.xinCtx;
  let proxy = setAttributeProxy(xinCtx)
  window.xinCtx = proxy;
}

const setAttributeProxy = (ctx) => {
  for(let propName in ctx){
    if(typeof ctx[propName] === 'object'){
      ctx[propName] = setAttributeProxy(ctx[propName])
    }
  }
  return new Proxy(ctx,{
    set(target,property,value,receiver){
      if(typeof value === 'object'){
        target[property] = setAttributeProxy(value);
        Store.dispatch({type: 'change',attributeMap: target,comId: target.comId});
        return true
      }else{
        target[property] = value;
        Store.dispatch({type: 'change',attributeMap: target,comId:target.comId});
        return true
      }
    },
    deleteProperty(target,property){
      delete target[property];
      Store.dispatch({type: 'change',attributeMap: target,comId:target.comId});
      return true;
    }
  })
}

window.findNodeByComId = (id,nodeList) => {
  let node;
  const dfs = (id,nodeList) => {
    for(let propName in nodeList){
      if(propName === id){
        node = nodeList[propName];
      }else if(nodeList[propName].childList){
        dfs(id, nodeList[propName].childList)
      }
    }
  }
  dfs(id,nodeList)
  return node;
}

window.xinComEvent.copyNode = (node) => {
  const newNode =  _.cloneDeep(node);
  newNode.comId = newNode.comType + Math.random();
  if(newNode.childList){
    const childList = {}
    Object.keys(newNode.childList).forEach(propName => {
      const node = window.xinComEvent.copyNode(newNode.childList[propName]);
      childList[node.comId] = node
    })
    newNode.childList = childList
  }
  return newNode;
}

window.xinComEvent.addNode = (node,top,left) => {
  node.style = {
    left: parseInt(node.style.left) + left + 'px',
    top: parseInt(node.style.top) + top + 'px',
    position: 'absolute',
    zIndex:100
  }
  node.comId += (new Date().getTime() + '').slice(6)
  window.xinCtx[node.comId] = node;
}

window.xinComEvent.toPageById = (pageId) => {
  history.push('/metaRender',{pageId});
  window.location.replace(window.location.href)
}

window.xinComEvent.sendAjax = (type,entityCode,params,resCallBack,errCallBack) => {
  if(type === 'create'){
    axios.post(`http://${window.location.hostname}:80/entity/addEntityItem`,{entityParam: params,entityCode})
    .then(res => {
      resCallBack(res)
    })
    .catch(err => {
      errCallBack(err)
    })
  }else if(type === 'find'){
    axios.post(`http://${window.location.hostname}:80/entity/getEntityItem`,{entityParam: params,entityCode})
    .then(res => {
      resCallBack(res)
    })
    .catch(err => {
      errCallBack(err)
    })
  }
}

window.xinComEvent.getVal = (comId) => {
  const node = window.findNodeByComId(comId, window.xinCtx);
  return node.attributeValue
}


window.xinComEvent.createMessage = (message, type) => {
  window.antd.message[type](message)
}