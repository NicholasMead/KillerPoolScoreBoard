import * as React from 'react';
import { Button, Typography } from '@material-ui/core';
import './homepage.sass';
import { PoolRack } from '../pollRack';

interface IProps { }

export const HomePage = (props: IProps) => {
    return (
        <main className="homepage">
            <section id="LogoSection">
                <PoolRack id="Logo" ballSize="10vmin" />
            </section>
            <section id="WelcomeText">
                <Typography align="center" variant="h4">
                    Welcome to Killer Pool
                        </Typography>
                <Typography align="center" variant="subtitle1">
                    Because score keeping in killer pool is hella hard
                        </Typography>
            </section>
            <section id="CTA">
                <Button variant="contained" color="secondary">Start New Game</Button>
            </section>
        </main>
    );
}