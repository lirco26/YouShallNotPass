import React from 'react';

import './App.css';
import './multiplayer.css'
import TriggeringPlayerManager from './multiplayer/TriggeringPlayerManager.jsx';
import Presenter, {usePresenter} from './multiplayer/Presenter.jsx';

function App() {
    const [componentPresented, present, stopPresenting] = usePresenter();

    return <div>
        <h1>DND</h1>
        <div className="dnd-app">
            <TriggeringPlayerManager present={present} stopPresenting={stopPresenting} />
            <Presenter componentToPresent={componentPresented} />
        </div>
    </div>;
}

export default App;
