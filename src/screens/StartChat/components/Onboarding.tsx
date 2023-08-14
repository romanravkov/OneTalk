import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../../../styles/theme';
import Text from '../../../components/Text';

type OnboardingPropsType = {};

const ONBOARDING_SLIDES = [
    {
        text: 'Tap "Start a search" to match with interesting partners.',
    },
    {
        text: 'Chat freely, share media, all without revealing identities.',
    },
    {
        text: 'Your privacy secured: no chat history is stored.',
    },
    {
        text: 'End chats easily, no trace left. Start new connections anytime.',
    },
];

const Onboarding: React.FC<OnboardingPropsType> = () => {
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const styles = useMemo(() => getStyles(theme, width), [theme, width]);
    const scrollRef = useRef<ScrollView | null>(null);
    const [_, setIndex] = useState<number>(1);

    const loopAnimation = () => {
        return setInterval(() => {
            setIndex(old => {
                scrollRef.current?.scrollTo({
                    x: old === ONBOARDING_SLIDES.length + 1 ? 1 : old * width,
                    animated: true,
                });
                return old === ONBOARDING_SLIDES.length + 1 ? 1 : old + 1;
            });
        }, 5000);
    };

    useEffect(() => {
        const interval = loopAnimation();
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.onboardingWrapper}>
            <ScrollView
                ref={scrollRef}
                scrollEnabled={false}
                contentContainerStyle={styles.onboardingSlider}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}>
                {ONBOARDING_SLIDES.map(el => (
                    <View style={styles.onboardingSlide}>
                        <View style={styles.onboardingScreenWrapper} />
                        <View style={styles.onboardingDescriptionWrapper}>
                            <Text
                                size={16}
                                fontWeight="500"
                                color={theme.colors.text}
                                align="center">
                                {el.text}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const sliderOffset = 16;

const getStyles = (theme: ThemeType, screenWidth: number) =>
    EStyleSheet.create({
        onboardingWrapper: {
            width: '100%',
        },
        onboardingSlider: {
            paddingVertical: sliderOffset,
            alignItems: 'flex-start',
        },
        onboardingSlide: {
            width: screenWidth - sliderOffset * 2,
            marginHorizontal: sliderOffset,
            backgroundColor: theme.colors.block,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        onboardingScreenWrapper: {
            backgroundColor: theme.colors.card,
            height: 240,
            borderRadius: 8,
        },
        onboardingDescriptionWrapper: {
            marginTop: 16,
        },
    });

export default Onboarding;
