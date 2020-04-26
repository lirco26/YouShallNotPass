import React from 'react';
import './App.css';
import GameBody from './GameBody.jsx';

function App() {
  return <div>
        <h1>DND</h1>
        <GameBody minTotalPoints={85} maxTotalPoints={89} />
    </div>;
}

export default App;
