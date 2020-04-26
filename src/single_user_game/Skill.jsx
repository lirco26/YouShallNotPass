import React from 'react';
import PropTypes from 'prop-types';


const MIN_POSSIBLE_POINTS = 6;
const MAX_POSSIBLE_POINTS = 30;

export default class Skill extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        pointsValue: PropTypes.number.isRequired,
        setPointsValue: PropTypes.func.isRequired,
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
        return Math.min(MAX_POSSIBLE_POINTS, Math.max(MIN_POSSIBLE_POINTS, value));
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
        const className = 'skill-input';
        return <div className="skill">
            {this.props.name}
            <div className="skill-points">
                <button className="change-points-buttons" onClick={this.addPoint}>+</button>
                <input
                    className={this.isSkillPointsValid() ? className : `${className} invalid-input`}
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
