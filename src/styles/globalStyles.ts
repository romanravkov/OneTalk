import { TextStyle, ViewStyle } from 'react-native';
import EStyleSheet, { AnyObject } from 'react-native-extended-stylesheet';
import colors from './colors';

const _styles = {
    mb4: {
        marginBottom: 4,
    },
    mb8: {
        marginBottom: 8,
    },
    mb10: {
        marginBottom: 10,
    },
    mb12: {
        marginBottom: 12,
    },
    mb16: {
        marginBottom: 16,
    },
    mb24: {
        marginBottom: 24,
    },
    mb32: {
        marginBottom: 32,
    },

    mt4: {
        marginTop: 4,
    },
    mt8: {
        marginTop: 8,
    },
    mt10: {
        marginTop: 10,
    },
    mt12: {
        marginTop: 12,
    },
    mt16: {
        marginTop: 16,
    },
    mt24: {
        marginTop: 24,
    },
    mt32: {
        marginTop: 32,
    },

    ml4: {
        marginLeft: 4,
    },
    ml8: {
        marginLeft: 8,
    },
    ml10: {
        marginLeft: 10,
    },
    ml12: {
        marginLeft: 12,
    },
    ml16: {
        marginLeft: 16,
    },
    ml24: {
        marginLeft: 24,
    },

    ph24: {
        paddingHorizontal: 24,
    },
    ph16: {
        paddingHorizontal: 16,
    },
    ph8: {
        paddingHorizontal: 8,
    },

    pv24: {
        paddingVertical: 24,
    },
    pv16: {
        paddingVertical: 16,
    },
    pv8: {
        paddingVertical: 8,
    },

    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowFullCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex1: {
        flex: 1,
    },
    absoluteFullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 1,
    },
    shadow: {
        shadowColor: colors.mainGray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
};

export const globalStyles:
    | {
          [K in keyof typeof _styles]: ViewStyle | TextStyle;
      }
    | AnyObject = EStyleSheet.create(_styles);
