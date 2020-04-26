import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SkillsList from './SkillsList.jsx';
import {PointsDescription, ErrorMessage, GlobalButton} from './pointsControlComponents.jsx';
import {getOneValueArray, splitAmountRandomly} from './mathUtils.js';
import SKILLS from './skillsNames';
import CLASSES from '../multiplayer/Classes';


const SKILLS_NAMES = Object.keys(SKILLS);
const INIT_SKILL_VALUE = 6;

const MIN_TOTAL_POINTS = 85;
const MAX_TOTAL_POINTS = 89;

const CLASS_TO_PRIMARY_SKILL = {
    [CLASSES.Warrior]: SKILLS.STR,
    [CLASSES.Wizard]: SKILLS.WIS,
    [CLASSES.Archer]: SKILLS.DEX,
    [CLASSES.Assassin]: SKILLS.CHR,
    [CLASSES.Paladin]: SKILLS.CON,
    [CLASSES.Captain]: SKILLS.INT,
};
export const BONUS_SKILL_POINTS = 5;


export default class GameBody extends React.Component {
    static propTypes = {
        playerName: PropTypes.string.isRequired,
        playerClass: PropTypes.oneOf(Object.keys(CLASSES)).isRequired,
    };

    constructor(props) {
        super(props);
        this.totalSkillPoints = _.random(MIN_TOTAL_POINTS, MAX_TOTAL_POINTS);
        this.totalSkillPointsWithBonus = this.totalSkillPoints + BONUS_SKILL_POINTS;
        this.primarySkill = CLASS_TO_PRIMARY_SKILL[this.props.playerClass];

        this.state = this.getInitialState();

        this.getFreePoints = this.getFreePoints.bind(this);
        this.setSkillPoints = this.setSkillPoints.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.onRandomClick = this.onRandomClick.bind(this);
    }

    getInitialState() {
        const skillsValues = getOneValueArray(SKILLS_NAMES.length, INIT_SKILL_VALUE);
        const skillNameToPoints = _.zipObject(SKILLS_NAMES, skillsValues);
        skillNameToPoints[this.primarySkill] += BONUS_SKILL_POINTS;
        return {skillNameToPoints};
    }

    getFreePoints() {
        const skillsValues = Object.values(this.state.skillNameToPoints);
        const pointsUsed = _.sum(skillsValues);
        return this.totalSkillPointsWithBonus - pointsUsed;
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
        skillNameToPoints[this.primarySkill] += BONUS_SKILL_POINTS;
        this.setState({skillNameToPoints});
    }

    render() {
        return <div className="game-body">
            <h2>{this.props.playerName} - {this.props.playerClass}</h2>
            <PointsDescription totalPoints={this.totalSkillPoints} freePoints={this.getFreePoints()} />
            <ErrorMessage freePoints={this.getFreePoints()} />
            <SkillsList
                setSkillPoints={this.setSkillPoints}
                skillNameToPoints={this.state.skillNameToPoints}
                primarySkill={this.primarySkill}
            />
            <div className="global-buttons">
                <GlobalButton onClick={this.onRandomClick} buttonName="Random" />
                <GlobalButton onClick={this.onResetClick} buttonName="Reset" />
            </div>
        </div>;
    }
}