import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import { scale } from '../utils/responsiveSize';
import { Container } from '../components/Container';
import TableComponent from '../components/Table/Table';

const About = () => {
    return (
        <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
            <AppBar textColor={colors.gold} backgroundColor='transparent' back title='About Us' />
            <ScrollView style={styles.container}>
          
                
                <Text style={styles.subHeading}>What We Do</Text>
                <Text style={styles.paragraph}>
                    At WonByBid, we bring you an innovative bidding platform where strategy meets skill. Our contests are designed to deliver quick results and provide a thrilling experience for all participants. Whether you're a seasoned player or a beginner, WonByBid offers something for everyone.
                </Text>
                <Text style={styles.paragraph}>
                    Gone are the days of waiting endlessly for outcomes. With real-time updates and transparent rankings, you can see the action unfold instantly. Compete, strategize, and win—all within minutes.
                </Text>
                
                <Text style={styles.subHeading}>Our Contests</Text>
                <Text style={styles.subHeading2}>Simple Contests</Text>
                <Text style={styles.paragraph}>
                    - Perfect for beginners or players who prefer straightforward gameplay.
                    {'\n'}- Participate by placing bids with clear rules and immediate results.
                    {'\n'}- Focus on placing the highest unique bid to win.
                </Text>
                
                <Text style={styles.subHeading2}>Private Contests</Text>
                <Text style={styles.paragraph}>
                    - Tailored for players who want a personalized experience.
                    {'\n'}- Create your own contest, set the rules, entry fees, and prize structure.
                    {'\n'}- Invite friends and family to compete in a fun, custom environment.
                </Text>
                
                <Text style={styles.subHeading}>Cash Contests</Text>
                <Text style={styles.paragraph}>
                    - Fixed Entry Fee Contests: Fair and competitive contests with predefined entry fees and clear prize pools.
                    {'\n'}- Private Contests: Set your own entry fees and prize distribution. Customize and play with your own group for a unique experience.
                </Text>
                
                <Text style={styles.subHeading}>Practice Contests</Text>
                <Text style={styles.paragraph}>
                    - No Entry Fee: Explore the gameplay for free and learn the basics.
                    {'\n'}- Quick Learning: Get fast results, understand the rules, and improve your bidding strategy before moving to cash contests.
                </Text>
                
                <Text style={styles.subHeading}>Legal Position</Text>
                <Text style={styles.subHeading2}>Is Playing WonByBid Legal?</Text>
                <Text style={styles.paragraph}>
                    Yes, WonByBid is a game of skill, making it completely legal under Indian laws. Games that require skill are distinctly different from games of chance and are allowed across most states.
                    {'\n'}However, due to state-specific laws, players from Assam, Sikkim, Nagaland, Odisha, Telangana, and Andhra Pradesh cannot participate in cash contests. Players from these states can still enjoy Practice Contests.
                </Text>
                
                <Text style={styles.subHeading}>Why Choose WonByBid?</Text>
                <Text style={styles.paragraph}>
                    - Quick Results: Experience the excitement of winning in minutes—no waiting!
                    {'\n'}- Transparency: Real-time updates, live rankings, and clear rules ensure fairness.
                    {'\n'}- Engagement: Compete in Simple Contests or create Private Contests for a personalized experience.
                    {'\n'}- Skill-Based Gaming: Your strategy and decisions drive your success.
                    {'\n'}- Legal and Safe: Fully compliant with Indian laws, offering a secure and trustworthy platform.
                </Text>
                
                <Text style={styles.paragraph}>
                    For more information, contact us and start your journey with WonByBid today. Whether you're here for quick results or a personalized challenge, we’ve got you covered!
                </Text>
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
        color:colors.white,
    },
    subHeading2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: colors.white,
    },
    paragraph: {
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
        color: '#ccc', 
    },
});

export default About;
