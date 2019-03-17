import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#43a047',
        },
        secondary: {
            main: '#2196f3',
        },
    },
});

export const ThemeWrapper : React.StatelessComponent = props => {
    return(
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    )
}
