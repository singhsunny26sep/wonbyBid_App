import React, { useContext, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { AvatarImage, Box, CloseIcon, Icon, Spinner, Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { Pressable } from '@gluestack-ui/themed'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BackIconWhite, CameraIcon, CameraIconBig, ImageIcon, ShareWhiteIcon } from '../components/Icons'
import { ActivityIndicator, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import useUserDashboard from '../hooks/home/get-profile'
import { AuthContext } from '../utils/authContext'
import useProfileUpdate from '../hooks/home/update-profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from 'react-native-image-crop-picker';
import { uploadImageToCloudinary } from '../utils/Cloudinary'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Share from 'react-native-share';
import { Image } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import Body from '../components/Body/Body'
import PrimaryButton from '../components/Button/PrimaryButton'

const UpdateProfile = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast()

  const { data: profileData, isLoading: profileIsLoading } = useUserDashboard()
  const { userInfo, setUserInfo }: any = useContext(AuthContext);
  const updateProfile = useProfileUpdate()


  // action sheet
  const showToast = (message: string) => {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const [name, setName] = useState<string | any>(userInfo?.userName)


  // this is for popup model for bottom
  const actionSheetRef: any = useRef<ActionSheetRef>(null);

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const hideActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  // console.log("authContext: ", userInfo);
  const [image, setImage] = useState<string | null>(userInfo?.profile); // Local image URI
  const [uploading, setUploading] = useState<boolean>(false); // Upload status
  const [uploadedUrl, setUploadedUrl] = useState<string>('');




  // sharing function
  const shareMessageOnWhatsapp = async () => {
    try {
      const options = {
        message: 'Hello! This is from WonByBid. url: https://www.wonbybid.com/', // The main message
        social: Share.Social.WHATSAPP, // WhatsApp-specific sharing
        URL: "https://www.wonbybid.com/" // The website URL
      };
      await Share.shareSingle(options);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
    }
  };

  const shareRefer = async () => {
    try {
      const options = {
        title: 'Share via', // Title for the share dialog
        message: 'Hello! This is from WonByBid. url: https://www.wonbybid.com/', // The main message
        URL: 'https://www.wonbybid.com/' // The website URL
      };
      await Share.open(options); // Open the share dialog
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };


  // console.log("profileData: ", profileData?.data?.data);
  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.5,
      });

      setImage(image.path);
      const url = await uploadImageToCloudinary(image?.path);
      setUploading(true)
      // console.log("====================== pickImage =====================");
      // console.log("url: ", url);
      setUploadedUrl(url)

      hideActionSheet();

    } catch (error: any) {
      hideActionSheet();
      setUploading(true)
      console.log('Error on openCamera:', error);
    }
  };

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.5,
      });

      setImage(image.path);
      const url = await uploadImageToCloudinary(image?.path);
      setUploading(true)
      // console.log("====================== pickImage =====================");
      // console.log("url: ", url);
      setUploadedUrl(url)

      hideActionSheet();

    } catch (error: any) {
      hideActionSheet();

      console.log('Error on openCamera:', error);
    }
  };

  const saveUserInfoToStorage = async (userInfo: any) => {
    try {
      let userData = {
        userUniqueId: null,
        _id: userInfo.userId,
        name: userInfo.userName,
        mobile: userInfo.userMobile,
        email: userInfo.useEmail,
        profile: userInfo.profile,
      }

      // await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving userInfo to AsyncStorage:', error);
    }
  };

  // updating user data on local storage
  const updateUserName = async (newUserName: string | null, profileImage: string | null) => {
    setUserInfo((prevUserInfo) => {
      const updatedUserInfo = {
        ...prevUserInfo,
        userName: newUserName,
        profile: profileImage
      };
      // Save updated userInfo to AsyncStorage
      saveUserInfoToStorage(updatedUserInfo);

      return updatedUserInfo;
    });
  };


  const handleUpdateProfile = async () => {
    if (!name) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} variant="accent" action="error" zIndex={999}>
              <ToastTitle>Please enter name</ToastTitle>
            </Toast>
          );
        },
      });
    } else if (!uploadedUrl) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} variant="accent" action="error" zIndex={999}>
              <ToastTitle>Please choose profile image</ToastTitle>
            </Toast>
          );
        },
      });
    } {
      const payload = {
        name: name,
        profile: uploadedUrl
      };

      updateProfile?.mutate({ payload: payload }, {
        onSuccess: (data) => {
          if (data?.data?.success) {
            // Update only the name field in userInfo
            updateUserName(data?.data?.data?.name, data?.data?.data?.profile);

            toast.show({
              placement: "bottom",
              render: ({ id }) => {
                const toastId = "toast-" + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="success">
                    <ToastTitle>User Profile Updated Successfully.</ToastTitle>
                  </Toast>
                );
              },
            });
          } else {
            toast.show({
              placement: "bottom",
              render: ({ id }) => {
                const toastId = "toast-" + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="error">
                    <ToastTitle>{data?.data?.message}</ToastTitle>
                  </Toast>
                );
              },
            });
          }
        },
      }
      );
    }
  };


  if (profileIsLoading) {
    return (
      <>
        <Box h={moderateScale(70)} bgColor={colors.themeRed} gap={15}>
          <Box w={'100%'} flexDirection='row' alignItems='center' justifyContent='space-between' px={15} gap={20} pt={5}>
            <Pressable hitSlop={20} onPress={() => navigation.goBack()}>
              <BackIconWhite />
            </Pressable>

            <Box h={moderateScale(60)}>
              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} py={20} >Profile Update</Text>
            </Box>

            <Box flexDirection='row' alignItems='center' gap={25}>
              <TouchableOpacity onPress={shareRefer}>
                <ShareWhiteIcon />
              </TouchableOpacity>
            </Box>

          </Box>
        </Box>
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center' >
          <Spinner  size={'large'} color={colors.gold} />
        </Box>
      </>
    )
  }

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
      <Box h={moderateScale(60)} bgColor={colors.themeRed} gap={15}>
        <Box w={'100%'} flexDirection='row' alignItems='center' justifyContent='space-between' px={15} gap={20} pt={5}>
          <Pressable hitSlop={20} onPress={() => navigation.goBack()}>
            <BackIconWhite />
          </Pressable>

          <Box h={moderateScale(60)}>
            <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} py={20} >Profile Update</Text>
          </Box>

          <Box flexDirection='row' alignItems='center' gap={25}>
            <TouchableOpacity onPress={shareRefer}>
              <ShareWhiteIcon />
            </TouchableOpacity>
          </Box>

        </Box>
      </Box>

      <Body>


        <Box bgColor={colors.black} flex={1} h={'80%'} w={'100%'} px={15} >
          <Body>

            <Box flexDirection='row' alignItems='center' gap={10} w={'100%'} px={15} justifyContent='center'  >
              <TouchableOpacity onPress={showActionSheet}>
                <Box h={moderateScale(100)} w={moderateScale(100)} borderRadius={moderateScale(50)} >
                  {/* <Image alt='image' source={{ uri: image ? image : 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} h={'100%'} w={'100%'} resizeMode='contain' /> */}
                  <AvatarImage source={{ uri: image ? image : 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} alt='profile image' />
                  {/* {uploading ? <ActivityIndicator size="large" color="#0000ff" /> : <AvatarImage source={{ uri: image ? image : 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} alt='profile image' />} */}
                  <Box position='absolute' right={1} top={11}>
                    <CameraIcon  />
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>


            <Box marginTop={14} px={moderateScale(5)}  py={moderateScaleVertical(15)}>
              <TextInput  value={name} onChangeText={(t) => setName(t)} placeholder='Enter Username' style={{ color: colors.black, fontSize: textScale(14), borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, fontFamily: 'Roboto-Medium', backgroundColor:"white"}} placeholderTextColor={colors.dimGray} />
            </Box>

            <Box mt={moderateScale(10)}>
              <PrimaryButton  buttonText='Submit' textColor={colors.white} backgroundColor={colors.greenText} alignSelf='center' height={moderateScale(35)} marginHorizontal={moderateScale(5)} onPress={handleUpdateProfile} loading={updateProfile?.isPending} disabled={updateProfile?.isPending} width="90%" />
            </Box>
          </Body>


        </Box>

        {/* </Box> */}
      </Body>





      <ActionSheet ref={actionSheetRef}>
        <Box w={'100%'} h={moderateScale(20)} display='flex' flexDirection='row'>
          <Box flex={1} />
          <TouchableOpacity hitSlop={20} onPress={hideActionSheet} style={{ marginRight: moderateScale(8), marginTop: moderateScale(8) }}>
            <Icon as={CloseIcon} size="lg" color={colors.grayish} />
          </TouchableOpacity>
        </Box>

        <Box w={'100%'} h={moderateScale(150)} display='flex' flexDirection='row'>
          <Box flex={1} alignItems='center' justifyContent='center'>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }} onPress={pickImage}>
              <ImageIcon />
              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={20} >Choose From Gallery</Text>
            </TouchableOpacity>
          </Box>
          <Box flex={1} alignItems='center' justifyContent='center'>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }} onPress={openCamera}>
              <CameraIconBig />
              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={20} >Open Camera</Text>
            </TouchableOpacity>
          </Box>

        </Box>
      </ActionSheet>


    </Container>
  )
}

export default UpdateProfile