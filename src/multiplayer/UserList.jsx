import React, {useState} from 'react';

import User from './User.jsx';
// import triggeredAddUser from "./Presentor";


export default function useUserList() {
    const [userList, setUserList] = useState([]);

    function addUser(name, imageSrc, userClass) {
        const newUser = <User
            key={name}
            imageSrc={imageSrc}
            name={name}
            userClass={userClass}
        />;
        setUserList(prevUserList => {
            const newUserList = [...prevUserList];
            newUserList.push(newUser);
            return newUserList;
        })
    }

    return [userList, addUser];
}

function AddPlayerButton({addPlayer}) {
    return <button onClick={addPlayer}> Add player </button>;
}

export function PresentComponent() {
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);
    const [userList, addUser] = useUserList();

    function triggeredAddPlayer() {
        setIsAddingPlayer(true);
    }

    return <div>
        {userList}
        <AddPlayerButton addPlayer={triggeredAddPlayer}/>
        {isAddingPlayer && <AddPlayerForm addUser={(name, imageSrc, playerClass) => {
            addUser(name, imageSrc, playerClass);
            setIsAddingPlayer(false);
        }}/>}
    </div>;
}

function AddPlayerForm({addUser}) {
    const [name, setName] = useState('');
    const [playerClass, setClass] = useState('');

    return <div className="add-player">
        name:
        <input
            className="add-player-input"
            type="text" value={name}
            onChange={event => setName(event.target.value)}
        />
        class:
        <input
            className="add-player-input"
            type="text"
            value={playerClass}
            onChange={event => setClass(event.target.value)}
        />
        <button onClick={() => {
            if (name && playerClass)
                addUser(name, "", playerClass);
        }}>Submit
        </button>
    </div>
}