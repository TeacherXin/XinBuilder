import './App.css';
import LeftCom from './MainCom/leftCom';
import RightCom from './MainCom/rightCom';
import RenderCom from './MainCom/renderCom';
import { useState } from 'react';

function App() {

  //用来存储当前拖拽的组件
  const [nowCom, changeNowCom] = useState()
  //用来存储右侧属性面板列表
  const [rightPanel,setRightPanel] = useState({})
  //用来存储当前组件的id
  const [comId,setComId] = useState()
  //用来存储组件的属性值列表
  const [atrributeMap,setAttributeMap] = useState({})

  //左侧组件列表拖拽时更新nowCom
  const changeTopCom =(Com) => {
    changeNowCom(Com)
  }

  const changeRightPanel= (list,id) => {
    rightPanel[id] = list;
    setComId(id)
    setRightPanel({...rightPanel})
  }

  const setRightAttributeMap = (value,id) => {
    atrributeMap[id] = value;
    setAttributeMap({...atrributeMap})
  }


  return (
    <div className="App">
      <LeftCom changeTopCom={changeTopCom}></LeftCom>
      <RenderCom comId={comId} atrributeMap={atrributeMap} changeRightPanel={changeRightPanel}  NowCom={nowCom}></RenderCom>
      <RightCom comId={comId} atrributeMapRight={atrributeMap} setRightAttributeMap={setRightAttributeMap} rightPanel={rightPanel}></RightCom>
    </div>
  );
}

export default App;
