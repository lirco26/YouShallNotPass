import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CLASSES from './classes';
import PlayerEditor, {GAME_SETTINGS} from '../singleplayer/PlayerEditor.jsx';
import {SubmitButton} from './AddPlayerForm.jsx';


export default function Player({name, imageSrc, playerClass, editPlayer, doneEditingPlayer}) {
    const [isPlayerEditorOpen, setIsPlayerEditorOpen] = useState(true);
    const [skillNameToPoints, setSkillNameToPoints] = useState({});
    const totalPoints = useState(_.random(GAME_SETTINGS.MIN_TOTAL_POINTS, GAME_SETTINGS.MAX_TOTAL_POINTS))[0];

    useEffect(()=> {
        editPlayer();
    }, [editPlayer]);

    function openEditorForPlayer() {
        if (editPlayer()) {
            setIsPlayerEditorOpen(true);
        }
    }

    function closeEditorForPlayer() {
        setIsPlayerEditorOpen(false);
        doneEditingPlayer();
    }

    function getFreePoints() {
        return totalPoints + GAME_SETTINGS.BONUS_SKILL_POINTS - _.sum(Object.values(skillNameToPoints));
    }

    function submit() {
        if (getFreePoints() === 0) {
            closeEditorForPlayer();
        } else {
            alert('You cannot submit your changes if free points isn\'t 0');
        }
    }

    return <div>
        <PlayerCard
            name={name}
            imageSrc={imageSrc}
            playerClass={playerClass}
            isPlayerEditorOpen={isPlayerEditorOpen}
            onClick={openEditorForPlayer}
        />

        {isPlayerEditorOpen &&
        <div className="player-game-body">
            <button className="close-button player-game-body" onClick={closeEditorForPlayer}> x </button>
            <PlayerEditor
                playerName={name}
                playerClass={playerClass}
                totalSkillPoints={totalPoints}
                freePoints={getFreePoints()}
                skillNameToPoints={skillNameToPoints}
                setSkillNameToPoints={setSkillNameToPoints}
            />
            <SubmitButton className="global-button" submitFunction={submit} />
        </div>}
    </div>;
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    playerClass: PropTypes.oneOf(Object.keys(CLASSES)).isRequired,
    editPlayer: PropTypes.func.isRequired,
    doneEditingPlayer: PropTypes.func.isRequired,
};


function PlayerCard({name, imageSrc, playerClass, isPlayerEditorOpen, onClick}) {
    return <button className={isPlayerEditorOpen ? 'user-card pressed' : 'user-card'} onClick={onClick}>
        <img src={imageSrc} alt="player's profile"/>
        <div className="user-details">
            <h2>{name}</h2>
            {playerClass}
        </div>
    </button>;
}

PlayerCard.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    playerClass: PropTypes.oneOf(Object.keys(CLASSES)).isRequired,
    isPlayerEditorOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};


export class PlayerObject {
    constructor(name, imageSrc, playerClass, editPlayer, doneEditingPlayer) {
        this.name = name;
        this.imageSrc = imageSrc;
        this.playerClass = playerClass;
        this.editPlayer = editPlayer.bind(this);
        this.doneEditingPlayer = doneEditingPlayer.bind(this);
    }
}
