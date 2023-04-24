/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import {NativeRouter} from 'react-router-native'
import {ThemeProvider} from 'react-native-elements'
// import {TailwindProvider} from 'tailwindcss-react-native'
import { NativeBaseProvider, Box } from "native-base";
import {Provider} from 'react-redux'
import _store from './src/components/Store/_store';
export default function Main() {
   return (
    <PaperProvider>
        <Provider store={_store}>        
        <NativeRouter>
            <ThemeProvider>
            <NativeBaseProvider>
                   <App/>
            </NativeBaseProvider>
            </ThemeProvider>
        </NativeRouter>
        </Provider>
    </PaperProvider>
   )
}
AppRegistry.registerComponent(appName, () => Main);
