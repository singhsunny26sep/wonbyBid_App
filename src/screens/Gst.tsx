import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {AppBar} from '../components/AppBar';
import {colors} from '../constants/colors';
import {scale} from '../utils/responsiveSize';
import {Container} from '../components/Container';

const Gst = () => {
  return (
    <Container
      statusBarStyle="light-content"
      statusBarBackgroundColor={colors.themeRed}
      backgroundColor={colors.black}>
      <AppBar
        textColor={colors.gold}
        backgroundColor="transparent"
        back
        title="GST Us"
      />
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>
          Understanding How GST is Calculated on Deposits
        </Text>

        <Text style={styles.paragraph}>
          As per the new GST rule (effective October 1, 2023), 28% GST is
          charged on deposits made on online gaming platforms. This means that
          when you deposit an amount, a part of it goes towards GST, reducing
          the actual playable balance.
        </Text>

        <Text style={styles.subHeading}>Formula for Deposit Breakdown:</Text>
        <Text style={styles.paragraph}>
          Deposit Amount Before GST = Total Amount Deposited ÷ (1 + GST Rate)
        </Text>

        <Text style={styles.subHeading}>
          Example: ₹1000 Deposit Calculation
        </Text>
        <Text style={styles.paragraph}>Let’s break it down:</Text>

        <Text style={styles.bullet}>✔ User Deposits ₹1000</Text>
        <Text style={styles.bullet}>
          ✔ GST is calculated on the pre-GST amount:
        </Text>
        <Text style={styles.paragraph}>
          Deposit Before GST = ₹1000 ÷ (1+0.28) = ₹781.25
        </Text>
        <Text style={styles.bullet}>
          ✔ GST Amount (28%) is charged on ₹781.25:
        </Text>
        <Text style={styles.paragraph}>GST = ₹781.25 × 28% = ₹218.75</Text>
        <Text style={styles.paragraph}>✔ GST Amount Refunded= ₹218.75</Text>

        <Text style={styles.bullet}>✔ Final Deposit in Wallet = ₹1000</Text>

        <Text style={styles.subHeading}>How WonByBid Compensates the GST?</Text>
        <Text style={styles.paragraph}>
          Since your actual deposit balance is reduced due to GST, WonByBid
          compensates this GST amount by providing GST Refund = ₹218.75 so you don’t lose
          value.
        </Text>
        <Text style={styles.bullet}>
          ✔ GST Refund  = ₹218.75
        </Text>
        <Text style={styles.bullet}>
          ✔ Total Playable Balance = ₹781.25 (real cash) + ₹218.75 (GST Refund) =
          ₹1000
        </Text>
        <Text style={styles.paragraph}>
          This means you get the full ₹1000 value to play, ensuring you are not
          at a loss due to GST!
        </Text>

        <Text style={styles.subHeading}>Summary of ₹1000 Deposit Example</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Particulars</Text>
            <Text style={styles.tableCell}>Amount (₹)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Deposit by User</Text>
            <Text style={styles.tableCell}>1000</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Deposit Before GST</Text>
            <Text style={styles.tableCell}>781.25</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>GST Charged (28%)</Text>
            <Text style={styles.tableCell}>218.75</Text>
          </View>
      
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>GST Refund</Text>
            <Text style={styles.tableCell}>281.75</Text>
          </View>
         
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.bold]}>
            Account Deposit in Wallet
            </Text>
            <Text style={[styles.tableCell, styles.bold]}>1000</Text>
          </View>
        
        </View>

        <Text style={styles.subHeading}>Why WonByBid is the Best Choice?</Text>
        <Text style={styles.bullet}>
          ✔ No Loss Due to GST: We give back  100% GST Refund
        </Text>
        <Text style={styles.bullet}>
          ✔ More Playable Value: ₹1000 deposit = ₹1000 total balance (Real +
        GST Refund)
        </Text>
        <Text style={styles.bullet}>
          ✔ Best Rewards System: Every rupee you deposit gives you full value
        </Text>
        <Text style={styles.bullet}>
          ✔ Instant Results & Fair Play: Enjoy fast-paced, fair gaming with the
          best value for your money
        </Text>

        <Text style={styles.subHeading2}>
          Join WonByBid Now & Get the Full Value for Every Deposit!
        </Text>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'white',
  },
  subHeading2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'gold',
  },
  paragraph: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 22,
    color: 'white',
  },
  bullet: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 22,
    color: 'white',
    marginLeft: 10,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  tableCell: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color: 'gold',
  },
});

export default Gst;
