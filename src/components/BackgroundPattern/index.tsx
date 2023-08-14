import React from 'react';
import { Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

type BackgroundPatternPropsType = {};

const BackgroundPattern: React.FC<BackgroundPatternPropsType> = ({}) => {
    return (
        <Image
            style={styles.backgroundPattern}
            resizeMode="cover"
            source={require('../../assets/images/chat-background.png')}
        />
    );
};

const styles = EStyleSheet.create({
    backgroundPattern: {
        position: 'absolute',
        opacity: 0.07,
        height: '140%',
        width: '100%',
    },
});

export default BackgroundPattern;
