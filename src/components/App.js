import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Home from './Home';
import DynamicPage from './DynamicPage';
import NoMatch from './DynamicPage';
import Loading from './Loading';
import '../main.css';

const AsyncDynamicPage = importedComponent(
  () => import('./DynamicPage'),
  {
    LoadingComponent: Loading
  }
);
const AsyncNoMatch = importedComponent(
  () => import('./NoMatch'),
  {
    LoadingComponent: Loading
  }
);

const App = () => {
  return(
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dynamic" element={<AsyncDynamicPage />} />
          <Route element={<AsyncNoMatch />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;