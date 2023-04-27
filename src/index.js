import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MetaRender from './MetaRender';
import Test from './Test'
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={'/home'} element={<App />}></Route>
        <Route path={'/metaRender'} element={<MetaRender />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);