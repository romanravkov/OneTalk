import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import reducers from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const persistConfig = {
    key: 'OneTalk',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const setupStore = (
    preloadedState?: PreloadedState<Partial<RootState>>,
) => {
    return configureStore({
        reducer: persistedReducer,
        // devTools: process.env.NODE_ENV !== 'production',
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(logger),
        preloadedState,
    });
};
export const store = setupStore();

export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const persistor = persistStore(store);

// persistor.purge(); // clear redux store
