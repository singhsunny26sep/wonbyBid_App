import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {AppBar} from '../components/AppBar';
import {colors} from '../constants/colors';
import {scale} from '../utils/responsiveSize';
import {Container} from '../components/Container';

const Legality = () => {
  return (
    <>
      <Container
        statusBarStyle="light-content"
        statusBarBackgroundColor={colors.themeRed}
        backgroundColor={colors.black}>
        <AppBar
          textColor={colors.gold}
          backgroundColor="transparent"
          back
          title="Legality"
        />
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>Legality of Playing WonByBid</Text>
          <Text style={styles.subHeading}>Is Playing WonByBid Legal?</Text>
          <Text style={styles.paragraph}>
            Yes, WonByBid is a game of skill, making it completely legal under
            Indian laws. Skill-based games are legally distinct from games of
            chance and are permitted across most states.
          </Text>
          <Text style={styles.subHeading}>Restricted States</Text>
          <Text style={styles.paragraph}>
            Players from the following states are not allowed to participate in
            cash-based contests:
          </Text>
          <Text style={styles.listItem}>• Assam</Text>
          <Text style={styles.listItem}>• Sikkim</Text>
          <Text style={styles.listItem}>• Nagaland</Text>
          <Text style={styles.listItem}>• Odisha</Text>
          <Text style={styles.listItem}>• Telangana</Text>
          <Text style={styles.listItem}>• Andhra Pradesh</Text>
          <Text style={styles.paragraph}>
            However, players from these states can still enjoy Practice
            Contests, which are free and do not involve real money or prizes.
          </Text>
          <Text style={styles.subHeading}>Why Is It Legal?</Text>
          <Text style={styles.paragraph}>
            WonByBid is classified as a skill-based game, which is legal under
            Indian law. The Supreme Court of India has consistently upheld that
            games requiring a preponderance of skill over chance are considered
            legal and not gambling.
          </Text>
          <Text style={styles.paragraph}>
            Since WonByBid relies on strategy, analysis, and decision-making, it
            is permitted in most states. Games of chance, on the other hand, are
            regulated or restricted in various jurisdictions.
          </Text>
          <Text style={styles.subHeading}>
            Compliance & Player Responsibility
          </Text>
          <Text style={styles.paragraph}>
            We are committed to full legal compliance and provide a safe, fair,
            and transparent platform for competitive gaming.
          </Text>
          <Text style={styles.paragraph}>
            However, it is your responsibility to ensure compliance with local
            laws regarding online gaming and contests in your region. If you are
            uncertain about the legal status of participating in WonByBid, we
            strongly recommend consulting a legal professional in your
            jurisdiction.
          </Text>
          <Text style={styles.subHeading}>Our Commitment to Fair Play</Text>
          <Text style={styles.paragraph}>WonByBid is dedicated to:</Text>
          <Text style={styles.listItem}>✔ Fair & Responsible Gaming</Text>
          <Text style={styles.listItem}>✔ Legal Compliance</Text>
          <Text style={styles.listItem}>✔ A Secure Gaming Environment</Text>
          <Text style={styles.paragraph}>
            We encourage all players to follow local laws and engage in gaming
            responsibly.
          </Text>
        </ScrollView>
      </Container>
    </>
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
    color: 'white',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'white',
  },
  paragraph: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 20,
    color: '#ccc',
  },
  listItem: {
    fontSize: 14,
    marginTop: 3,
    marginLeft: 15,
    color: 'white',
  },
});

export default Legality;
