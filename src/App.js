import React from 'react';
import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Error from './pages/Error';
import SingleRoom from './pages/SingleRoom';

function App() {
  return (
    <>
        <Home></Home>
        <Rooms></Rooms>
        <SingleRoom></SingleRoom>
        <Error></Error>
    </>
  );
}

export default App;
