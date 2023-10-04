import React from 'react';
import ReactDelayRender from 'react-delay-render';

const Loading = () => {
  return(
    <p>Loading ...</p>
  )
}

// If the new page loads really fast, we don't want the user to see a flashing loading spinner for a couple of 
// milliseconds, so we delay the Loading Component by 300 ms. 
export default ReactDelayRender({ delay: 300 })(Loading);