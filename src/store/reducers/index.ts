import { combineReducers } from 'redux';

import AlertsReducer from './alerts-reducer';

export default combineReducers({
    alerts: AlertsReducer,
});
