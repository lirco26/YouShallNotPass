import React, {useState} from "react";

import usePlayerList, {AddPlayerButton, AddPlayerForm} from './PlayerList.jsx';
import GameBody from '../single_user_game/GameBody';


/**
 * this component presents a triggered component:
 * A. An add-player-form
 * B. A player's game-body - [received as props to the component???]
 */
export default function TriggeredPresenter({gameBody}) {
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);
    const [isPresenting, setIsPresenting] = useState(false);
    const [playerList, addPlayer] = usePlayerList();

    function triggeredAddPlayer() {
        if (!isPresenting) {
            setIsPresenting(true);
            setIsAddingPlayer(true);
        } else {
            alert('You cannot open another card. Submit your changes first and then start something else');
        }
    }

    function doneShowComponent() {
        setIsPresenting(false);
        setIsAddingPlayer(false);
    }

    function triggredSetPlayerGameBody() {
    }

    return <div>
        <h2> ALL PLAYERS: </h2>
        {playerList}
        <AddPlayerButton addPlayer={triggeredAddPlayer} />

        {isAddingPlayer &&
        <div>
            <AddPlayerForm addPlayer={(name, imageSrc, playerClass) => {
                addPlayer(name, imageSrc, playerClass);
                doneShowComponent();
            }} />
            <button className="add-player close-button" onClick={doneShowComponent}> x </button>
        </div>}
    </div>;
}