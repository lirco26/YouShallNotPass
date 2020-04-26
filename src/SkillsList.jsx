import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Skill from './Skill.jsx';


export default function SkillsList({skillNameToPoints, setSkillPoints}) {

    return <div className="skills-list">
        {_.map(skillNameToPoints, (skillPoints, skillName) =>
            <Skill
                key={skillName}
                name={skillName}
                pointsValue={skillPoints}
                setPointsValue={points => setSkillPoints(skillName, points)}
            />
        )}
    </div>;

}

SkillsList.propTypes = {
    setSkillPoints: PropTypes.func.isRequired,
    skillNameToPoints: PropTypes.object.isRequired,
};