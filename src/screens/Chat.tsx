import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../constants/colors';
import { AppBar } from '../components/AppBar';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I assist you today?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages([...messages, newMessage, { id: Date.now().toString(), text: 'We will get back to you!', sender: 'bot' }]);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <AppBar textColor={colors.gold} backgroundColor="transparent" back title="Help & Support" />
      
      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        inverted
      />

      {/* Input & Send Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#bbb"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <LinearGradient colors={['#FFD700', '#FFA500']} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    maxWidth: '75%',
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 10,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    fontSize: 16,
    padding: 10,
    borderRadius: 20,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
