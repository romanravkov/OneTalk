import React, { useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ThemeType } from '../../styles/theme';
import Text, { TextPropsType } from '../../components/Text';
import Icon from '../../components/Icon';
import HIT_SLOP_DEFAULT from '../../utils/hitSlop';
import Header from '../../components/Header';

type PrivacyPolicyViewPropsType = {};

const PrivacyPolicyView: React.FC<PrivacyPolicyViewPropsType> = () => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const navigation = useNavigation();

    const sectionTextProps: TextPropsType = {
        size: 18,
        fontWeight: '500',
        color: theme.colors.text,
        style: styles.sectionText,
    };
    const descriptionTextProps: TextPropsType = {
        size: 16,
        fontWeight: '400',
        color: theme.colors.text,
        style: styles.descriptionText,
    };
    return (
        <View style={styles.container}>
            <Header
                title="Privacy Policy"
                left={
                    <TouchableOpacity
                        hitSlop={HIT_SLOP_DEFAULT}
                        onPress={navigation.goBack}>
                        <Icon
                            name="cross"
                            size={24}
                            color={theme.colors.icon}
                        />
                    </TouchableOpacity>
                }
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollWrapper}>
                <Text
                    size={12}
                    color={theme.colors.gray4}
                    style={styles.lastUpdateText}>
                    Last Updated: 06.2023
                </Text>

                <Text {...descriptionTextProps}>
                    👋 Welcome to OneTalk! We value your privacy and strive to
                    ensure the utmost security of your personal data while using
                    our application.
                </Text>

                <Text {...sectionTextProps}>📚 Collected Information</Text>

                <Text {...descriptionTextProps}>
                    We do not collect personal information and do not require
                    registration to use the app. Your chats, photos, and videos
                    are not stored on our servers.
                </Text>

                <Text {...sectionTextProps}>🔍 Use of Information</Text>

                <Text {...descriptionTextProps}>
                    Personal information is not used as we do not collect it.
                    Your chats and media remain anonymous.
                </Text>

                <Text {...sectionTextProps}>🙅‍♀️ Sharing with Third Parties</Text>

                <Text {...descriptionTextProps}>
                    We do not share, sell, or exchange your information with
                    third parties.
                </Text>

                <Text {...sectionTextProps}>🛡️ Security</Text>

                <Text {...descriptionTextProps}>
                    We take measures to protect your information, but no method
                    of data transmission over the Internet is completely secure.
                </Text>

                <Text {...sectionTextProps}>🔄 Changes to Privacy Policy</Text>

                <Text {...descriptionTextProps}>
                    We may update this policy periodically. Any changes will be
                    posted on this page.
                </Text>

                <Text {...sectionTextProps}>⚙️ Data Aggregator</Text>

                <Text {...descriptionTextProps}>
                    During your chat, a cloud service acts as a data aggregator
                    to facilitate the conversation process.
                </Text>

                <Text {...sectionTextProps}>📞 Contact Us</Text>

                <Text {...descriptionTextProps}>
                    If you have any questions about our privacy policy, please
                    contact us at onetalksupport@gmail.com.
                </Text>
            </ScrollView>
        </View>
    );
};

const getStyles = (theme: ThemeType) =>
    EStyleSheet.create({
        container: {},
        headerWrapper: {
            padding: 16,
        },
        scrollWrapper: {
            padding: 16,
            paddingBottom: 100,
            backgroundColor: theme.colors.background,
        },
        sectionText: {
            marginBottom: 8,
        },
        descriptionText: {
            marginBottom: 16,
        },
        lastUpdateText: {
            marginBottom: 8,
        },
    });

export default PrivacyPolicyView;
