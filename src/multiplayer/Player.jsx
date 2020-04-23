import React from 'react';
import PropTypes from 'prop-types';
import CLASSES from "./classes";
import GameBody from '../single_user_game/GameBody.jsx';
import TriggeredPresenter from "./TriggeredPresenter";


// maybe Player should save the state of its GameBody so it could be related
export default function Player({name, imageSrc, playerClass}) {
    function openGameBodyForUser() {
    }

    return <div>
        <button className="user" onClick={openGameBodyForUser}>
            <img src={imageSrc}/>
            <div className="user-details">
                <h2>{name}</h2>
                {playerClass}
            </div>
        </button>
    </div>;
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    playerClass: PropTypes.oneOf(Object.keys(CLASSES)),
};