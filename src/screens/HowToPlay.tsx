import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../constants/colors';
import {AppBar} from '../components/AppBar';
import TableComponent from '../components/Table/Table';

const FeedbackSystem = () => {
  return (
    <ScrollView style={styles.container}>
      <AppBar
        textColor={colors.gold}
        backgroundColor="transparent"
        back
        title="How To Play"
      />

      <Text style={styles.heading}>Hello everyone, welcome to WonByBid! Now, let's understand the Feedback System in WonByBid.</Text>

      <Text style={styles.description}>
        The Feedback System determines the significance of each bid in a
        contest. If the bid range in a contest is 0 to 100:
      </Text>
      <Text style={styles.bullet}>• "0" is the smallest number.</Text>
      <Text style={styles.bullet}>• "100" is the highest number.</Text>
      <Text style={styles.bullet}>
        • The numbers 99, 98, 97, etc., are progressively smaller.
      </Text>

      <Text style={styles.sectionTitle}>1. High</Text>
      <Text style={styles.paragraph}>
        • If a bid is the highest number and no one else placed the same bid, it
        is <Text style={styles.highlight}>High</Text>.{'\n'}• This is the{' '}
        <Text style={styles.highlight}>winning bid</Text>.
      </Text>

      <Text style={styles.sectionTitle}>2. High and Same</Text>
      <Text style={styles.paragraph}>
        • If a bid is the highest number but duplicated, it's{' '}
        <Text style={styles.highlight}>High and Same</Text>.{'\n\n'}
        <Text style={styles.subHeading}>Example:</Text>
        {'\n'}
        Sai placed 100. Priya also placed 100.{'\n'}
        Since 100 is duplicated, it's not winning.{'\n'}
        Next High, 99 by Sai alone = <Text style={styles.highlight}>High</Text>.
      </Text>

      <Text style={styles.sectionTitle}>3. Low</Text>
      <Text style={styles.paragraph}>
        • If a bid is not the High but is placed only once, it's{' '}
        <Text style={styles.highlight}>Low</Text>.
      </Text>

      <Text style={styles.sectionTitle}>4. Low and Same</Text>
      <Text style={styles.paragraph}>
        • If a bid is not the High and is duplicated, it's{' '}
        <Text style={styles.highlight}>Low and Same</Text>.{'\n\n'}
        <Text style={styles.subHeading}>Example:</Text>
        {'\n'}
        Winning bid: 99{'\n'}
        98, 96, 95, 94 placed only once →{' '}
        <Text style={styles.highlight}>Low</Text>
        {'\n'}
        97 by Priya & Neha → <Text style={styles.highlight}>Low and Same</Text>
      </Text>
      <Text style={styles.sectionTitle}>Winning Feedback</Text>
      <Text style={styles.paragraph}>
        • "Winning" next to a bid means it is in the{' '}
        <Text style={styles.highlight}>Winning Ranks</Text>.{'\n\n'}
        <Text style={styles.subHeading}>Example:</Text>
        {'\n'}
        First winning bid: 99{'\n'}
        Later: 98, 96, 95 also added to winning ranks
      </Text>
      <TableComponent/>
    </ScrollView>
  );
};

export default FeedbackSystem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // black background
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white, // gold
    marginBottom: 16,
  },
  description: {
    color: '#ccc',

    fontSize: 14,
    marginBottom: 10,
  },
  bullet: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.gold,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  paragraph: {
    color: '#ccc',

    fontSize: 14,
    marginBottom: 10,
  },
  subHeading: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  highlight: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
