import { AccordionIcon, Box, ChevronDownIcon, ChevronRightIcon, Icon, Image, Pressable, Spinner, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Dropdown } from 'react-native-element-dropdown'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import Body from '../components/Body/Body'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { BackIconWhite, EditPencil, GolfIcon, MyContactIcon, MyMatchColorIcon, PrivacySettingIcon, ShareWhiteIcon, SpeedMetterIcon, ThreeDotsIcon, UserCircleIcon } from '../components/Icons'
import { Modal } from 'react-native'
import { CloseIcon } from '@gluestack-ui/themed'
import { useContext, useState } from 'react'
import { CatergoryTypes, deviceHeight } from '../constants/constant'
import { TouchableOpacity } from 'react-native'
import { NavigationString } from '../navigation/navigationStrings'
import { StyleSheet } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { imagePaths } from '../assets/images'
import useUserDashboard from '../hooks/home/get-profile'
import Share from 'react-native-share';
import { AuthContext } from '../utils/authContext'
import PrimaryButton from '../components/Button/PrimaryButton'
import useProfileUpdate from '../hooks/home/update-profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader'


const ContactUserProfile = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast()
  const route = useRoute()
  // console.log("route: ", route?.params);
  const { userId } = route?.params
  // console.log("userId: ", userId);http://localhost:5000/api/user/dashbord/67440b7c9da5ecf3e6518e08

  // console.log("userId: ", userId);


  // api
  const { data: profileData, isLoading: profileIsLoading } = useUserDashboard({ userId })
  // const { userInfo, setUserInfo }: any = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  // console.log("userInfo: ", userInfo?.userId);

  // console.log("profileData: ", profileData?.data?.data);



  // states
  const [showSettingOptionModal, setShowSettingOptionModal] = useState<any>(false)
  const [selectedCategory, setSelectedCategory] = useState<any>()


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
            </Box>
          </Box>
        </Box>
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center' >
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader/>
        </Box>
      </>
    )
  }



  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
      <Box h={moderateScale(160)} bgColor={colors.themeRed} gap={15}>
        <Box w={'100%'} flexDirection='row' alignItems='center' justifyContent='space-between' px={15} gap={20} pt={15}>
          <Pressable hitSlop={20} onPress={() => navigation.goBack()}>
            <BackIconWhite />
          </Pressable>


          <Box flexDirection='row' alignItems='center' gap={25}>
            <TouchableOpacity onPress={shareRefer}>
              <ShareWhiteIcon />
            </TouchableOpacity>
          </Box>

        </Box>

        <Box flexDirection='row' alignItems='center' gap={10} w={'100%'} px={15}>
          <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)} >
            <Image alt='icon' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} h={'100%'} w={'100%'} resizeMode='contain' />
          </Box>
          <Pressable flex={0.8}>
            <Box flexDirection='row' alignItems='center' gap={5}>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} >{profileData?.data?.data?.name ? profileData?.data?.data?.name : "Guest User"}</Text>
            </Box>
          </Pressable>
        </Box>

        <Box flexDirection='row' alignItems='center' gap={15} px={15}>
          <Box bgColor={colors.white} alignItems='center' flex={1} py={5} borderRadius={5} gap={4}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >{profileData?.data?.data?.followrs ? profileData?.data?.data?.followrs : 0}</Text>
            <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >Followers</Text>
          </Box>

          <Box bgColor={colors.white} alignItems='center' flex={1} py={5} borderRadius={5} gap={4}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >{profileData?.data?.data?.following ? profileData?.data?.data?.following : 0}</Text>
            <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >Following</Text>
          </Box>

          <Box bgColor={colors.white} alignItems='center' flex={1} py={5} borderRadius={5} gap={4}>
            {/* <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >0</Text> */}
            <MyContactIcon />
            <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >Follow</Text>
          </Box>
        </Box>
      </Box>
      <Body>


        <Box bgColor={colors.gray9} flex={1} h={'80%'} w={'100%'} px={15}>

          <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={20} >Performance History</Text>

          <Box bgColor={colors.white} w={'100%'} h={moderateScale(220)} borderRadius={10} p={10}>
            <Box flexDirection='row' alignItems='center' flex={1}>
              <Box alignItems='center' gap={8} flex={1}>
                <MyMatchColorIcon />

                <Dropdown
                  style={localStyles.dropdown}
                  placeholderStyle={localStyles.placeholderStyle}
                  selectedTextStyle={localStyles.selectedTextStyle}
                  data={profileData?.data?.data?.ctegory || []}
                  labelField="title"
                  valueField="title"
                  placeholder="Select Category"
                  value={selectedCategory?.title || "Select Category"}
                  onChange={(item) => setSelectedCategory(item)}
                  renderRightIcon={() => <Icon as={ChevronDownIcon} size="sm" mr="$2" />}
                  selectedTextProps={{ numberOfLines: 1 }}
                  renderItem={({ title }) => (<Text fontFamily="$robotoMedium" fontSize={14} lineHeight={16} numberOfLines={1} textAlign="center" style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.5), }}>{title}</Text>)}
                  itemTextStyle={localStyles.selectedTextStyle}
                  itemContainerStyle={localStyles.itemContainerStyle}
                />

                {/* <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Categories</Text> */}
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{profileData?.data?.data?.ctegory ? profileData?.data?.data?.ctegory.length : 0}</Text>
              </Box>
              <Box alignItems='center' gap={8} flex={1}>
                <GolfIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}  >Contests</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{profileData?.data?.data?.contestCount ? profileData?.data?.data?.contestCount : 0}</Text>
              </Box>
            </Box>

            <Box flexDirection='row' alignItems='center' flex={1} borderTopWidth={1} borderTopColor={colors.grayish}>
              <Box alignItems='center' gap={8} flex={1}>
                <GolfIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}  >Earn Amount</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{'\u20B9'}{profileData?.data?.data?.earnAmount ? profileData?.data?.data?.earnAmount : 0}</Text>
              </Box>
              <Box alignItems='center' gap={8} flex={1}>
                <SpeedMetterIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}  >Win Percentage</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{profileData?.data?.data?.winingPersentage ? profileData?.data?.data?.winingPersentage : 0} %</Text>
              </Box>
            </Box>


          </Box>

          <Box bgColor={colors.white} w={'100%'} h={moderateScale(40)} alignItems='center' justifyContent='center' borderRadius={10} p={10} my={moderateScaleVertical(15)}>
            <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}>Playing on WonByBid Since <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}>Jul, 2024</Text></Text>
          </Box>

          <Box w={'100%'} h={moderateScale(115)} borderRadius={moderateScale(10)} alignSelf='center'>
            <TouchableOpacity onPress={shareMessageOnWhatsapp}>
              <Image alt='icon' source={imagePaths.referBanner} resizeMode='contain' w={'100%'} h={'100%'} />
            </TouchableOpacity>
          </Box>

          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.PrivacySettings)}>
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
          </TouchableOpacity>
        </Box>
      </Body>

      <Modal animationType='slide' transparent={true} visible={showSettingOptionModal} onRequestClose={() => setShowSettingOptionModal(false)}>
        <Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor={colors.white} borderTopRightRadius={10} borderTopLeftRadius={10} w={'100%'} gap={15} py={20} h={moderateScale(180)} marginTop={deviceHeight * 0.75}>
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
                    <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1} >My Account</Text>
                  </Box>
                  <AccordionIcon as={ChevronRightIcon} color={colors.grayish} size='lg' />
                </Box>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={() => { setShowSettingOptionModal(false); navigation.navigate(NavigationString.PrivacySettings) }}>
                <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5}>
                  <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                    <PrivacySettingIcon />
                    <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1} >Privacy Settings</Text>
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

export default ContactUserProfile

const localStyles = StyleSheet.create({

  dropdown: {
    borderRadius: moderateScale(6),
    width: '100%',
    height: moderateScale(35),
    paddingLeft: moderateScale(10),
    // flex: 1,
  },
  labelStyle: {
    // ...styles.mt15,
  },
  placeholderStyle: {
    fontSize: textScale(14),
    fontFamily: 'Roboto-Regular',
    color: colors.black,
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