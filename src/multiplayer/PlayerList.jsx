import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Player, {PlayerObject} from './Player.jsx';


export function usePlayerList() {
    const [playerList, setPlayerList] = useState([]);
    const NAME_EXISTS_ERROR_MESSAGE = 'This name already exists. Please choose another name';

    function addPlayer(name, imageSrc, playerClass, present, stopPresenting) {
        if (playerList.map(player => player.name).includes(name)) {
            alert(NAME_EXISTS_ERROR_MESSAGE);
        } else {
            const newPlayer = new PlayerObject(name, imageSrc, playerClass, present, stopPresenting);
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
            present={player.present}
            stopPresenting={player.stopPresenting}
        />)}
    </div>;
}

PlayerList.propTypes = {
    listOfPlayers: PropTypes.arrayOf(PropTypes.shape(Player)).isRequired,
};
