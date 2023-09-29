import React from 'react';
import { Link } from 'react-router-dom';

import { pullRight, h1 } from './layout.css';

const Layout = ({ children }) => {
  return (
    <div >
      <Link to="/">
        <h1 as="h1" className={h1}>
          webpack-for-react
        </h1>
      </Link>
      {children}
      <br />
      <p className={pullRight}>
        Made with love by Roshan Pratap Katel
      </p>
    </div>
  );
};

export default Layout;