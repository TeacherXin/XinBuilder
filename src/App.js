import './App.css';
import LeftCom from './MainCom/leftCom';
import RightCom from './MainCom/rightCom';
import RenderCom from './MainCom/renderCom';
import { useState } from 'react';

function App() {

  const [nowCom, changeNowCom] = useState()
  const [style,changeStyle] = useState({})

  const changeTopCom =(Com) => {
    changeNowCom(Com)
  }

  const changeChildStyle = (style) => {
    changeStyle(style)
  }

  return (
    <div className="App">
      <LeftCom changeTopCom={changeTopCom} changeChildStyle={changeChildStyle}></LeftCom>
      <RenderCom  NowCom={nowCom} nowStyle={style}></RenderCom>
      <RightCom></RightCom>
    </div>
  );
}

export default App;
