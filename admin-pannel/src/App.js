import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css'
import Auth from './Routes/Routes';

function App() {
  return (
    <div>
          
      <BrowserRouter>
        <Auth/>
      </BrowserRouter>
    </div>
  );
}

export default App;
