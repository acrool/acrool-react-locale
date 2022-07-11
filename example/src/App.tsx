import React from 'react';
import {StateControlLocaleProvider} from 'bear-react-locale';

import Dashboard from 'views/Dashoboard';
import {getTextNotComponent} from 'views/utils';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';
import {Col, Container, GridThemeProvider, Row} from 'bear-react-grid';


const HomeRoot = () => {
    return <Container>
        <Row>
            <Col col={24}>
                <h2>Component Render</h2>
                <Dashboard/>
            </Col>
        </Row>
        <Row>
            <Col col={24}>
                <h2>Not Component Global Function</h2>
                {getTextNotComponent()}
            </Col>
        </Row>

    </Container>;
}

function App() {

    return (
        <GridThemeProvider gridTheme={{}}>
            <StateControlLocaleProvider
                localeDictionaries={localeDictionaries}
                defaultLocale={DEFAULT_LOCALE}
                persistKey="persist:bear-example"
            >
                <div>
                    <HomeRoot/>

                    <hr/>
                    <h2>do not use this layer</h2>
                    {getTextNotComponent()}
                </div>
            </StateControlLocaleProvider>
        </GridThemeProvider>

    );
}

export default App;

