
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Container } from '../components/Container';
import { colors } from '../constants/colors';
import { AppBar } from '../components/AppBar';

export default function PrivacyPolicy() {
    return (
        <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
            <AppBar textColor={colors.gold} backgroundColor='transparent' back title='Privacy Policy' />

            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.header}>Privacy Policy for WonByBid</Text>
                    <Text style={styles.paragraph}>
                        Welcome to WonByBid! At WonByBid, we’re dedicated to safeguarding your privacy and ensuring a secure, enjoyable experience on our platform. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or use our services. Please read it carefully, and if you have any questions or concerns, don’t hesitate to reach out to us. If you don’t agree with our policy, please refrain from using our site.
                    </Text>

                    <Text style={styles.subHeader}>1. What Information We Collect</Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>Personal Data:</Text> When you sign up with us, we gather personal details like your name, email address, phone number, and payment information. This helps us identify and communicate with you effectively.
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>Usage Data:</Text> We automatically collect information about your use of our website, such as your IP address, browser type, pages viewed, and the time spent on our site. This data helps us understand how you interact with our platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>Location Data:</Text> To offer location-based features, we may collect your location information through your IP address or mobile device GPS. This allows us to provide more relevant services to you.
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>Camera and Contact Data:</Text> For features like profile picture updates and inviting friends to join contests, we might request access to your camera and contacts.
                    </Text>

                    <Text style={styles.subHeader}>2. How We Use Your Information</Text>
                    <Text style={styles.paragraph}>
                        We use your information to create and manage your account, process transactions, and offer customer support. Additionally, we analyze this data to enhance our platform’s functionality and user experience.
                    </Text>
                    <Text style={styles.paragraph}>
                        We may send you updates, promotional offers, and information related to our services. If you prefer not to receive these communications, you can opt-out at any time.
                    </Text>
                    <Text style={styles.paragraph}>
                        We monitor for fraudulent activities and maintain the integrity of our contests using the data we collect.
                    </Text>

                    <Text style={styles.subHeader}>3. Sharing Your Information</Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>With Service Providers:</Text> We may share your information with third-party service providers who assist us with tasks like payment processing and data analysis. These partners are bound by strict confidentiality agreements and are only allowed to use your information for the purposes we specify.
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>For Legal Reasons:</Text> We might disclose your information if required by law or in response to valid legal requests from authorities.
                    </Text>

                    <Text style={styles.subHeader}>4. Securing Your Data</Text>
                    <Text style={styles.paragraph}>
                        We employ robust security measures to protect your personal information. Despite these precautions, please be aware that no method of transmission or electronic storage is entirely secure. While we strive to protect your data, we cannot guarantee its absolute security.
                    </Text>

                    <Text style={styles.subHeader}>5. Your Privacy Rights</Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>Access and Updates:</Text> You have the right to access, update, or delete your personal information at any time by logging into your account.
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>Opt-Out:</Text> You can opt-out of receiving promotional communications from us by following the unsubscribe instructions included in those messages.
                    </Text>

                    <Text style={styles.subHeader}>6. Changes to Our Privacy Policy</Text>
                    <Text style={styles.paragraph}>
                        We may update our Privacy Policy occasionally. We’ll notify you of any changes by posting the revised policy on this page and updating the “Last updated” date at the top.
                    </Text>

                    <Text style={styles.subHeader}>7. Contact Us</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions or concerns about this Privacy Policy, please reach out to us:
                    </Text>
                    <Text style={styles.paragraph}>wonBybid@gmail.com</Text>
                   
                </ScrollView>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Black background
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    content: {
        paddingBottom: 50, // Extra space at the bottom for scrolling
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // White text
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 14,
        color: '#ccc', // Light gray for readability
        lineHeight: 22,
    },
    bold: {
        fontWeight: 'bold',
        color: '#fff',
    }
});

