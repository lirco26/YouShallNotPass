import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SkillsList from './SkillsList.jsx';
import {PointsDescription, ErrorMessage, GlobalButton} from './pointsControlComponents.jsx';
import {getOneValueArray, splitAmountRandomly} from './mathUtils.js';
import SKILLS from './skillsNames';


const SKILLS_NAMES = Object.keys(SKILLS);
const INIT_SKILL_VALUE = 6;

export default class GameBody extends React.Component {
    static propTypes = {
        minTotalPoints: PropTypes.number.isRequired,
        maxTotalPoints: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.totalSkillPoints = _.random(this.props.minTotalPoints, this.props.maxTotalPoints);

        this.state = this.getInitialState();

        this.getFreePoints = this.getFreePoints.bind(this);
        this.setSkillPoints = this.setSkillPoints.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.onRandomClick = this.onRandomClick.bind(this);
    }

    getInitialState() {
        const skillsValues = getOneValueArray(SKILLS_NAMES.length, INIT_SKILL_VALUE);
        return {skillNameToPoints: _.zipObject(SKILLS_NAMES, skillsValues)};
    }

    getFreePoints() {
        const skillsValues = Object.values(this.state.skillNameToPoints);
        const pointsUsed = _.sum(skillsValues);
        return this.totalSkillPoints - pointsUsed;
    }

    setSkillPoints(skillName, newValue) {
        this.setState(prevState => {
            const skillNameToPoints = {...prevState.skillNameToPoints};
            skillNameToPoints[skillName] = newValue;
            return {skillNameToPoints};
        })
    }

    onResetClick() {
        this.setState(this.getInitialState());
    }

    onRandomClick() {
        const randomPoints = splitAmountRandomly(this.totalSkillPoints, SKILLS_NAMES.length, 6, 30);
        const skillNameToPoints = _.zipObject(SKILLS_NAMES, randomPoints);
        this.setState({skillNameToPoints});
    }

    render() {
        return <div className="game-body">
            <PointsDescription totalPoints={this.totalSkillPoints} freePoints={this.getFreePoints()}/>
            <ErrorMessage freePoints={this.getFreePoints()}/>
            <SkillsList
                setSkillPoints={this.setSkillPoints}
                skillNameToPoints={this.state.skillNameToPoints}
            />
            <div className="global-buttons">
                <GlobalButton onClick={this.onRandomClick} buttonName="Random" />
                <GlobalButton onClick={this.onResetClick} buttonName="Reset" />
            </div>
        </div>;
    }
}