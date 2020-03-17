import React from 'react';
import PropTypes from 'prop-types';
import Skill from './Skill.jsx'

export default class SkillsList extends React.Component {
    getListOfSkills() {
        const skillsList = [];
        for (let skillName of Object.keys(this.props.skillsNamesAndValues)) {
            const skill = <Skill
                key={skillName}
                name={skillName}
                value={this.props.skillsNamesAndValues[skillName]}
                updatePointsStatus={(points) => {
                    this.props.updateSkillPoints(skillName, points)
                }}
            />;
            skillsList.push(skill);
        }
        return skillsList;
    }

    render() {
        return <div className="skills-list">
            {this.getListOfSkills()}
        </div>;
    }
}

SkillsList.propTypes = {
    updateSkillPoints: PropTypes.func.isRequired,
    skillsNamesAndValues: PropTypes.object.isRequired,
};