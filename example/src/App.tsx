import './App.css';
import Example from './views/Example';
import Github from './assets/github.svg?react';
import {StateControlLocaleProvider} from '@acrool/react-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';




function App() {


    return (
        <div className="App">
            <a href="https://github.com/acrool/acrool-react-locale" target="_blank" rel="noopener noreferrer">
                <Github width={40} height={40}/>
            </a>

            <div style={{textAlign: 'center', border: '1px solid #606060', display: 'flex', flexDirection: 'column', padding: '20px', margin: '20px 0'}}>
                <img src="/logo.svg" style={{height: '100px'}} alt="Acrool React Locale"/>
                <div style={{fontSize: '40px', color: '#fff', fontWeight: 700}}>Acrool React Locale</div>
            </div>

            <StateControlLocaleProvider
                localeDictionaries={localeDictionaries}
                defaultLocale={DEFAULT_LOCALE}
                persistKey="persist:acrool-example"
            >
                <Example/>
            </StateControlLocaleProvider>

        </div>
    );
}

export default App;


