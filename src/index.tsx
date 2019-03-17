import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './webClient/App';
import * as serviceWorker from './webClient/serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ThemeWrapper } from './webClient/Theme';

serviceWorker.register();

const render = (Component: React.ReactNode) =>
    ReactDOM.render(
        <ThemeWrapper>
            <BrowserRouter>
                {Component}
            </BrowserRouter>
        </ThemeWrapper>,
        document.getElementById('root'));

render(<App />);

if (module.hot) {
    module.hot.accept('./webClient/App', () => {
        const NextApp = require('./webClient/App').App;
        render(NextApp);
    });
}