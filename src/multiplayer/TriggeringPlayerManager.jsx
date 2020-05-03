import React, {useState} from 'react';

import PlayerList, {usePlayerList} from './PlayerList.jsx';
import AddPlayerForm, {AddPlayerButton} from './AddPlayerForm.jsx';


export default function TriggeredPlayerManager() {
    // This is redundant Ive tried to replace it with the next hook state
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);
    const [isPresenting, setIsPresenting] = useState(false);
    const [playerList, addPlayer] = usePlayerList();
    const ALREADY_PRESENTING_ERROR_MESSAGE = 111;

    function triggeredAddPlayer() {
        if (!isPresenting) {
            setIsAddingPlayer(true);
            setIsPresenting(true);
        } else {
            alert(ALREADY_PRESENTING_ERROR_MESSAGE)
        }
    }

    function doneAddingPlayer() {
        setIsAddingPlayer(false);
        setIsPresenting(false);
    }

    function triggeredEditPlayer() {
        if (!isPresenting) {
            // setIsPresenting(true);
            return true
        } else {
            alert(ALREADY_PRESENTING_ERROR_MESSAGE);
            return false;
        }
    }

    function doneEditingPlayer() {
        setIsPresenting(false);
    }

    function addPlayerEvents(name, imageSrc, playerClass) {
        addPlayer(name, imageSrc, playerClass, triggeredEditPlayer, doneEditingPlayer);
        doneAddingPlayer();
    }

    return <div>
        <PlayerList listOfPlayers={playerList} />
        <AddPlayerButton addPlayer={triggeredAddPlayer} />

        {isAddingPlayer &&
        <AddPlayerForm
            addPlayer={(name, imageSrc, playerClass) => {
                addPlayer(name, imageSrc, playerClass, triggeredEditPlayer, doneEditingPlayer);
                doneAddingPlayer();
            }}
            doneAddingPlayer={doneAddingPlayer}
        />}
    </div>;
}