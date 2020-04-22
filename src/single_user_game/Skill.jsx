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

    onInputChange(event) {
        const newValue = Number(event.target.value);
        this.props.setPointsValue(newValue);
    }

    onInputBlur(evt) {
        const newValue = Number(evt.target.value);
        this.validatePointsAndUpdate(newValue);
    }

    validatePointsAndUpdate(pointsValue) {
        const fixedValue = this.getFixedSkillPoints(pointsValue);
        this.props.setPointsValue(fixedValue);
    }

    getFixedSkillPoints(value) {
        return Math.min(MAX_POSSIBLE_POINTS, Math.max(MIN_POSSIBLE_POINTS, value));
    }

    render() {
        let inputClassName = '';
        if (this.getFixedSkillPoints(this.props.pointsValue) !== this.props.pointsValue) {
            inputClassName = 'invalid-input';
        }

        return <div className="skill">
            {this.props.name}
            <div className="skill-points">
                <button onClick={this.addPoint}>+</button>
                <input
                    className={inputClassName + " skill-input"}
                    type="number"
                    value={this.props.pointsValue}
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                />
                <button onClick={this.subPoint}>-</button>
            </div>
        </div>;
    }
}
