import React from 'react';
import PropTypes from 'prop-types';

import {GAME_SETTINGS} from './GameBody.jsx';


export default class Skill extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        pointsValue: PropTypes.number.isRequired,
        setPointsValue: PropTypes.func.isRequired,
        isPrimary: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.addPoint = this.addPoint.bind(this);
        this.subPoint = this.subPoint.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    addPoint() {
        this.validatePointsAndUpdate(this.props.pointsValue + 1);
    }

    subPoint() {
        this.validatePointsAndUpdate(this.props.pointsValue - 1);
    }

    validatePointsAndUpdate(pointsValue) {
        const fixedValue = this.getFixedSkillPoints(pointsValue);
        this.props.setPointsValue(fixedValue);
    }

    isSkillPointsValid() {
        return this.getFixedSkillPoints(this.props.pointsValue) === this.props.pointsValue;
    }

    getFixedSkillPoints(value) {
        let maxPossiblePoints = GAME_SETTINGS.MAX_TOTAL_POINTS;
        let minPossiblePoints = GAME_SETTINGS.MIN_SKILL_POINTS;
        if (this.props.isPrimary) {
            maxPossiblePoints += GAME_SETTINGS.BONUS_SKILL_POINTS;
            minPossiblePoints += GAME_SETTINGS.BONUS_SKILL_POINTS;
        }
        return Math.min(maxPossiblePoints, Math.max(minPossiblePoints, value));
    }

    onInputChange(event) {
        const newValue = Number(event.target.value);
        this.props.setPointsValue(newValue);
    }

    onInputBlur(event) {
        const newValue = Number(event.target.value);
        this.validatePointsAndUpdate(newValue);
    }

    render() {
        const inputClassName = 'skill-input';

        return <div className="skill">
            <span className={this.props.isPrimary ? 'primary-skill-name' : ''}>{this.props.name}</span>
            <div className="skill-points">
                <button className="change-points-buttons" onClick={this.addPoint}>+</button>
                <input
                    className={this.isSkillPointsValid() ? inputClassName : `${inputClassName} invalid-input`}
                    type="number"
                    value={this.props.pointsValue}
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                />
                <button className="change-points-buttons" onClick={this.subPoint}>-</button>
            </div>
        </div>;
    }
}
