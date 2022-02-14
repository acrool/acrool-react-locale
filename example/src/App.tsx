import React from 'react';
import LanguageProvider from 'provider/LanguageProvider';
import Dashboard from 'views/Dashoboard';
import NotComponent from 'views/NotComponent';


function App() {

    return (
        <LanguageProvider>
            <div>
                <Dashboard/>
                <NotComponent/>
            </div>
        </LanguageProvider>
    );
}

export default App;

