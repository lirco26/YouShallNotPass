import React from 'react';
import PropTypes from 'prop-types';
import Skill from './Skill.jsx';

const _ = require('lodash');

export default function SkillsList(props) {
    const skillsList = _.map(props.skillsNamesToPoints, (skillPoints, skillName) => {
        return <Skill
            name={skillName}
            value={skillPoints}
            updatePointsStatus={(points) => props.updateSkillPoints(skillName, points)}
        />;
    });

    return <div className="skills-list">
        {skillsList}
    </div>;

}

SkillsList.propTypes = {
    updateSkillPoints: PropTypes.func.isRequired,
    skillsNamesToPoints: PropTypes.object.isRequired,
};