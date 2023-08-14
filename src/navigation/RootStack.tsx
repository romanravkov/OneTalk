import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartChat from '../screens/StartChat';
import Chat from '../screens/Chat';
import { ParamListBase } from '@react-navigation/native';
import PrivacyPolicy from '../screens/PrivacyPolicy';

export type SubNavigator<T extends ParamListBase> =
    | {
          [K in keyof T]: { screen: K; params?: T[K] };
      }[keyof T]
    | undefined;

export type RootStackParamList = {
    StartChat: undefined;
    Chat: {
        chatId: string;
    };
    PrivacyPolicy: undefined;
};

const RootStackNavigator = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    return (
        <RootStackNavigator.Navigator
            screenOptions={{
                headerShown: false,
                // animation: 'fade',
                // gestureEnabled: false,
            }}>
            <RootStackNavigator.Screen name="StartChat" component={StartChat} />
            <RootStackNavigator.Screen name="Chat" component={Chat} />
            <RootStackNavigator.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{
                    presentation: 'modal',
                }}
            />
        </RootStackNavigator.Navigator>
    );
};

export default RootStack;
