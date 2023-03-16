import './App.css';
import LeftCom from './MainCom/leftCom';
import RightCom from './MainCom/rightCom';
import RenderCom from './MainCom/renderCom';
import { useState } from 'react';

function App() {

  //用来存储当前拖拽的组件
  const [nowCom, changeNowCom] = useState()
  const [rightPanel,setRightPanel] = useState([])

  //左侧组件列表拖拽时更新nowCom
  const changeTopCom =(Com) => {
    changeNowCom(Com)
  }

  const changeRightPanel= (list) => {
    setRightPanel(list)
  }


  return (
    <div className="App">
      <LeftCom changeTopCom={changeTopCom}></LeftCom>
      <RenderCom changeRightPanel={changeRightPanel}  NowCom={nowCom}></RenderCom>
      <RightCom rightPanel={rightPanel}></RightCom>
    </div>
  );
}

export default App;
