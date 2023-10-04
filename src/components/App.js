/**
 * NOTES: 
 * 1. React-router-dom :: The main components of react-router-dom are:
 *  - BrowswerRouter - It is a router implementation that uses HTML5 history API(pushState, replaceState, and the popstate event) to keep your UI 
 *                     in sync with the URL. It is the parent component that is used to store all of the other components. 
 * - Routes - It is the successor of 'Switch' component and it allows you to define multiple rotues and render the first matching one. 
 * - Route - Route is the conditionally shown component that renders some UI when its path matches the current URL.
 * - Link - The link component is used to create links to different routes and implement navigation around the application. It works like an HTML
 *          anchor tag. 
 */

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