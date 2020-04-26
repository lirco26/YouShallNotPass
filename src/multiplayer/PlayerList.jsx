import React, {useState} from 'react';

import Player from './Player.jsx';
import CLASSES from './classes';


export default function usePlayerList() {
    const [playerList, setPlayerList] = useState([]);

    function addPlayer(name, imageSrc, playerClass) {
        if (playerList.map(player => player.key).includes(name)) {
            alert('This name already exists. Please choose another name');
        }
        else {
            const newPlayer = <Player
                key={name}
                imageSrc={imageSrc}
                name={name}
                playerClass={playerClass}
            />;
            console.log((newPlayer.key));
            setPlayerList(prevPlayerList => {
                const newPlayerList = [...prevPlayerList];
                newPlayerList.push(newPlayer);
                return newPlayerList;
            })
        }
    }

    return [playerList, addPlayer];
}

export function AddPlayerButton({addPlayer}) {
    return <button className="add-player-button" onClick={addPlayer}>
        + Add player
    </button>;
}

export function AddPlayerForm({addPlayer}) {
    const [name, setName] = useState('');
    const [playerClass, setClass] = useState(Object.keys(CLASSES)[0]);

    return <div className="add-player-form">
        Name:
        <input
            className="add-player-input"
            type="text" value={name}
            onChange={event => setName(event.target.value)}
        />
        Class:
        <select
            className="add-player-input"
            onChange={event => setClass(event.target.value)}>
            {Object.keys(CLASSES).map(key =>
                <option value={key}> {key} </option>
            )}
        </select>
        <button className="submit-button" onClick={() => {
            if (name && playerClass)
                addPlayer(name.toUpperCase(), `userImages/${playerClass}.jpeg`, playerClass);
        }}> Submit
        </button>
    </div>
}