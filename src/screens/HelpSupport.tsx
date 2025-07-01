import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { AppBar } from '../components/AppBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HelpSupport() {
  const navigation = useNavigation();

  const faqs = [
    { id: '1', question: 'What is WonByBid?', answer: 'WonByBid is a real-money skill-based gaming platform where users compete by placing bids in various contests.' },
    { id: '2', question: 'How does WonByBid work?', answer: 'Users join contests by paying an entry fee, placing bids, and winning based on bid accuracy and ranking.' },
    { id: '3', question: 'Is WonByBid legal in India?', answer: 'Yes, WonByBid operates in states where skill-based real-money gaming is allowed and restricts users from prohibited states.' },
    { id: '4', question: 'Is KYC mandatory?', answer: 'Yes, KYC verification is required for withdrawals to ensure compliance and prevent fraud.' },
  ];

  const [expandedId, setExpandedId] = useState(faqs[0].id); // First FAQ expanded by default

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <AppBar textColor={colors.gold} backgroundColor='transparent' back title='Help & Support' />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image style={styles.imageMain} resizeMode="cover" source={require('../assets/images/banners.jpeg')} />
        {/* <Text style={styles.header}>Help & Support</Text> */}
        {/* <Text style={styles.subText}>We're here to assist you. Please enter your query below.</Text>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text> */}
        <FlatList
          data={faqs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.faqItem}>
              <View style={styles.faqRow}>
                <Ionicons name="help-circle-outline" size={20} color={colors.gold} />
                <Text style={styles.faqText}>{item.question}</Text>
                <Ionicons 
                  name={expandedId === item.id ? "chevron-up-outline" : "chevron-down-outline"} 
                  size={20} 
                  color={colors.gold} 
                />
              </View>
              {expandedId === item.id && <Text style={styles.answerText}>{item.answer}</Text>}
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.chatButton}>
        <Ionicons name="chatbubbles-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 80,
  },
  imageMain: {
    height: 220,
    width: '100%',
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 20,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gold,
    marginBottom: 10,
  },
  faqItem: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    marginLeft: 10,
  },
  answerText: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 10,
    paddingLeft: 30,
  },
  chatButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFD700',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
  },
});
