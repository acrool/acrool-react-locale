import './App.css';

import {GridThemeProvider} from '@acrool/react-grid';
import {LocaleProvider} from '@acrool/react-locale';

import Banner from './components/Banner';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';
import Example from './views/Example';



function App() {

    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>

                <LocaleProvider
                    localeDictionaries={localeDictionaries}
                    defaultLocale={DEFAULT_LOCALE}
                    persistKey="persist:acrool-example"
                    ignoreMissingLocaleMessage
                >
                    <Example/>
                </LocaleProvider>

            </div>
        </GridThemeProvider>

    );
}

export default App;


