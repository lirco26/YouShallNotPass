import React from 'react';
import './App.css';
import Player from "./multiplayer/Player";
import TriggeredPresenter from "./multiplayer/TriggeredPresenter";
//import GameBody from './GameBody.jsx';

function App() {
  return <div>
        <h1>DND</h1>
        <Player imageSrc="userImages/20181208_142655.jpg" name="LIR" playerClass="LIR" />
        <TriggeredPresenter/>
    </div>;
}

export default App;
