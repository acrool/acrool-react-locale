import './App.css';
import Example from './views/Example';
import {StateControlLocaleProvider} from '@acrool/react-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';
import Banner from './components/Banner';
import {GridThemeProvider} from '@acrool/react-grid';



function App() {

    return (
        <GridThemeProvider>
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
        </GridThemeProvider>

    );
}

export default App;


