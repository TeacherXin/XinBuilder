import _ from 'lodash';
import Store from '../Store'
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

window.xinComEvent.copyNode = (node) => {
  return _.cloneDeep(node)
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
    axios.post(`http://${window.location.hostname}:3003/entity/addEntityItem`,{entityParam: params,entityCode})
    .then(res => {
      resCallBack(res)
    })
    .catch(err => {
      errCallBack(err)
    })
  }else if(type === 'find'){
    axios.post(`http://${window.location.hostname}:3003/entity/getEntityItem`,{entityParam: params,entityCode})
    .then(res => {
      resCallBack(res)
    })
    .catch(err => {
      errCallBack(err)
    })
  }
}