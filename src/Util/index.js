import Store from '../Store'


window.xinCtx = {}

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
      }else{
        target[property] = value;
        Store.dispatch({type: 'change',attributeMap: target,comId:target.comId});
      }
    }
  })
}