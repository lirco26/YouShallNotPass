import PropTypes from 'prop-types';
import React from 'react';

function PointsDescription({totalPoints, freePoints}) {
    return <div className="points-description">
        <span>Total skill points: {totalPoints} </span>
        <span>Free skill points: {freePoints}</span>
    </div>;
}

PointsDescription.propTypes = {
    totalPoints: PropTypes.number.isRequired,
    freePoints: PropTypes.number.isRequired,
};


function ErrorMessage({message}) {
    return <span className="error-message">{message}</span>;
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
};


function ControlButtonList({buttonsNamesToFunctions}) {
    const buttons = [];
    for (let buttonName of Object.keys(buttonsNamesToFunctions))
    {
        const button = <button className="control-button" onClick={buttonsNamesToFunctions[buttonName]}>{buttonName}</button>
        buttons.push(button);
    }
    return <div className="control-buttons">
        {buttons}
    </div>;
}

ControlButtonList.propTypes = {
    buttonsNamesToFunctions: PropTypes.objectOf(PropTypes.func).isRequired,
};


export {PointsDescription, ErrorMessage, ControlButtonList};