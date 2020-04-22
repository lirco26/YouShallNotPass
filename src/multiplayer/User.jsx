import React from 'react';
import PropTypes from 'prop-types';
// import GameBody from './single_user_game/GameBody.jsx';

export default function User({name, imageSrc, userClass}) {
    function openGameBodyForUser() {
    }

    return <button className="user" onClick={openGameBodyForUser}>
        <img src={imageSrc}/>
        <div className="user-details">
            <h2>{name}</h2>
            {userClass}
        </div>
    </button>;
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    //userClass: PropTypes.oneOf() - typescipt enum here.
};