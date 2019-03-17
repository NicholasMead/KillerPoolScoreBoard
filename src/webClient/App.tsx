import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.sass';
import { HomePage } from './components/homepage';
import { TopMenu } from './components/topMenu';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { KillerPoolApplication } from '../application/KillerPoolApplication';

const styles = createStyles({
  root: {
    flexGrow: 1
  }
});

interface IProps extends WithStyles<typeof styles> { }

const AppBase: React.StatelessComponent<IProps> = props => {
  const [ app ] = React.useState<KillerPoolApplication>(new KillerPoolApplication());

  var page: React.ReactNode = <></>;
  if(!app.GameStarted)
  {
    if(app.GameStarted)
    { /* New Game Page */ }
    else
      page = <HomePage />;
  }
  else
  {
    // Current Game Page
  }

  return (
    <div id="App" className={props.classes.root}>
      <TopMenu />
      <Route path="/" exact render={_ => page} />
      <Route path="/" render={_ => <Redirect to="/" />} />
    </div>
  );
};

export const App = withStyles(styles)(AppBase);