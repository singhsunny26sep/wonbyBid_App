import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import { scale } from '../utils/responsiveSize';
import { Container } from '../components/Container';

const ResponsiblePlay = () => {
    return (
        <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
            <AppBar textColor={colors.gold} backgroundColor='transparent' back title='Responsible Play' />
            <ScrollView style={styles.container}>
                <Text style={styles.heading}>WonByBid Responsible Play Guidelines</Text>
                <Text style={styles.paragraph}>At WonByBid, we prioritize fairness, transparency, and responsible gaming. Our goal is to create an engaging and enjoyable experience while ensuring players maintain control over their gameplay and spending habits.</Text>

                <Text style={styles.subHeading}>1. Set a Budget & Stick to It</Text>
                <Text style={styles.paragraph}>✅ Decide on a fixed budget before playing and never exceed it.{'\n'}
                    ✅ Do not chase losses—winning and losing are part of the game.{'\n'}
                    ✅ Play only with the money you can afford to lose.</Text>

                <Text style={styles.subHeading}>2. Manage Your Time Wisely</Text>
                <Text style={styles.paragraph}>
                    ✅ Set time limits for gameplay to maintain a healthy balance.{'\n'}
                    ✅ Take breaks regularly to avoid excessive gaming.{'\n'}
                    ✅ Do not let gaming interfere with work, studies, or personal life.{'\n'}
                </Text>

                <Text style={styles.subHeading}>3. Play for Fun, Not as a Source of Income</Text>
                <Text style={styles.paragraph}>
                    ✅ WonByBid is a skill-based gaming platform, but it should be played for entertainment.{'\n'}
                    ✅ Do not consider gaming as a way to make money or recover financial losses.{'\n'}
                    ✅ Play with a strategic and responsible mindset.{'\n'}
                </Text>

                <Text style={styles.subHeading}>4. Avoid Emotional & Impulsive Decisions</Text>
                <Text style={styles.paragraph}>
                    ✅ Never play when feeling stressed, upset, or under pressure.{'\n'}
                    ✅ Do not let emotions drive your bidding strategy.{'\n'}
                    ✅ Make logical, well-thought-out moves rather than impulsive ones.
                    {'\n'}
                </Text>

                <Text style={styles.subHeading}>5. Understand the Rules & Terms</Text>
                <Text style={styles.paragraph}>
                    ✅ Familiarize yourself with the bidding rules, T&Cs, and payout structures.{'\n'}
                    ✅ Avoid misunderstandings by reading and understanding the game mechanics before playing.{'\n'}
                </Text>

                <Text style={styles.subHeading}>6. Protect Minors & Prevent Unauthorized Access</Text>
                <Text style={styles.paragraph}>
                    ✅ WonByBid is strictly for 18+ users only.{'\n'}
                    ✅ Do not allow minors to access your account or participate in gaming.{'\n'}
                    ✅ Use strong passwords and enable security measures to protect your account.{'\n'}
                </Text>

                <Text style={styles.subHeading}>7. Use Self-Control & Take a Break When Needed</Text>
                <Text style={styles.paragraph}>
                    ✅ If you feel gaming is affecting your mental health or finances, take a break.{'\n'}
                    ✅ Consider using self-exclusion options if you need to pause or limit your play.{'\n'}
                    ✅ Reach out to our support team if you need help managing your gaming behavior.{'\n'}
                </Text>

                <Text style={styles.subHeading}>8. Seek Help if Needed</Text>
                <Text style={styles.paragraph}># If gaming is causing distress, financial problems, or addiction-like behavior, seek help from professionals.
                    # Resources like Responsible Gaming organizations & helplines can assist in maintaining control.</Text>

                <Text style={styles.subHeading}>WonByBid Commitment to Responsible Play</Text>
                <Text style={styles.paragraph}>
                    ✅ We ensure fair play and secure transactions.{'\n'}
                    ✅ We promote responsible gaming practices with limits & self-exclusion options.{'\n'}
                    ✅ We provide customer support to help users with responsible gaming concerns.{'\n'}
                </Text>

                <Text style={styles.subHeading}>Play Smart. Play Safe. Play Responsibly.</Text>
                <Text style={styles.paragraph}>& Enjoy the thrill of WonByBid while staying in control!</Text>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: "white",
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        color: "white",
    },
    paragraph: {
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
        color: '#ccc',
    },
});

export default ResponsiblePlay;