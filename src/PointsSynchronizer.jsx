import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import SkillsList from './SkillsList.jsx'
import {getRandomInt, sumArray, getOneValueArray, splitPointsRandomly} from './mathUtils.js';

const SKILLS_NAMES = ['STR', 'DEX', 'INT', 'WIS', 'CHR', 'CON'];
const INIT_SKILL_VALUE = 6;
const SKILLS_VALUES = getOneValueArray(INIT_SKILL_VALUE, SKILLS_NAMES.length);
const _ = require('lodash');

export default class PointsSynchronizer extends React.Component {
    static propTypes = {
        minTotalPoints: PropTypes.number.isRequired,
        maxTotalPoints: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.getFreePoints = this.getFreePoints.bind(this);
        this.updateSkillPoints = this.updateSkillPoints.bind(this);
        this.getPointsErrorMessage = this.getPointsErrorMessage.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.onRandomClick = this.onRandomClick.bind(this);

        this.totalSkillPoints = getRandomInt(this.props.minTotalPoints, this.props.maxTotalPoints);
        const namesAndValues = _.zipObject(SKILLS_NAMES, SKILLS_VALUES);
        this.state = {skillsNamesAndValues: namesAndValues};
    }

    getPointsErrorMessage() {
        let errorMessage = '';
        const freePoints = this.getFreePoints();
        if (freePoints > 0) {
            errorMessage = 'You still have points to hand out to your skills. ' +
                'Please fix this and make sure free points gets to zero.'
        } else if (freePoints < 0) {
            errorMessage = 'You handed out too many points. You don\'t have that much. ' +
                'Please fix this and make sure free points gets to zero.'
        }

        return errorMessage;
    }

    getFreePoints() {
        const skillsValues = Object.values(this.state.skillsNamesAndValues);
        const pointsUsed = sumArray(skillsValues);
        return this.totalSkillPoints - pointsUsed;
    }

    updateSkillPoints(skillName, newValue) {
        this.setState(prevState => {
            const namesAndValues = prevState.skillsNamesAndValues;
            namesAndValues[skillName] = newValue;
            return namesAndValues;
        })
    }

    onResetClick() {
        const initialState = _.zipObject(SKILLS_NAMES, SKILLS_VALUES);
        this.setState({skillsNamesAndValues: initialState});
    }

    onRandomClick() {
        const randomPoints = splitPointsRandomly(this.totalSkillPoints, SKILLS_NAMES.length, 6, 30);
        const skillsNamesAndValues = _.zipObject(SKILLS_NAMES, randomPoints);
        this.setState({skillsNamesAndValues});
    }


    render() {
        return <div className="game-body">
            <div className="points-description">
                <label>Total skill points: {this.totalSkillPoints} </label>
                <label>Free skill points: {this.getFreePoints()}</label>
            </div>
            <label className="error-message">{this.getPointsErrorMessage()}</label>
            <SkillsList
                updateSkillPoints={this.updateSkillPoints}
                skillsNamesAndValues={this.state.skillsNamesAndValues}
            />
            <div className="buttons">
                <button className="control-buttons" onClick={this.onRandomClick}> Random</button>
                <button className="control-buttons" onClick={this.onResetClick}> Reset</button>
            </div>
        </div>;
    }
}
