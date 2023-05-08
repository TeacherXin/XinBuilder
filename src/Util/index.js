import _ from 'lodash';
import Store from '../Store'


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
        Store.dispatch({type: 'change',attributeMap: target});
        return true
      }else{
        target[property] = value;
        Store.dispatch({type: 'change',attributeMap: target,comId:target.comId});
      }
    }
  })
}

window.xinComEvent.copyNode = (node) => {
  return _.cloneDeep(node)
}

window.xinComEvent.addNode = (node,top,left) => {
  node.position = {
    left: parseInt(node.position.left) + left + 'px',
    top: parseInt(node.position.top) + top + 'px',
  }
  node.comId += (new Date().getTime() + '').slice(6)
  window.xinCtx[node.comId] = node;
}