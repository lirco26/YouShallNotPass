import React, {useState} from 'react';
import PropTypes from 'prop-types';
import CLASSES from './classes';
import GameBody from '../single_user_game/GameBody.jsx';


// maybe Player should save the state of its GameBody so it could be related
export default function Player({name, imageSrc, playerClass}) {
    const [isGameBodyOpen, setIsGameBodyOpen] = useState(false);

    function openGameBodyForUser() {
        setIsGameBodyOpen(true);
    }

    return <div>
        <button className={isGameBodyOpen ? 'user-card pressed' : 'user-card'} onClick={openGameBodyForUser}>
            <img src={imageSrc} />
            <div className="user-details">
                <h2>{name}</h2>
                {playerClass}
            </div>
        </button>
        {isGameBodyOpen && <GameBody playerName={name} playerClass={playerClass}/>}
    </div>;
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    playerClass: PropTypes.oneOf(Object.keys(CLASSES)),
};