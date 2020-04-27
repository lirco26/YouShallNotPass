import React, {useState} from 'react';

import usePlayerList, {AddPlayerButton, AddPlayerForm} from './PlayerList.jsx';


export default function TriggeredAddingPlayer() {
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);
    const [isEditingGameBody, setIsEditingGameBody] = useState(false);
    const [playerList, addPlayer] = usePlayerList();

    function triggeredAddPlayer() {
        setIsAddingPlayer(true);
    }

    function doneShowingComponent() {
        setIsAddingPlayer(false);
    }

    return <div>
        <h2> ALL PLAYERS: </h2>
        {playerList}
        <AddPlayerButton addPlayer={triggeredAddPlayer} />

        {isAddingPlayer &&
        <div>
            <AddPlayerForm addPlayer={(name, imageSrc, playerClass, editGameBody) => {
                addPlayer(name, imageSrc, playerClass);
                doneShowingComponent();
            }} />
            <button className="add-player-form close-button" onClick={doneShowingComponent}> x </button>
        </div>}
    </div>;
}