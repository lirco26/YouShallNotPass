import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import SkillsList from './SkillsList.jsx';
import {PointsDescription, ErrorMessage, ControlButtonList} from './pointsControlComponents.jsx';
import {getOneValueArray, splitAmountRandomly} from './mathUtils.js';

const SKILLS_NAMES = ['STR', 'DEX', 'INT', 'WIS', 'CHR', 'CON'];
const INIT_SKILL_VALUE = 6;
const SKILLS_VALUES = getOneValueArray(SKILLS_NAMES.length, INIT_SKILL_VALUE);
const _ = require('lodash');

export default class GameBody extends React.Component {
    static propTypes = {
        minTotalPoints: PropTypes.number.isRequired,
        maxTotalPoints: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.totalSkillPoints = _.random(this.props.minTotalPoints, this.props.maxTotalPoints);
        const skillsNamesToPoints = _.zipObject(SKILLS_NAMES, SKILLS_VALUES);
        this.state = {skillsNamesToPoints};

        this.getFreePoints = this.getFreePoints.bind(this);
        this.setSkillPoints = this.setSkillPoints.bind(this);
        this.getPointsErrorMessage = this.getPointsErrorMessage.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.onRandomClick = this.onRandomClick.bind(this);
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
        const skillsValues = Object.values(this.state.skillsNamesToPoints);
        const pointsUsed = _.sum(skillsValues);
        return this.totalSkillPoints - pointsUsed;
    }

    setSkillPoints(skillName, newValue) {
        this.setState(prevState => {
            const namesAndValues = prevState.skillsNamesToPoints;
            namesAndValues[skillName] = newValue;
            return namesAndValues;
        })
    }

    onResetClick() {
        const initialState = _.zipObject(SKILLS_NAMES, SKILLS_VALUES);
        this.setState({skillsNamesToPoints: initialState});
    }

    onRandomClick() {
        const randomPoints = splitAmountRandomly(this.totalSkillPoints, SKILLS_NAMES.length, 6, 30);
        const skillsNamesToPoints = _.zipObject(SKILLS_NAMES, randomPoints);
        this.setState({skillsNamesToPoints});
    }

    render() {
        return <div className="game-body">
            <PointsDescription totalPoints={this.totalSkillPoints} freePoints={this.getFreePoints()}/>
            <ErrorMessage message={this.getPointsErrorMessage()}/>
            <SkillsList
                setSkillPoints={this.setSkillPoints}
                skillsNamesToPoints={this.state.skillsNamesToPoints}
            />
            <ControlButtonList buttonsNamesToFunctions={{'Random': this.onRandomClick, 'Reset': this.onResetClick}}/>
        </div>;
    }
}
