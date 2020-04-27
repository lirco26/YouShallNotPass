import React, {useState} from 'react';
import PropTypes from 'prop-types';

import CLASSES from './classes';
import GameBody from '../single_user_game/GameBody.jsx';


export default function Player({name, imageSrc, playerClass}) {
    const [isGameBodyOpen, setIsGameBodyOpen] = useState(false);
    const [skillNameToPoints, setSkillNameToPoints] = useState({});

    function openGameBodyForUser() {
        setIsGameBodyOpen(true);
    }

    function doneShowingComponent() {
        setIsGameBodyOpen(false);
    }

    return <div>
        <button className={isGameBodyOpen ? 'user-card pressed' : 'user-card'} onClick={openGameBodyForUser}>
            <img src={imageSrc} alt="player's profile"/>
            <div className="user-details">
                <h2>{name}</h2>
                {playerClass}
            </div>
        </button>
        {isGameBodyOpen &&
        <div className="player-game-body">
            <button className="close-button close-button-game-body" onClick={doneShowingComponent}> x </button>
            <GameBody
                playerName={name}
                playerClass={playerClass}
                skillNameToPoints={skillNameToPoints}
                setSkillNameToPoints={setSkillNameToPoints}
            />
            <button className="global-button" onClick={() => {
                doneShowingComponent()
            }}> Submit
            </button>
        </div>}
    </div>;
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    playerClass: PropTypes.oneOf(Object.keys(CLASSES)),
};