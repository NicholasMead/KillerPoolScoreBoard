import * as React from 'react';
import { Button } from '@material-ui/core';
import './homepage.sass';
import { PoolRack } from '../pollRack';

export const HomePage = () => {
    return (
        <main className="homepage">
            <PoolRack id="logo" ballSize="10vmin" />
            <h1>Killer Pool</h1>
            <h3>Get stuck into a game!</h3>
            <div>
                <Button variant="contained">Join Existing Session</Button>
            </div>
            <div>
                <Button variant="contained">Start New Session</Button>
            </div>
        </main>
    );
}