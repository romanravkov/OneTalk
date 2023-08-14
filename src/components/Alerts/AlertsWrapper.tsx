import React from 'react';
import { View } from 'react-native';
import Alert from './Alert';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SafeAreaView } from 'react-native-safe-area-context';

const AlertsWrapper = () => {
    const alerts = useSelector((state: RootState) => state.alerts);
    return (
        <View style={styles.container}>
            {alerts?.length
                ? alerts.map((el, index) => (
                      <Alert
                          last={index === alerts.length - 1}
                          {...el}
                          key={el.id}
                          id={el.id}
                      />
                  ))
                : null}
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        width: '100%',
        zIndex: 10,
        position: 'absolute',
        bottom: 50,
        paddingHorizontal: 16,
    },
});

export default AlertsWrapper;
