import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CLASSES from './classes';
import GameBody, {GAME_SETTINGS} from '../single_user_game/GameBody.jsx';


export default function Player({name, imageSrc, playerClass}) {
    const [isGameBodyOpen, setIsGameBodyOpen] = useState(false);
    const [skillNameToPoints, setSkillNameToPoints] = useState({});
    const totalPoints = useState(_.random(GAME_SETTINGS.MIN_TOTAL_POINTS, GAME_SETTINGS.MAX_TOTAL_POINTS))[0];

    function openGameBodyForUser() {
        setIsGameBodyOpen(true);
    }

    function doneShowingComponent() {
        setIsGameBodyOpen(false);
    }

    function getFreePoints() {
        return totalPoints + GAME_SETTINGS.BONUS_SKILL_POINTS - _.sum(Object.values(skillNameToPoints));
    }

    function submit() {
        if (getFreePoints() === 0) {
            doneShowingComponent();
        }
        else {
            alert('You cannot submit your changes if free points isn\'t 0');
        }
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
            <button className="close-button player-game-body" onClick={doneShowingComponent}> x</button>
            <GameBody
                playerName={name}
                playerClass={playerClass}
                totalSkillPoints={totalPoints}
                freePoints={getFreePoints()}
                skillNameToPoints={skillNameToPoints}
                setSkillNameToPoints={setSkillNameToPoints}
            />
            <button className="global-button" onClick={() => {
                submit();
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