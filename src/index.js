import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Routes , Route} from "react-router-dom";

const PageList = lazy(() => import('./PageList'))
const App = lazy(() => import('./App'))
const MetaRender = lazy(() => import('./MetaRender'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Suspense>
    <Routes>
      <Route path={'/'} element={<PageList />}></Route>
      <Route path={'/home'} element={<App />}></Route>
      <Route path={'/metaRender'} element={<MetaRender />}></Route>
    </Routes>
    </Suspense>
  </Router>
);