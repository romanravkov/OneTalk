import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import theme from './styles/theme';
import RootStack from './navigation/RootStack';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import AlertsWrapper from './components/Alerts/AlertsWrapper';

function App() {
    const scheme = useColorScheme();
    StatusBar.setBarStyle(scheme === 'dark' ? 'light-content' : 'dark-content');

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ActionSheetProvider>
                    <NavigationContainer
                        theme={
                            scheme === 'dark'
                                ? theme.darkTheme
                                : theme.lightTheme
                        }>
                        <RootStack />
                        <AlertsWrapper />
                    </NavigationContainer>
                </ActionSheetProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
