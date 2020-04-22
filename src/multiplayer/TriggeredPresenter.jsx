import React, {useState} from "react";

import usePlayerList, {AddPlayerButton, AddPlayerForm} from './PlayerList.jsx';


/**
 * this component presents a triggered component:
 * A. An add-player-form
 * B. A player's game-body
 */
export default function TriggeredPresenter() {
    const [isPresenting, setIsPresenting] = useState(false);
    const [playerList, addPlayer] = usePlayerList();

    function triggeredShowComponent() {
        setIsPresenting(true);
    }

    function doneShowComponent() {
        setIsPresenting(false);
    }

    return <div>
        {playerList}
        <AddPlayerButton addPlayer={triggeredShowComponent}/>
        {isPresenting && <AddPlayerForm addPlayer={(name, imageSrc, playerClass) => {
            addPlayer(name, imageSrc, playerClass);
            doneShowComponent();
        }}/>}
    </div>;
}