import './App.css';
import LeftCom from './MainCom/leftCom';
import RightCom from './MainCom/rightCom';
import RenderCom from './MainCom/renderCom';
import { useState } from 'react';

function App() {

  //用来存储当前拖拽的组件
  const [nowCom, changeNowCom] = useState()

  //左侧组件列表拖拽时更新nowCom
  const changeTopCom =(Com) => {
    changeNowCom(Com)
  }

  return (
    <div className="App">
      <LeftCom changeTopCom={changeTopCom}></LeftCom>
      <RenderCom  NowCom={nowCom}></RenderCom>
      <RightCom></RightCom>
    </div>
  );
}

export default App;
