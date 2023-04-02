import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {StateControlLocaleProvider, translateI18n, useLocale} from 'bear-react-locale';
import {DEFAULT_LOCALE, localeDictionaries, ELocales} from './config/locale';


import './App.css';


export const getTextNotComponent = () => {
    return translateI18n('page.home.desc');
};

const LocaleContent = () => {
    const {i18n, setLocale, locale} = useLocale();

    return <div>

        <select
            onChange={(event) => setLocale((event.target.value) as ELocales)}
            value={locale}
        >
            <option>{ELocales.enUS}</option>
            <option>{ELocales.zhTW}</option>
            <option>{ELocales.jaJP}</option>
        </select>

        <p>{i18n('page.home.desc')}</p>


        <h3>get text not component</h3>
        {getTextNotComponent()}
    </div>;
};

function App() {

    return (
        <StateControlLocaleProvider
            localeDictionaries={localeDictionaries}
            defaultLocale={DEFAULT_LOCALE}
            persistKey="persist:bear-example"
        >

            <div className="App">
                <div>
                    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">


                    <LocaleContent/>


                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </StateControlLocaleProvider>
    );
}

export default App;
