import React from 'react';
import './App.css';
import TriggeredPresenter from "./multiplayer/TriggeredPresenter";
import GameBody from "./single_user_game/GameBody";

//import GameBody from './GameBody.jsx';

function App() {
    return <div>
        <h1>DND</h1>
        <GameBody/>
        <TriggeredPresenter />
    </div>;
}

export default App;
