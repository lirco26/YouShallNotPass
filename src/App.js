import React from 'react';
import './App.css';
import PointsSynchronizer from './PointsSynchronizer.jsx';

function App() {
  return <div>
        <h1>DND</h1>
        <PointsSynchronizer minTotalPoints={85} maxTotalPoints={89} />
    </div>;
}

export default App;
