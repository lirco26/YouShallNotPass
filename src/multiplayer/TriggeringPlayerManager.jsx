import React, {useCallback, useState, useMemo} from 'react';

import usePlayerList, {AddPlayerButton, AddPlayerForm} from './PlayerList.jsx';
import Player from "./Player.jsx";
import userEvent from "@testing-library/user-event";


export default function TriggeringPlayerManager() {
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);
    const [isEditingGameBody, setIsEditingGameBody] = useState(false);
    const [playerList, addPlayer] = usePlayerList();
    const ALREADY_PRESENTING_ERROR_MESSAGE = 'already';

    const isAlreadyPresenting = useMemo(function () {
        return isAddingPlayer || isEditingGameBody;
    }, [isAddingPlayer, isEditingGameBody]);

    const triggeredAddPlayer = useCallback(function () {
        if (isAlreadyPresenting) {
            alert(ALREADY_PRESENTING_ERROR_MESSAGE);
        } else {
            setIsAddingPlayer(true);
        }
    }, [isAlreadyPresenting, setIsAddingPlayer]);

    function doneAddingPlayer() {
        setIsAddingPlayer(false);
    }

    const triggeredEditGameBody = useCallback(function () {
        if (isAlreadyPresenting) {
            alert(ALREADY_PRESENTING_ERROR_MESSAGE);
            return false;
        } else {
            setIsEditingGameBody(true);
            return true;
        }
    }, [isAlreadyPresenting, setIsEditingGameBody]);

    function doneEditingGameBody() {
        setIsEditingGameBody(false);
    }

    const f = useCallback((name, imageSrc, playerClass) => {
        addPlayer(name, imageSrc, playerClass, triggeredEditGameBody, doneEditingGameBody);
        doneAddingPlayer();
    }, [triggeredEditGameBody, doneEditingGameBody, doneAddingPlayer]);

    return <div>
        <h2> ALL PLAYERS: </h2>
        {playerList.map(({name, imageSrc, playerClass, editGameBody, doneEditingGameBody}) => <Player
            key={name}
            imageSrc={imageSrc}
            name={name}
            playerClass={playerClass}
            editGameBody={editGameBody}
            doneEditingGameBody={doneEditingGameBody}
        />)}
        <AddPlayerButton addPlayer={triggeredAddPlayer}/>

        {isAddingPlayer &&
        <div>
            <AddPlayerForm addPlayer={f}/>
            <button className="add-player-form close-button" onClick={doneAddingPlayer}> x</button>
        </div>}
    </div>;
}