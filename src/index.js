import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// function Button(){

//   const [num,setNum] = useState(0);
//   const [str,setStr] = useState('')

//   useEffect(() => {
//     setStr(str + 'num')
//   },[num])

//   return <div>
//     <p>{num}</p>
//     <p>{str}</p>
//     <button onClick={() => {setNum(num + 1)}}>+1</button>
//   </div>
// }

// class Button2 extends React.Component {
//   state = {
//     num: 0
//   }

//   setNum = () => {
//     this.setState({
//       num: this.state.num + 1
//     })
//   }

//   render(){
//     return <div>
//     <p>{this.state.num}</p>
//     <button onClick={this.setNum}>+1</button>
//   </div>
//   }
// }


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Button />
//   </React.StrictMode>
// );