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

        this.state = {validationClass: ''};
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
        if (newValue !== this.getFixedSkillPoints(newValue)) {
            this.setState({validationClass: 'invalid-input'});
        } else {
            this.setState({validationClass: ''});
        }
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
        this.setState({validationClass: ''});
        if (value < MIN_POSSIBLE_POINTS) {
            return MIN_POSSIBLE_POINTS;
        }
        if (value > MAX_POSSIBLE_POINTS) {
            return MAX_POSSIBLE_POINTS;
        }
        return value;
    }

    render() {
        return <div className="skill">
            {this.props.name}
            <div className="skill-points">
                <button onClick={this.addPoint}>+</button>
                <input
                    className={this.state.validationClass}
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
