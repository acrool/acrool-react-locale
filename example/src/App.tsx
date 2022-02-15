import React from 'react';
import {LocaleControlProvider} from 'bear-locale';

import Dashboard from 'views/Dashoboard';
import NotComponent from 'views/NotComponent';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';
import {persistKey} from './config/app';
import {Col, Container, GridThemeProvider, Row} from 'bear-styled-grid';


function App() {

    return (
        <GridThemeProvider gridTheme={{}}>
            <LocaleControlProvider
                localeDictionaries={localeDictionaries}
                defaultLocale={DEFAULT_LOCALE}
                persistKey={persistKey}
            >
                <Container>
                    <Row>
                        <Col col={24}>
                            <h2>Component Render</h2>
                            <Dashboard/>
                        </Col>
                    </Row>
                    <Row>
                        <Col col={24}>
                            <h2>Not Component Global</h2>
                            <NotComponent/>
                        </Col>
                    </Row>

                </Container>
            </LocaleControlProvider>
        </GridThemeProvider>

    );
}

export default App;

