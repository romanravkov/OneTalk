import { LayoutAnimation } from 'react-native';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAlert {
    text?: string;
    type: 'error' | 'warning' | 'success';
    child?: JSX.Element;
    id: number;
    duration?: number;
}

const initialState: IAlert[] = [];

const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        addAlert(state, action: PayloadAction<Omit<IAlert, 'id'>>) {
            const newAlerts = [
                ...state,
                {
                    ...action.payload,
                    id: new Date().getTime(),
                },
            ];
            if (newAlerts.length > 5) {
                newAlerts.shift();
            }
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
            );
            return newAlerts;
        },
        deleteAlert(state, action: PayloadAction<{ id: number }>) {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
            );
            return state.filter(el => el.id !== action.payload.id);
        },
    },
});

export const { addAlert, deleteAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
