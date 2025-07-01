import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import { scale } from '../utils/responsiveSize';
import { Container } from '../components/Container';

const TermsAndConditions = () => {
    return (
        <>
            <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>

                <AppBar textColor={colors.gold} backgroundColor='transparent' back title='Terms of Services' />
                <ScrollView style={styles.container}>

                    <Text style={styles.heading}>Terms and Conditions for WonByBid</Text>

                    <Text style={styles.subHeading}>1. Acceptance of Terms</Text>
                    <Text style={styles.paragraph}>By accessing or using WonByBid, you agree to these Terms, our Privacy Policy, and any other terms or policies referenced herein. We reserve the right to update or modify these Terms at any time, and your continued use of our services constitutes acceptance of those changes.</Text>

                    <Text style={styles.subHeading}>2. Eligibility</Text>
                    <Text style={styles.paragraph}>• Age Requirement: You must be at least 18 years old or the age of majority in your jurisdiction to use our services. By using our platform, you represent and warrant that you meet these age requirements.</Text>
                    <Text style={styles.paragraph}>• Legal Compliance: You are responsible for ensuring that your use of our platform complies with all applicable laws and regulations in your jurisdiction. It is your responsibility to understand and comply with local laws governing online betting.</Text>

                    <Text style={styles.subHeading}>3. Account Registration</Text>
                    <Text style={styles.paragraph}>• Account Creation: To access certain features of our platform, you may need to register for an account. You agree to provide accurate, current, and complete information during registration and to update your information as necessary.</Text>
                    <Text style={styles.paragraph}>• Account Security: You are permitted to create only one account on our platform. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account or any other breach of security.</Text>
                    <Text style={styles.paragraph}>• Verification: We may require you to verify your identity or provide additional information before allowing you to access certain features or withdraw funds.</Text>

                    <Text style={styles.subHeading}>4. Your Conduct</Text>
                    <Text style={styles.paragraph}>• Fraudulent Activities: You will not engage in fraudulent or illegal activities. This includes any attempts to bypass or manipulate our systems or processes.</Text>
                    <Text style={styles.paragraph}>• Respect for Others: You will not engage in any behavior that disrupts or interferes with the integrity of our platform or other users' experience.</Text>

                    <Text style={styles.subHeading}>5. Maintain Confidentiality</Text>
                    <Text style={styles.paragraph}>• Account Information: You will maintain the confidentiality of all information relating to your account. This includes not sharing your One-Time Password (“OTP”) with any other person.</Text>
                    <Text style={styles.paragraph}>• Fraudulent Conduct: You will not engage in any fraudulent conduct, such as logging into another user’s account by asking for their account-related information or obtaining their OTP.</Text>

                    <Text style={styles.subHeading}>6. Use of Our Services</Text>
                    <Text style={styles.paragraph}>• Lawful Use: You agree to use our services only for lawful purposes and in accordance with these Terms.</Text>
                    <Text style={styles.paragraph}>• Betting and Gaming: All betting and gaming activities are conducted in accordance with applicable laws and regulations.</Text>

                    <Text style={styles.subHeading}>7. Contests</Text>
                    <Text style={styles.subHeading2}>7.1. Contest Types</Text>
                    <Text style={styles.paragraph}>• Private Contests: Exclusive contests accessible only to invited users. Entry fees and participation limits apply.</Text>
                    <Text style={styles.paragraph}>• Public Contests: Open to all users who meet the eligibility criteria. Standardized rules and participation limits apply.</Text>

                    <Text style={styles.subHeading2}>7.2. Contest Rules</Text>
                    <Text style={styles.paragraph}>• Entry Fees: Must be paid before participating in a contest. Fees are nonrefundable unless otherwise stated.</Text>
                    <Text style={styles.paragraph}>• Contest Duration: Each contest has a specified start and end time.</Text>
                    <Text style={styles.paragraph}>• Rules and Regulations: Specific to each contest. Ensure you review and understand them before participating.</Text>
                    <Text style={styles.paragraph}>• Disqualification: We reserve the right to disqualify participants violating rules or engaging in fraudulent activities.</Text>

                    <Text style={styles.subHeading2}>7.3. Winner Declaration</Text>
                    <Text style={styles.paragraph}>• Number of Winners: Between 1 to 4 winners per contest, depending on contest rules.</Text>
                    <Text style={styles.paragraph}>• Prize Distribution: Winners receive prize amounts based on their rank.</Text>

                    <Text style={styles.paragraph}>These terms are subject to change. Ensure you review them regularly to stay updated.</Text>
                </ScrollView>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,

        marginHorizontal: 10
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: "white"
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        color: "white"

    },
    subHeading2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: "white"

    },
    paragraph: {
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
        color: '#ccc', 

    },
});

export default TermsAndConditions;
