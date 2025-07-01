import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import { scale } from '../utils/responsiveSize';
import { Container } from '../components/Container';

const PdfView = () => {
    return (
        <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
            <AppBar textColor={colors.gold} backgroundColor='transparent' back title='TDS' />
            <ScrollView style={styles.container}>
                <Text style={styles.heading}>Understanding How TDS is Calculated on Winnings</Text>
                <Text style={styles.paragraph}>
                    As per the Indian Income Tax Act, a 30% TDS (Tax Deducted at Source) is applicable on net winnings from online gaming. 
                    The tax is deducted before you withdraw your winnings.
                </Text>
                <Text style={styles.subHeading}>Formula for TDS Deduction:</Text>
                <Text style={styles.paragraph}>TDS = Net Winnings × 30%</Text>
                
                <Text style={styles.subHeading}>How WonByBid Ensures Fair Tax Deduction</Text>
                <Text style={styles.paragraph}>
                    The 30% TDS is applied on net winnings, not on the total withdrawal amount.
                </Text>
                
                <Text style={styles.subHeading2}>Example 1: When You Have Net Winnings</Text>
                <Text style={styles.paragraph}>
                    ✅ Deposited = ₹5,000{"\n"}
                    ✅ Won = ₹10,000{"\n"}
                    ✅ Net Winnings = ₹10,000 – ₹5,000 = ₹5,000{"\n"}
                    ✅ TDS Deducted = ₹5,000 × 30% = ₹1,500{"\n"}
                    ✅ Final Withdrawable Amount = ₹10,000 – ₹1,500 = ₹8,500
                </Text>
                
                <Text style={styles.subHeading2}>Example 2: When You Have No Net Winnings (No TDS Deduction)</Text>
                <Text style={styles.paragraph}>
                    ✅ Deposited = ₹5,000{"\n"}
                    ✅ Won = ₹4,500{"\n"}
                    ✅ Net Winnings = ₹4,500 – ₹5,000 = (-₹500) (No taxable amount){"\n"}
                    ✅ TDS Deducted = ₹0 {"\n"}
                    ✅ Final Withdrawable Amount = ₹4,500
                </Text>
                
                <Text style={styles.subHeading}>Why WonByBid’s TDS System is Fair?</Text>
                <Text style={styles.paragraph}>
                    ✅ Only net winnings are taxed (Not on deposit or total winnings){"\n"}
                    ✅ No TDS if total deposits are more than winnings{"\n"}
                    ✅ 100% transparency in tax deduction before withdrawal{"\n"}
                    ✅ Users can track their TDS deductions in their account
                </Text>
                
                <Text style={styles.subHeading}>Final Summary</Text>
                <Text style={styles.paragraph}>
                    • TDS applies only if Net Winnings &gt; 0{"\n"}
                    • Deposits are excluded from TDS calculation{"\n"}
                    • WonByBid follows a transparent and fair taxation system
                </Text>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: "white"
    }
});

export default PdfView;