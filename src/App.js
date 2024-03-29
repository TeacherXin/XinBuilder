import './App.css';
import LeftCom from './pages/mainCom/leftCom';
import RightCom from './pages/mainCom/rightCom';
import RenderCom from './pages/mainCom/renderCom';
import DesignTop from './pages/mainCom/designTop';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function App() {

  const navigate  = useNavigate();
  //用来存储当前拖拽的组件
  const [nowCom, changeNowCom] = useState()
  //用来存储右侧属性面板列表
  const [rightPanel,setRightPanel] = useState({})
  //用来存储当前组件的id
  const [comId,setComId] = useState()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user){
      axios.post(`http://${window.location.hostname}:80/login/getUser`,{
        username: user.username,
        password: user.password
      }).then(res => {
        if(!res.data.data){
          navigate('/');
        }
      })
    }
  },[])

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
      <LeftCom changeRightPanel={changeRightPanel} changeTopCom={changeTopCom}></LeftCom>
      <RenderCom comId={comId} changeRightPanel={changeRightPanel}  NowCom={nowCom}></RenderCom>
      <RightCom comId={comId} rightPanel={rightPanel}></RightCom>
    </div>
  );
}

export default App;
