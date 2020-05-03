import React from 'react';
import PropTypes from 'prop-types';

import PlayerList, {usePlayerList} from './PlayerList.jsx';
import AddPlayerForm, {AddPlayerButton} from './AddPlayerForm.jsx';


export default function TriggeringPlayerManager({present, stopPresenting}) {
    const [playerList, addPlayer] = usePlayerList();

    function triggeredAddPlayer() {
        const addPlayerForm = <AddPlayerForm
            addPlayer={addPlayerEvents}
            doneAddingPlayer={stopPresenting}
        />;
        present(addPlayerForm);
    }

    function addPlayerEvents(name, imageSrc, playerClass) {
        addPlayer(name, imageSrc, playerClass, present, stopPresenting);
        stopPresenting();
    }

    return <div>
        <PlayerList listOfPlayers={playerList} />
        <AddPlayerButton addPlayer={triggeredAddPlayer} />
    </div>;
}

TriggeringPlayerManager.propTypes = {
    present: PropTypes.func.isRequired,
    stopPresenting: PropTypes.func.isRequired,
};