
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  TextInput,
  Alert
} from "react-native";
import CheckBox from "@react-native-community/checkbox"; // ✅ Updated package
import { launchImageLibrary } from "react-native-image-picker";
import { colors } from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { serverBaseURL } from "../constants/constant";
import { NavigationString } from "../navigation/navigationStrings";
import { AuthContext } from "../utils/authContext";

export default function UserRefer() {
  const [formData, setFormData] = useState({ username: "", referralCode: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState({
    message:"",
    success:true
  });
  const [referralValid, setReferralValid] = useState({
    message:"",
    success:true
  });
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

  const checkUsernameAvailability = async (username) => {
    if (!username?.trim()) {
      setUsernameAvailable({
        message:"Please Enter valid Username",
        success:false
      })
      
      return; // Skip API call if empty
    }
    try {
      const response = await axios.post(`${serverBaseURL}user/user_name_exist`,{"name":username});
      const data = response.data;
      // console.log(data)
      setUsernameAvailable({
        message:data.message,
        success:data.success
      })

    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  // Function to check referral code validity
  const checkReferralCode = async (referralCode) => {
    if (!referralCode.trim()) {
      setReferralValid({
        message:"",
        success:true
      })
      return; // Skip API call if empty
    }
    try {
      const response = await axios.post(`${serverBaseURL}user/user_name_referral`,
        {referralCode:referralCode}
      );
      const data = response.data;
      setReferralValid({
        message:data.message,
        success:data.success
      }); // Assuming API returns { valid: true/false }
    } catch (error) {
      setReferralValid({
        message:error.message,
        success:false
      }); 
    }
  };



  
  const handleUpdate = async () => {
    if (!formData.username.trim()) {
      Alert.alert("Username cannot be empty!");
      return;
    }
    const authStateString: any = await AsyncStorage.getItem('authState');
    const authState = JSON.parse(authStateString); 
    console.log(authState)
    const token = authState?.token; 

    try {
    
      const response = await axios.patch(
        `${serverBaseURL}user/UserNameUpdate`,
        {
          name: formData.username,
          referalCode: formData.referralCode,
        },
        {
          headers: { Authorization: token }, 
        }
      );
      if (response.status === 200) {
        const userInfo2: any = await AsyncStorage.getItem("userInfo")
        const authState = JSON.parse(userInfo2); 

        authState.name = formData.username;

        await AsyncStorage.setItem('userInfo', JSON.stringify(authState));
         
        console.log(userInfo,authState)

        authContext.setUserInfo({
          userUniqueId: null,
          userId: authState?._id,
          userName: authState?.name,
          userMobile: authState?.mobileNumber,
          useEmail: authState?.email,
          profile:authState.profile,
          fcmToken:authState.fcmToken,
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
    setIsChecked(!isChecked);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  
    // if (typingTimeout) clearTimeout(typingTimeout); // Clear previous timeout
  
      if (key === 'username') {
        checkUsernameAvailability(value);
      } else if (key === 'referralCode') {
        checkReferralCode(value);
      }
  
  };

  console.log(usernameAvailable)

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity onPress={selectImage} activeOpacity={0.8}>
          <Animated.Image
            source={selectedImage ? { uri: selectedImage } : require("../assets/images/user.png")}
            style={[styles.image, { transform: [{ scale: scaleImage }] }]}
          />
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

         <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#aaa"
            value={formData.username}
            // onChangeText={(text) => setFormData({ ...formData, username: text })}
            onChangeText={(text) => handleInputChange('username', text)}
          />

        {<Text style={{ color: usernameAvailable.success?'green':'red' }}>{usernameAvailable.message}</Text>}

      </Animated.View>

      {/* Referral Code Input */}
      <Animated.View style={{ transform: [{ translateX: slideInput }] }}>
         <TextInput
            style={styles.input}
            placeholder="Enter referral code (Optional)"
            placeholderTextColor="#aaa"
            value={formData.referralCode}
            // onChangeText={(text) => setFormData({ ...formData, referralCode: text })}
            onChangeText={(text) => handleInputChange('referralCode', text)}

          />
        {<Text style={{ color: referralValid.success?'green':'red' }}>{referralValid.message}</Text>}
      </Animated.View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={toggleCheck}
            tintColors={{ true: colors.gold, false: "#fff" }} // Default: White, Checked: Gold
          />
          <Text style={styles.checkboxText}>Accept Terms & Conditions</Text>
        </View>
        <Animated.View style={{ transform: [{ scale: scaleButton }] }}>
          <TouchableOpacity onPress={handleUpdate}
            style={[styles.button,!(isChecked && usernameAvailable.success &&formData.username.trim()) && { opacity: 0.5 }]}
            disabled={!!(!isChecked && usernameAvailable.success &&formData.username.trim())}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
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
});
