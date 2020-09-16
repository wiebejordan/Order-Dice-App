import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from '../src/Components/Landing/Landing'
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';



function App() {
  return (
    <div className="App">
      
      {routes}
    </div>
  );
}

export default App;
