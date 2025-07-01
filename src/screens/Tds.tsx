import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import { scale } from '../utils/responsiveSize';
import { Container } from '../components/Container';
import TableComponent from '../components/Table/Table';

const Tds = () => {
    return (
        <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
            <AppBar textColor={colors.gold} backgroundColor='transparent' back title='TDS' />
            <ScrollView style={styles.container}>
                <Text style={styles.heading}>Understanding How TDS is Calculated on Winnings</Text>
                
                <Text style={styles.paragraph}>As per the Indian Income Tax Act, a 30% TDS (Tax Deducted at Source) is applicable on net winnings from online gaming. The tax is deducted before you withdraw your winnings.</Text>
                
                <Text style={styles.subHeading}>Formula for TDS Deduction:</Text>
                <Text style={styles.paragraph}>Net Winnings = Total Withdrawn + Winnings – Total Deposits</Text>
                <Text style={styles.paragraph}>TDS = Net Winnings × 30%</Text>
                
                <Text style={styles.subHeading}>How WonByBid Ensures Fair Tax Deduction</Text>
                <Text style={styles.paragraph}>The 30% TDS is applied on net winnings, not on the total withdrawal amount.</Text>
                
                <Text style={styles.subHeading}>Example 1: When You Have Net Winnings</Text>
                <Text style={styles.paragraph}>✅ Deposited = ₹5,000{"\n"}✅ Won = ₹5,000{"\n"}✅ Withdrawn = ₹5,000{"\n"}✅ Net Winnings = ₹5,000 + 5,000 – ₹5,000 = ₹5,000{"\n"}✅ TDS Deducted = ₹5,000 × 30% = ₹1,500{"\n"}✅ Final Withdrawable Amount = ₹10,000 – ₹1,500 = ₹8,500</Text>
                <TableComponent/>
                <Text style={styles.subHeading}>Example 2: When You Have No Net Winnings (No TDS Deduction)</Text>
                <Text style={styles.paragraph}>✅ Deposited = ₹5,000{"\n"}✅ Won = ₹2,000{"\n"}✅ Withdrawn = ₹2,500{"\n"}✅ Net Winnings = ₹2,500 + ₹2,000 - 5000 = (-₹500) (No taxable amount){"\n"}✅ TDS Deducted = ₹0{"\n"}✅ Final Withdrawable Amount = ₹4,500</Text>
                <TableComponent/>
                
                <Text style={styles.subHeading}>Why WonByBid’s TDS System is Fair?</Text>
                <Text style={styles.paragraph}>✅ Only net winnings are taxed (Not on deposit or total winnings){"\n"}✅ No TDS if total deposits are more than winnings{"\n"}✅ 100% transparency in tax deduction before withdrawal{"\n"}✅ Users can track their TDS deductions in their account</Text>
                
                <Text style={styles.subHeading}>Final Summary</Text>
                <Text style={styles.paragraph}>• TDS applies only if Net Winnings  0{""}• Deposits are excluded from TDS calculation{""}• WonByBid follows a transparent and fair taxation system</Text>
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
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: colors.gold
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        color: colors.white
    },
    paragraph: {
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
        color: colors.white
    }
});

export default Tds;