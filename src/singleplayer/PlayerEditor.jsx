import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SkillsList from './SkillsList.jsx';
import {PointsDescription, ErrorMessage, GlobalButton} from './pointsControlComponents.jsx';
import {getOneValueArray, splitAmountRandomly} from './mathUtils.js';
import SKILLS from './skillsNames';
import CLASSES from '../multiplayer/classes';


const SKILLS_NAMES = Object.keys(SKILLS);
export const GAME_SETTINGS = {
    MIN_TOTAL_POINTS: 85,
    MAX_TOTAL_POINTS: 89,
    INIT_SKILL_VALUE: 6,
    BONUS_SKILL_POINTS: 5,
    MIN_SKILL_POINTS: 6,
    MAX_SKILL_POINTS: 30,
};

const CLASS_TO_PRIMARY_SKILL = {
    [CLASSES.Warrior]: SKILLS.STR,
    [CLASSES.Wizard]: SKILLS.WIS,
    [CLASSES.Archer]: SKILLS.DEX,
    [CLASSES.Assassin]: SKILLS.CHR,
    [CLASSES.Paladin]: SKILLS.CON,
    [CLASSES.Captain]: SKILLS.INT,
};


export default class PlayerEditor extends React.Component {
    static propTypes = {
        playerName: PropTypes.string.isRequired,
        playerClass: PropTypes.oneOf(Object.keys(CLASSES)).isRequired,
        skillNameToPoints: PropTypes.object.isRequired,
        setSkillNameToPoints: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.primarySkill = CLASS_TO_PRIMARY_SKILL[this.props.playerClass];

        this.setSkillPoints = this.setSkillPoints.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.onRandomClick = this.onRandomClick.bind(this);
    }

    componentDidMount() {
        // If this is the first time that this component mounted:
        if(Object.keys(this.props.skillNameToPoints).length === 0) {
            this.props.setSkillNameToPoints(this.getInitialSkillNameToPoints());
        }
    }

    getInitialSkillNameToPoints() {
        const skillsValues = getOneValueArray(SKILLS_NAMES.length, GAME_SETTINGS.INIT_SKILL_VALUE);
        const skillNameToPoints = _.zipObject(SKILLS_NAMES, skillsValues);
        skillNameToPoints[this.primarySkill] += GAME_SETTINGS.BONUS_SKILL_POINTS;
        return skillNameToPoints;
    }

    setSkillPoints(skillName, newValue) {
        const skillNameToPoints = {...this.props.skillNameToPoints};
        skillNameToPoints[skillName] = newValue;
        this.props.setSkillNameToPoints(skillNameToPoints);
    }

    onResetClick() {
        this.props.setSkillNameToPoints(this.getInitialSkillNameToPoints());
    }

    onRandomClick() {
        const randomPoints = splitAmountRandomly(this.props.totalSkillPoints, SKILLS_NAMES.length,
            GAME_SETTINGS.MIN_SKILL_POINTS, GAME_SETTINGS.MAX_SKILL_POINTS);
        const skillNameToPoints = _.zipObject(SKILLS_NAMES, randomPoints);
        skillNameToPoints[this.primarySkill] += GAME_SETTINGS.BONUS_SKILL_POINTS;
        this.props.setSkillNameToPoints(skillNameToPoints);
    }

    render() {
        return <div className="game-body">
            <h2>{this.props.playerName} - {this.props.playerClass}</h2>
            <PointsDescription totalPoints={this.props.totalSkillPoints} freePoints={this.props.freePoints} />
            <ErrorMessage freePoints={this.props.freePoints} />
            <SkillsList
                setSkillPoints={this.setSkillPoints}
                skillNameToPoints={this.props.skillNameToPoints}
                primarySkill={this.primarySkill}
            />
            <div className="global-buttons">
                <GlobalButton onClick={this.onRandomClick} buttonName="Random" />
                <GlobalButton onClick={this.onResetClick} buttonName="Reset" />
            </div>
        </div>;
    }
}