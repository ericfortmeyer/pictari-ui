import React from 'react';
import icon from './images/pictari-icon-600.svg';
import './SplashScreen.css';

function SplashScreen() {
    const title = "Pictari Gaming Console";
    const subtitle = "copyright (c) 1981";
    return <main>
        <div className="splash-screen">
            <img className="splash-screen__brand-icon" src={icon} alt="pictari brand icon"></img>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    </main>;
}

export default React.memo(SplashScreen);
