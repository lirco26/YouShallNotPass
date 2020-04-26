import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Skill from './Skill.jsx';


export default function SkillsList({skillNameToPoints, setSkillPoints, primarySkill}) {

    return <div className="skills-list">
        {_.map(skillNameToPoints, (skillPoints, skillName) => {
                let isPrimary = false;
                if (skillName === primarySkill)
                    isPrimary = true;
                return <Skill
                    key={skillName}
                    name={skillName}
                    isPrimary={isPrimary}
                    pointsValue={skillPoints}
                    setPointsValue={points => setSkillPoints(skillName, points)}
                />;
            }
        )}
    </div>;

}

SkillsList.propTypes = {
    setSkillPoints: PropTypes.func.isRequired,
    skillNameToPoints: PropTypes.object.isRequired,
    primarySkill: PropTypes.string,
};