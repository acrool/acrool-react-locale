import './App.css';
import Example from './views/Example';
import LocaleProvider from '@acrool/react-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';
import Banner from './components/Banner';
import {GridThemeProvider} from '@acrool/react-grid';



function App() {

    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>

                <LocaleProvider
                    localeDictionaries={localeDictionaries}
                    defaultLocale={DEFAULT_LOCALE}
                    persistKey="persist:acrool-example"
                >
                    <Example/>
                </LocaleProvider>

            </div>
        </GridThemeProvider>

    );
}

export default App;


