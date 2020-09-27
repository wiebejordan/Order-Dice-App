import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from '../src/Components/Landing/Landing'
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <div className="App">
      
      {routes}
      <Footer/>
    </div>
  );
}

export default App;
