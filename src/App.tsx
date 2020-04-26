import React from 'react';
import './App.css';
import './multiplayer.css'
import TriggeredPresenter from './multiplayer/TriggeredPresenter';
import GameBody from './single_user_game/GameBody';

function App() {
    return <div>
        <h1>DND</h1>
        <TriggeredPresenter />
    </div>;
}

export default App;
