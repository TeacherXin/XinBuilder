import './App.css';
import LeftCom from './MainCom/leftCom';
import RightCom from './MainCom/rightCom';
import RenderCom from './MainCom/renderCom';
import DesignTop from './DesignTop';
import { useEffect, useState } from 'react';

function App() {

  //用来存储当前拖拽的组件
  const [nowCom, changeNowCom] = useState()
  //用来存储右侧属性面板列表
  const [rightPanel,setRightPanel] = useState({})
  //用来存储当前组件的id
  const [comId,setComId] = useState()

  //左侧组件列表拖拽时更新nowCom
  const changeTopCom =(Com) => {
    changeNowCom(Com)
  }

  const changeRightPanel= (list,id) => {
    rightPanel[id] = list;
    setComId(id)
    setRightPanel({...rightPanel})
  }


  return (
    <div className="App">
      <DesignTop></DesignTop>
      <LeftCom changeTopCom={changeTopCom}></LeftCom>
      <RenderCom comId={comId} changeRightPanel={changeRightPanel}  NowCom={nowCom}></RenderCom>
      <RightCom comId={comId} rightPanel={rightPanel}></RightCom>
    </div>
  );
}

export default App;
