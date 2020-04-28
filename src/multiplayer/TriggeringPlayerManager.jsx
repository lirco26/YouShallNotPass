import React, {useState} from 'react';

import PlayerList, {usePlayerList} from './PlayerList.jsx';
import AddPlayerForm, {AddPlayerButton} from './AddPlayerForm.jsx';


export default function TriggeredPlayerManager() {
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);
    const [isEditingPlayer, setIsEditingPlayer] = useState(false);
    const [playerList, addPlayer] = usePlayerList();
    const ALREADY_PRESENTING_ERROR_MESSAGE = 111;

    function triggeredAddPlayer() {
        if (!isEditingPlayer && !isAddingPlayer) {
            setIsAddingPlayer(true);
        } else {
            alert(ALREADY_PRESENTING_ERROR_MESSAGE)
        }
    }

    function doneAddingPlayer() {
        setIsAddingPlayer(false);
    }

    function triggeredEditPlayer() {
        // setIsEditingPlayer(true);
        // return true;
        if (!isEditingPlayer && !isAddingPlayer) {
            setIsEditingPlayer(true);
            return true
        } else {
            alert(ALREADY_PRESENTING_ERROR_MESSAGE);
            return false;
        }
    }

    function doneEditingPlayer() {
        setIsEditingPlayer(false);
    }

    function addPlayerEvents(name, imageSrc, playerClass) {
        addPlayer(name, imageSrc, playerClass, triggeredEditPlayer, doneEditingPlayer);
        doneAddingPlayer();
    }

    return <div>
        <PlayerList listOfPlayers={playerList} />
        <AddPlayerButton addPlayer={triggeredAddPlayer} />

        {isAddingPlayer &&
        <AddPlayerForm addPlayer={addPlayerEvents} doneAddingPlayer={doneAddingPlayer} />
        }
    </div>;
}