
import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Easing, TextInput, Alert } from "react-native";
import CheckBox from "@react-native-community/checkbox"; // ✅ Updated package
import { launchImageLibrary } from "react-native-image-picker";
import { colors } from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { serverBaseURL } from "../constants/constant";
import { NavigationString } from "../navigation/navigationStrings";
import { AuthContext } from "../utils/authContext";
import { ScrollView } from "react-native";

export default function UserRefer() {
  const [formData, setFormData] = useState({ username: "", referralCode: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState({ message: "", success: true });
  const [referralValid, setReferralValid] = useState({ message: "", success: true });
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleImage = useRef(new Animated.Value(1)).current;
  const slideInput = useRef(new Animated.Value(-200)).current;
  const bounceCheck = useRef(new Animated.Value(1)).current;
  const scaleButton = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation<any>();
  const authContext: any = useContext(AuthContext);
  const { userInfo }: any = useContext(AuthContext);

  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(slideInput, {
      toValue: 0,
      duration: 700,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const checkUsernameAvailability = async (username: any) => {
    if (!username?.trim()) {
      setUsernameAvailable({ message: "Please Enter valid Username", success: false })
      return; // Skip API call if empty
    }
    try {
      const response = await axios.post(`${serverBaseURL}user/user_name_exist`, { "name": username });
      const data = response.data;
      // console.log(data)
      setUsernameAvailable({ message: data.message, success: data.success })
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  // Function to check referral code validity
  const checkReferralCode = async (referralCode: any) => {
    if (!referralCode.trim()) {
      setReferralValid({ message: "", success: true })
      return; // Skip API call if empty
    }
    try {
      const response = await axios.post(`${serverBaseURL}user/user_name_referral`, { referralCode: referralCode });
      const data = response.data;
      setReferralValid({ message: data.message, success: data.success }); // Assuming API returns { valid: true/false }
    } catch (error: any) {
      setReferralValid({ message: error.message, success: false });
    }
  };




  const handleUpdate = async () => {
    if (!formData.username.trim()) {
      Alert.alert("Username cannot be empty!");
      return;
    }
    const authStateString: any = await AsyncStorage.getItem('authState');
    const authState = JSON.parse(authStateString);
    // console.log(authState)
    const token = authState?.token;

    try {

      const response = await axios.patch(`${serverBaseURL}user/UserNameUpdate`, { name: formData.username, referalCode: formData.referralCode, }, { headers: { Authorization: token }, });
      if (response.status === 200) {
        const userInfo2: any = await AsyncStorage.getItem("userInfo")
        const authState = JSON.parse(userInfo2);

        authState.name = formData.username;

        await AsyncStorage.setItem('userInfo', JSON.stringify(authState));

        console.log(userInfo, authState)

        authContext.setUserInfo({
          userUniqueId: null,
          userId: authState?._id,
          userName: authState?.name,
          userMobile: authState?.mobileNumber,
          useEmail: authState?.email,
          profile: authState.profile,
          fcmToken: authState.fcmToken,
        })
        navigation.navigate(NavigationString.BottomTabBar)

        Alert.alert("Profile update successfully");

      }
    } catch (error) {
      console.log("Update Error:", error);
      Alert.alert("Failed to update profile. Please try again.");
    }
  };

  const selectImage = async () => {
    Animated.sequence([
      Animated.timing(scaleImage, { toValue: 1.1, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleImage, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.assets?.length) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const toggleCheck = () => {

    Animated.sequence([
      Animated.timing(bounceCheck, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(bounceCheck, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    if (!isChecked) {
      // show modal instead of immediately checking
      setShowTermsModal(true);
    } else {
      setIsChecked(false); // unchecking is allowed directly
    }
    setIsChecked(!isChecked);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
    if (key === 'username') {
      checkUsernameAvailability(value);
    } else if (key === 'referralCode') {
      checkReferralCode(value);
    }

  };

  /* const toggleCheck = () => {
    if (!isChecked) {
      // show modal instead of immediately checking
      setShowTermsModal(true);
    } else {
      setIsChecked(false); // unchecking is allowed directly
    }
  }; */
  // console.log(usernameAvailable)

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity onPress={selectImage} activeOpacity={0.8}>
            <Animated.Image source={selectedImage ? { uri: selectedImage } : require("../assets/images/user.png")} style={[styles.image, { transform: [{ scale: scaleImage }] }]} />
          </TouchableOpacity>
          {/* <Animated.View style={{ transform: [{ translateX: slideInput }] }}>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#aaa"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
          />
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: slideInput }] }}>
          <TextInput
            style={styles.input}
            placeholder="Enter referral code (Optional)"
            placeholderTextColor="#aaa"
            value={formData.referralCode}
            onChangeText={(text) => setFormData({ ...formData, referralCode: text })}
          />
        </Animated.View> */}
          {/* Username Input */}
          <Animated.View style={{ transform: [{ translateX: slideInput }] }}>

            <TextInput style={styles.input} placeholder="Enter your username" placeholderTextColor="#aaa" value={formData.username} onChangeText={(text) => handleInputChange('username', text)} />

            {<Text style={{ color: usernameAvailable.success ? 'green' : 'red' }}>{usernameAvailable.message}</Text>}

          </Animated.View>

          {/* Referral Code Input */}
          <Animated.View style={{ transform: [{ translateX: slideInput }] }}>
            <TextInput style={styles.input} placeholder="Enter referral code (Optional)" placeholderTextColor="#aaa" value={formData.referralCode} onChangeText={(text) => handleInputChange('referralCode', text)} />
            {<Text style={{ color: referralValid.success ? 'green' : 'red' }}>{referralValid.message}</Text>}
          </Animated.View>
          <View style={styles.checkboxContainer}>
            <CheckBox value={isChecked} onValueChange={toggleCheck} tintColors={{ true: colors.gold, false: "#fff" }} />
            <Text style={styles.checkboxText}>Accept Terms & Conditions</Text>
          </View>
          <Animated.View style={{ transform: [{ scale: scaleButton }] }}>
            <TouchableOpacity onPress={handleUpdate} style={[styles.button, !(isChecked && usernameAvailable.success && formData.username.trim()) && { opacity: 0.5 }]} disabled={!!(!isChecked && usernameAvailable.success && formData.username.trim())}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>


      </View>
      {showTermsModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalScroll}>

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
            <TouchableOpacity onPress={() => { setIsChecked(true); setShowTermsModal(false); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.black,
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#444",
    alignSelf: "center"
  },
  input: {
    width: "100%",
    height: 50,
    borderRightWidth: 1,
    borderColor: colors.gold,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.gold,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalScroll: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.black,
    borderRadius: 10,
    padding: 20,
    maxHeight: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.themeRed,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: colors.gold,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
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
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: "white"

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "white"
  },
});
