import { AccordionIcon, Box, ChevronDownIcon, ChevronRightIcon, Icon, Image, Pressable, Spinner, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Dropdown } from 'react-native-element-dropdown'
import { Alert, KeyboardAvoidingView, Platform, TextInput, ToastAndroid } from 'react-native'
import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import Body from '../components/Body/Body'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { BackIconWhite, EditPencil, GolfIcon, MyContactIcon, MyMatchColorIcon, PrivacySettingIcon, ShareWhiteIcon, SpeedMetterIcon, ThreeDotsIcon, UserCircleIcon } from '../components/Icons'
import { Modal } from 'react-native'
import { CloseIcon } from '@gluestack-ui/themed'
import { useContext, useRef, useState } from 'react'
import { CatergoryTypes, deviceHeight } from '../constants/constant'
import { TouchableOpacity } from 'react-native'
import { NavigationString } from '../navigation/navigationStrings'
import { StyleSheet } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { imagePaths } from '../assets/images'
import useUserDashboard from '../hooks/home/get-profile'
import Share from 'react-native-share';
import PrimaryButton from '../components/Button/PrimaryButton'
import useProfileUpdate from '../hooks/home/update-profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import { uploadImageToCloudinary } from '../utils/Cloudinary'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { AvatarImage } from '@gluestack-ui/themed'
import { AuthContext } from '../utils/authContext'
import Loader from '../components/Loader'


const Profile = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  // const toast = useToast()
  // const route = useRoute()
  // console.log("route: ", route?.params);
  // const { userId } = route?.params
  // api
  const { userInfo }: any = useContext(AuthContext);
  const authContext: any = useContext(AuthContext);


  // states
  const [showSettingOptionModal, setShowSettingOptionModal] = useState<any>(false)
  const [selectedCategory, setSelectedCategory] = useState<{
    _id:string,
    title:string
  }>({
    _id:"all",
    title:"Select Category"
  })


  const { data: profileData, isLoading: profileIsLoading } = useUserDashboard({
    userId:userInfo.userId,
    categoryId:selectedCategory._id
  })

  console.log("userInfo: ", userInfo);



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

  const handleLogout = () => {
    authContext.logout()
    AsyncStorage.clear()
    navigation.navigate(NavigationString.Login)
  }





  if (profileIsLoading) {
    return (
      <>
        <Box h={moderateScale(70)} bgColor={colors.themeRed} gap={15}>
          <Box w={'100%'} flexDirection='row' alignItems='center' justifyContent='space-between' px={15} gap={20} pt={15}>
            <Pressable hitSlop={20} onPress={() => navigation.goBack()}>
              <BackIconWhite />
            </Pressable>
            <Box flexDirection='row' alignItems='center' gap={25}>
              <TouchableOpacity onPress={shareRefer}>
                <ShareWhiteIcon />
              </TouchableOpacity>

              <Pressable onPress={() => setShowSettingOptionModal(true)}>
                <ThreeDotsIcon />
              </Pressable>
            </Box>
          </Box>
        </Box>
        <Box backgroundColor='black' flex={1} justifyContent='center' alignItems='center' >
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader/>
        </Box>
      </>
    )
  }

  return (
    <Container backgroundColor='black' statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
      <Box h={moderateScale(160)} bgColor={colors.themeRed} gap={15}>
        <Box w={'100%'} flexDirection='row' alignItems='center' justifyContent='space-between' px={15} gap={20} pt={15}>
          <Pressable hitSlop={20} 
          onPress={() => navigation.goBack()}
            >
            <BackIconWhite />
          </Pressable>


          <Box flexDirection='row' alignItems='center' gap={25}>
            <TouchableOpacity onPress={shareRefer}>
              <ShareWhiteIcon />
            </TouchableOpacity>

            <Pressable onPress={() => setShowSettingOptionModal(true)}>
              <ThreeDotsIcon />
            </Pressable>
          </Box>

        </Box>

        <Box flexDirection='row' alignItems='center' gap={10} w={'100%'} px={15}>
          <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)} >
            {/* <Image alt='icon' source={{ uri: userInfo?.profile ? userInfo?.profile : 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} h={'100%'} w={'100%'} resizeMode='contain' /> */}
            <AvatarImage source={{ uri: userInfo?.profile ? userInfo?.profile : 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} alt='profile image' />
          </Box>
          <Pressable flex={0.8}>
            <Box flexDirection='row' alignItems='center' gap={5}>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} >{userInfo?.userName ? userInfo?.userName : "Guest User"}</Text>
              <TouchableOpacity onPress={() => navigation.navigate(NavigationString.UpdateProfile)}>
                <EditPencil />
              </TouchableOpacity>
            </Box>
          </Pressable>
        </Box>

        <Box flexDirection='row' alignItems='center' gap={15} px={15}>
          <Box bgColor={colors.white} alignItems='center' flex={1} py={5} borderRadius={5} gap={4}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >{profileData?.data?.data?.followers}</Text>
            <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >Followers</Text>
          </Box>

          <Box bgColor={colors.white} alignItems='center' flex={1} py={5} borderRadius={5} gap={4}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >{profileData?.data?.data?.following}</Text>
            <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >Following</Text>
          </Box>

          <Box bgColor={colors.white} alignItems='center' flex={1} py={5} borderRadius={5} gap={4}>
            {/* <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >0</Text> */}
            <MyContactIcon />
            <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >My Contacts</Text>
          </Box>
        </Box>
      </Box>
      <Body>


        <Box bgColor={colors.black} flex={1} h={'80%'} w={'100%'} px={15}>

          <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} py={20} >Performance History</Text>

          <Box bgColor={colors.black} w={'100%'} h={moderateScale(220)} borderRadius={10} p={10}>
            <Box flexDirection='row' alignItems='center' flex={1}>
              <Box alignItems='center' gap={8} flex={1}>
                <MyMatchColorIcon />

                <Dropdown
                  style={localStyles.dropdown}
                  placeholderStyle={localStyles.placeholderStyle}
                  selectedTextStyle={localStyles.selectedTextStyle}
                  data={profileData?.data?.data?.ctegory?[...profileData?.data?.data?.ctegory,{
                    _id:"all",
                    title:"all"
                  }]:[]}
                  labelField="title"
                  valueField="title"
                  placeholder={selectedCategory.title}
                  onChange={(item) => {
                    setSelectedCategory(item)
                  }}
                 renderRightIcon={() => <Icon as={ChevronDownIcon} size="sm" mr="$2" color="white" />}

                  // selectedTextProps={{ numberOfLines: 1 }}
                  renderItem={({ title }) => (<Text fontFamily="$robotoMedium" backgroundColor="$black" color={colors.white} fontSize={14} lineHeight={16} numberOfLines={1} textAlign="center" style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.5), }}>{title}</Text>)}
                  itemTextStyle={localStyles.selectedTextStyle}
                  itemContainerStyle={localStyles.itemContainerStyle}
                />

                {/* <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Categories</Text> */}
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{profileData?.data?.data?.ctegory ? profileData?.data?.data?.ctegory.length : 0}</Text>
              </Box>
              <Box alignItems='center' gap={8} flex={1}>
                <GolfIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}  >Contests</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{profileData?.data?.data?.contestCount ? profileData?.data?.data?.contestCount : 0}</Text>
              </Box>
            </Box>

            <Box flexDirection='row' alignItems='center' flex={1} borderTopWidth={1} borderTopColor={colors.grayish}>
              <Box alignItems='center' gap={8} flex={1}>
                <GolfIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}  >Earn Amount</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{'\u20B9'}{profileData?.data?.data?.earnAmount ? profileData?.data?.data?.earnAmount : 0}</Text>
              </Box>
              <Box alignItems='center' gap={8} flex={1}>
                <SpeedMetterIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}  >Win Percentage</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{profileData?.data?.data?.winingPersentage ? profileData?.data?.data?.winingPersentage?.toFixed(2) : 0} %</Text>
              </Box>
            </Box>


          </Box>

          <Box bgColor={colors.white}  alignSelf='center' h={moderateScale(40)} marginTop={40} alignItems='center' justifyContent='center' borderRadius={10} p={10} my={moderateScaleVertical(15)}>
            <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}>
              Playing on WonByBid Since <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}>
                {new Date(profileData?.data?.data?.expirEDate).toDateString()}
              </Text></Text>
          </Box>

          <Box w={'100%'} h={moderateScale(115)} borderRadius={moderateScale(10)} alignSelf='center'>
            <TouchableOpacity onPress={shareMessageOnWhatsapp}>
              {/* <Image  alt='icon' source={imagePaths.referBanner} resizeMode='cover' w={'100%'} h={'140%'} /> */}
            </TouchableOpacity>
          </Box>

          {/* <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.PrivacySettings)}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} px={10} py={10} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5} alignSelf='center' borderRadius={moderateScale(10)} mt={moderateScaleVertical(20)}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <PrivacySettingIcon width={30} height={30} />

                <Box>
                  <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.gray2} numberOfLines={1} >Privacy Settings</Text>
                  <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1} >Managing privacy details made easy</Text>
                </Box>
              </Box>

              <AccordionIcon as={ChevronRightIcon} color={colors.grayish} size='lg' />
            </Box>
          </TouchableOpacity> */}
        </Box>
      </Body>

      <Modal animationType='slide' transparent={true} visible={showSettingOptionModal} onRequestClose={() => setShowSettingOptionModal(false)}>
        <Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor={colors.black} borderTopRightRadius={10} borderTopLeftRadius={10} w={'100%'} gap={15} py={20} h={moderateScale(180)} marginTop={deviceHeight * 0.60}>
            <Box flexDirection='row' justifyContent='flex-end' alignItems='center' px={15}>
              <Pressable hitSlop={20} onPress={() => setShowSettingOptionModal(false)}>
                <Icon as={CloseIcon} size="lg" color={colors.grayish} />
              </Pressable>
            </Box>

            <Box>
              
              <TouchableOpacity activeOpacity={0.6} onPress={() => { setShowSettingOptionModal(false); navigation.navigate(NavigationString.MyAccount) }}>
                <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5}>
                  <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                    <UserCircleIcon />
                    <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >My Account</Text>
                  </Box>
                  <AccordionIcon as={ChevronRightIcon} color={colors.grayish} size='lg' />
                </Box>
            
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={() => { setShowSettingOptionModal(false); navigation.navigate(NavigationString.PrivacySettings) }}>
                <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5}>
                  <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                    <PrivacySettingIcon />
                    <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Privacy Settings</Text>
                  </Box>
                  <AccordionIcon as={ChevronRightIcon} color={colors.grayish} size='lg' />
                </Box>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={() => {  setShowSettingOptionModal(false),handleLogout()}}>
                <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5}>
                  <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                    <PrivacySettingIcon />
                    <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Log Out</Text>
                  </Box>
                  <AccordionIcon as={ChevronRightIcon} color={colors.grayish} size='lg' />
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Modal>

    </Container>
  )
}

export default Profile

const localStyles = StyleSheet.create({

  dropdown: {
    borderRadius: moderateScale(6),
    width: '100%',
    height: moderateScale(35),
    paddingLeft: moderateScale(10),
    backgroundColor:colors.black,
    color:colors.black
    // flex: 1,
  },
  labelStyle: {
    // ...styles.mt15,
    backgroundColor:colors.black,

  },
  placeholderStyle: {
    fontSize: textScale(14),
    fontFamily: 'Roboto-Regular',
    color: colors.white,
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontSize: textScale(14),
    fontFamily: 'Roboto-Regular',
    color: colors.black,
    textAlign: 'center'
  },
  itemContainerStyle: {
    // borderBottomWidth: 1,

  },
  modalCenterView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.25
  },
  modalView: {
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(2.5),
    backgroundColor: colors.white,
    color:colors.white,
    borderRadius: responsiveWidth(5),
    width: '90%',
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveHeight(3),
    //  alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,

    },
    shadowOpacity: 0.25,
    shadowRadius: responsiveWidth(1.5),
    elevation: 5
  },
})