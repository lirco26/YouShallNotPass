import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Player, {PlayerObject} from './Player.jsx';


export function usePlayerList() {
    const [playerList, setPlayerList] = useState([]);
    const NAME_EXISTS_ERROR_MESSAGE = 'This name already exists. Please choose another name';

    function addPlayer(name, imageSrc, playerClass, editPlayer, doneEditingPlayer) {
        if (playerList.map(player => player.key).includes(name)) {
            alert(NAME_EXISTS_ERROR_MESSAGE);
        } else {
            const newPlayer = new PlayerObject(name, imageSrc, playerClass, editPlayer, doneEditingPlayer);
            setPlayerList(prevPlayerList => {
                const newPlayerList = [...prevPlayerList];
                newPlayerList.push(newPlayer);
                return newPlayerList;
            });
        }
    }

    return [playerList, addPlayer];
}

export default function PlayerList({listOfPlayers}) {
    return <div>
        <h2> ALL PLAYERS: </h2>
        {listOfPlayers.map(player => <Player
            key={player.name}
            imageSrc={player.imageSrc}
            name={player.name}
            playerClass={player.playerClass}
            editPlayer={player.editPlayer}
            doneEditingPlayer={player.doneEditingPlayer}
        />)}
    </div>;
}

PlayerList.propTypes = {
    listOfPlayers: PropTypes.arrayOf(PropTypes.shape(Player)).isRequired,
};
