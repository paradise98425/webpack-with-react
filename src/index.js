import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// ReactDom.render is no longer supported in React18. Use createRoot instead. 
// ReactDOM.render(<App />), document.getElementById('root');

createRoot(document.getElementById('root')).render(<App />)