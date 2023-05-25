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