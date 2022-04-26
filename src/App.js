import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Grupo 17
      </object>
    </div>
  );
}

export default App;
