import React from 'react';
import PropTypes from 'prop-types';

const MIN_POSSIBLE_POINTS = 6;
const MAX_POSSIBLE_POINTS = 30;

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onMinusClick = this.onMinusClick.bind(this);
        this.onBlurInput = this.onBlurInput.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.state = {borderColor: ''};
    }

    getFixedSkillPoints(value) {
        this.setState( {borderColor: ''});
        if (value < MIN_POSSIBLE_POINTS) {
            return MIN_POSSIBLE_POINTS;
        }
        if (value > MAX_POSSIBLE_POINTS) {
            return MAX_POSSIBLE_POINTS;
        }
        return value;
    }

    checkPointsAndUpdate(newValue) {
        const fixedValue = this.getFixedSkillPoints(newValue);
        this.props.updatePointsStatus(fixedValue);
    }

    onPlusClick() {
        this.checkPointsAndUpdate(this.props.value + 1);
    }

    onMinusClick() {
        this.checkPointsAndUpdate(this.props.value - 1);
    }

    onChangeInput(evt) {
        const newValue = Number(evt.target.value);
        this.props.updatePointsStatus(newValue);
        if (newValue !== this.getFixedSkillPoints(newValue)) {
            this.setState({borderColor: '2px solid red'});
        }
        else {
            this.setState( {borderColor: ''});
        }
    }

    onBlurInput(evt) {
        const newValue = Number(evt.target.value);
        this.checkPointsAndUpdate(newValue);
    }

    render() {
        return <div className="skill">
            {this.props.name}
            <div className="skill-points">
                <button onClick={this.onPlusClick}>+</button>
                <input
                    type="number"
                    value={this.props.value}
                    onChange={this.onChangeInput}
                    onBlur={this.onBlurInput}
                    style={{border: this.state.borderColor}}
                />
                <button onClick={this.onMinusClick}>-</button>
            </div>
        </div>;
    }
}

Skill.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    updatePointsStatus: PropTypes.func.isRequired,
};