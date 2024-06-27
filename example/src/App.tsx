import './App.css';
import Example from './views/Example';
import {StateControlLocaleProvider} from '@acrool/react-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';
import Banner from './components/Banner';



function App() {

    return (
        <div className="App">
            <Banner/>

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


