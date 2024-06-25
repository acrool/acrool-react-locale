import './App.css';
import Example from './views/Example';
import Github from './assets/github.svg?react';
import {StateControlLocaleProvider} from '@acrool/react-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';




function App() {


    const renderHeader = () => {

        const repositoryUrl = 'https://github.com/acrool/acrool-react-locale';
        const name = 'Acrool React Locale';

        return <>
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                <Github width={40} height={40}/>
            </a>

            <div className="banner-wrapper">
                <img src="/logo.svg" alt={name}/>
                <h1>{name}</h1>
            </div>
        </>;
    };


    return (
        <div className="App">
            {renderHeader()}

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


