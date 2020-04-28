import React, {useState} from 'react';
import CLASSES from './classes';
import PropTypes from 'prop-types';

export function AddPlayerButton({addPlayer}) {
    return <button className="add-player-button" onClick={addPlayer}>
        + Add player
    </button>;
}


export default function AddPlayerForm({addPlayer, doneAddingPlayer}) {
    const [name, setName] = useState('');
    const [playerClass, setClass] = useState(Object.keys(CLASSES)[0]);

    function submit() {
        if (name && playerClass) {
            doneAddingPlayer();
            addPlayer(name.toUpperCase(), `userImages/${playerClass}.jpeg`, playerClass);
        }
    }

    return <div className="add-player-form">
        <button className="add-player-form close-button" onClick={doneAddingPlayer}> x </button>
        <NameInput name={name} setName={setName} />
        <ClassInput setClass={setClass} />
        <SubmitButton className="submit-button" submitFunction={submit}/>
    </div>;
}

AddPlayerForm.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    doneAddingPlayer: PropTypes.func.isRequired,
};


function NameInput({name, setName}) {
    return <div className="field-input">
        Name:
        <input
            className="add-player-input"
            type="text" value={name}
            onChange={event => setName(event.target.value)}
        />
    </div>;
}

NameInput.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
};


function ClassInput({setClass}) {
    return <div className="field-input">
        Class:
        <select
            className="add-player-input"
            onChange={event => setClass(event.target.value)}>
            {Object.keys(CLASSES).map(key =>
                <option key={key} value={key}> {key} </option>
            )}
        </select>
    </div>;
}

ClassInput.propTypes = {
    setClass: PropTypes.func.isRequired,
};


export function SubmitButton({className, submitFunction}) {
    return <button className={className} onClick={submitFunction}> Submit </button>;
}

SubmitButton.propTypes = {
    submitFunction: PropTypes.func.isRequired,
    className: PropTypes.string,
};