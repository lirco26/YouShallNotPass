import React, {useState} from 'react';

import Player from './Player.jsx';


function usePlayerList() {
    const [playerList, setPlayerList] = useState([]);

    function addPlayer(name, imageSrc, playerClass) {
        const newPlayer = <Player
            key={name}
            imageSrc={imageSrc}
            name={name}
            playerClass={playerClass}
        />;
        setPlayerList(prevPlayerList => {
            const newPlayerList = [...prevPlayerList];
            newPlayerList.push(newPlayer);
            return newPlayerList;
        })
    }

    return [playerList, addPlayer];
}

function AddPlayerButton({addPlayer}) {
    return <button onClick={addPlayer}> Add player </button>;
}

export function PresentComponent() {
    const [isPresenting, setIsPresenting] = useState(false);
    const [playerList, addPlayer] = usePlayerList();

    function triggeredAddPlayer() {
        setIsPresenting(true);
    }

    return <div>
        {playerList}
        <AddPlayerButton addPlayer={triggeredAddPlayer}/>
        {isPresenting && <AddPlayerForm addPlayer={(name, imageSrc, playerClass) => {
            addPlayer(name, imageSrc, playerClass);
            setIsPresenting(false);
        }}/>}
    </div>;
}

function AddPlayerForm({addPlayer}) {
    const [name, setName] = useState('');
    const [playerClass, setClass] = useState('');

    return <div className="add-player">
        name:
        <input
            className="add-player-input"
            type="text" value={name}
            onChange={event => setName(event.target.value)}
        />
        class:
        <input
            className="add-player-input"
            type="text"
            value={playerClass}
            onChange={event => setClass(event.target.value)}
        />
        <button onClick={() => {
            if (name && playerClass)
                addPlayer(name, "", playerClass);
        }}> Submit
        </button>
    </div>
}