import React, {useState} from 'react';

export function usePresenter() {
    const [componentPresented, setComponent] = useState(null);
    const ALREADY_PRESENTING_ERROR_MESSAGE = 'There is already something in progress.\n' +
        'Submit your changes first and then try start something else';

    function present(componentToPresent) {
        if(componentPresented !== null) {
            alert(ALREADY_PRESENTING_ERROR_MESSAGE);
        }
        else {
            setComponent(componentToPresent);
        }
    }

    function stopPresenting() {
        setComponent(null);
    }

    return [componentPresented, present, stopPresenting];
}


export default function Presenter({componentToPresent}) {
    return <div className="presenter">
        {componentToPresent}
    </div>;
}
