import PropTypes from 'prop-types';
import React from 'react';


export function PointsDescription({totalPoints, freePoints}) {
    return <div className="points-description">
        <span>Total skill points: {totalPoints} </span>
        <span>Free skill points: {freePoints}</span>
    </div>;
}

PointsDescription.propTypes = {
    totalPoints: PropTypes.number.isRequired,
    freePoints: PropTypes.number.isRequired,
};


export function ErrorMessage({freePoints}) {
    let errorMessage = '';
    if (freePoints > 0) {
        errorMessage = `You still have points to hand out to your skills.
                        Please fix this and make sure free points gets to zero.`;
    } else if (freePoints < 0) {
        errorMessage = `You handed out too many points. You don\'t have that much.
                        Please fix this and make sure free points gets to zero.`;
    }

    return <span className="error-message">{errorMessage}</span>;
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
};


export function GlobalButton({onClick, buttonName}) {
    return <button className="global-button" onClick={onClick}>{buttonName}</button>;
}

GlobalButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonName: PropTypes.string,
};