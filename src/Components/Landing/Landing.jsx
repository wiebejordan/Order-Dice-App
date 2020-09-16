import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
  return(
    <div>
      <Link to='/setup'>
      <button>Begin</button>
      </Link>
    </div>
  )
}

export default Landing;