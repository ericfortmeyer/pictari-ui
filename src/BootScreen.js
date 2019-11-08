import React from 'react';
import Typist from 'react-typist';
import './BootScreen.css'

export default class BootScreen extends React.PureComponent
{
    textToType() {
        const nextLineDelay = 1000; // in ms
        return <div>
            <h1>FortmeyerOS v19903.390.02343111</h1>
            <Typist.Delay ms={nextLineDelay}/>
            <p>Booting kernel………………………………………………………………………………………………………………………………………………………………</p>
            <Typist.Delay ms={nextLineDelay}/>
            <p>Loading modules………………………………………………………………………………………………………………………………………………………………</p>
            <Typist.Delay ms={nextLineDelay}/>
            <p>Hold on...</p>
            <Typist.Delay ms={nextLineDelay * 5}/>
            <p>More modules to load...</p>
            <Typist.Delay ms={nextLineDelay}/>
            <p>Watching a video on YouTube...</p>
            <Typist.Delay ms={nextLineDelay * 6}/>
            <p>Ok I'm done.. logging stuff...</p>
        </div>
    }
    render() {
        return <main><div className="bootscreen"><Typist>{this.textToType()}</Typist></div></main>;
    }
}
