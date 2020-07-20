import React from 'react';

import OnTv from './MainPage/OnTv';
import InTheaters from './MainPage/InTheaters';
import PopularPeople from './MainPage/PopularPeople';




class MainPage extends React.Component {

    render() {
        return(
            <div className="section main-grid">
                <OnTv></OnTv>
                <InTheaters></InTheaters>
                <PopularPeople></PopularPeople>
            </div>
        )
    }
}

export default MainPage;