import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, createStyles, WithStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

interface IProps extends WithStyles<typeof styles>
{ 
    enableLogin?: boolean    
}

const TopMenuRaw: React.StatelessComponent<IProps> = props => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" color="inherit" className={props.classes.grow}>
                    Killer Pool
                </Typography>
                {props.enableLogin ? <Button color="inherit">Login</Button> : <></> }
            </Toolbar>
        </AppBar>
    );
}

export const TopMenu = withStyles(styles)(TopMenuRaw);