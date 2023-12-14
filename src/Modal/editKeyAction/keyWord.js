import React, { useState } from 'react'
import './keyWord.css'
import EditAction from '../editAction'
import Store from '../../store';
import _, { now } from 'lodash'

export default function KeyWord(props) {
  const firstList = ['q','w','e','r','t','y','u','i','o','p']
  const secondList = ['a','s','d','f','g','h','j','k','l']
  const thirdList = ['z','x','c','v','b','n','m']
  const lastList = ['space','↑','←','↓','→']
  const [showAction, setShowAction] = useState(false)
  const [actionJs, setActionJs] = useState({})
  const [nowKey, setNowKey] = useState('')
  let attributeMap = _.cloneDeep(Store.getState().attributeMap);

  const submitAction = (flag) => {
    return () => {
      if(flag) {
        let node = window.findNodeByComId(props.comId,attributeMap)
        if(!node.actionJs){
          node.actionJs = {}
        }
        node.actionJs[nowKey] = actionJs?.[nowKey];
        Store.dispatch({type: 'change',attributeMap})
      }
      setShowAction(false)
    }
  }
  
  const changeActionJs = (delay) => {
    let timer = null;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const actionJson = actionJs ||  {};
        actionJson[nowKey] = value
        setActionJs(actionJson)
      }, delay);
    }
  }


  const itemClick = (key) => {
    return () => {
      let node = window.findNodeByComId(props?.comId,attributeMap)
      if(node?.actionJs?.[key]) {
        setActionJs(node?.actionJs)
      }
      setShowAction(true)
      setNowKey(key)
    }
  }

  return (
    <div>
      <div className='firstList'>
        {
          firstList.map(item => {
            return <div onClick={itemClick(item)} key={item} className='keyItem'>{item}</div>
          })
        }
      </div>
      <div className='secondList'>
        {
          secondList.map(item => {
            return <div onClick={itemClick(item)} key={item} className='keyItem'>{item}</div>
          })
        }
      </div>
      <div className='thirdList'>
        {
          thirdList.map(item => {
            return <div onClick={itemClick(item)} key={item} className='keyItem'>{item}</div>
          })
        }
      </div>
      <div className='lastList'>
        {
          lastList.map(item => {
            return <div onClick={itemClick(item)} key={item} className={item === 'space' ? 'spaceItem' : 'keyItem'}>{item}</div>
          })
        }
      </div>
      <EditAction actionName={nowKey} actionJs={actionJs} changeActionJs={changeActionJs(800)} submitAction={submitAction} showAction={showAction} />
    </div>
  )
}
