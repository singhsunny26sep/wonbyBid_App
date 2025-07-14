import { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  AccordionIcon,
  Box,
  Text,
  ChevronRightIcon,
  ChevronDownIcon,
  Pressable,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  Spinner,
} from '@gluestack-ui/themed';
import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Container } from '../components/Container';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import Body from '../components/Body/Body';
import { InfoCircleIcon, UserCircleIcon, UserIcon } from '../components/Icons';
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize';
import { NavigationString } from '../navigation/navigationStrings';
import useKycDetails from '../hooks/home/get-kyc-details';
import { safeMaskString } from '../utils/helper';
import Loader from '../components/Loader';

const MyAccount = () => {
  const [data, setNewData] = useState<any>();
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { data: result, isLoading, refetch } = useKycDetails();

  // console.log('data: ', result?.data?.profileDetails);
  // console.log("result?.data?.data?.user?.accountNumber: ", result?.data?.data?.user?.accountNumber);
  // console.log("isloading: ", isLoading);

  // states
  const [showProfile, setShowProfile] = useState(true);
  // console.log(showProfile, '********************');
  useFocusEffect(
    useCallback(() => {
      // This runs whenever the screen comes into focus
      refetch();
    }, [refetch]),
  );

  if (isLoading)
    return (
      <Container statusBarStyle="light-content" statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
        <AppBar title="My Account" back />
        <Box flex={1} backgroundColor="black" justifyContent="center" alignItems="center">
          <Loader />
        </Box>
      </Container>
    );
  return (
    <Container statusBarStyle="light-content" statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title="My Account" />

      <Body>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.AccountOverView)}>
          <Box flexDirection="row" alignItems="center" justifyContent="space-between" px={7} py={15} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5}>
            <Box flexDirection="row" alignItems="center" gap={moderateScale(25)}>
              <UserIcon />
              <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>Account Overview</Text>
            </Box>
            <AccordionIcon as={ChevronRightIcon} color={colors.grayish} size="lg" />
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowProfile(!showProfile)} activeOpacity={0.6}>
          <Box flexDirection="row" alignItems="center" justifyContent="space-between" px={7} py={15} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5}>
            <Box flexDirection="row" alignItems="center" gap={moderateScale(25)}><UserIcon />
              <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>Profile              </Text>
            </Box>
            <AccordionIcon as={showProfile ? ChevronDownIcon : ChevronRightIcon} color={colors.grayish} size="lg" />
          </Box>
        </TouchableOpacity>

        <Box display={showProfile ? 'flex' : 'none'} bgColor={colors.gray5} backgroundColor={colors.black} px={moderateScale(15)} py={moderateScaleVertical(10)} gap={15}>
          <Box flexDirection="row" alignItems="center" gap={moderateScale(5)}>
            <UserCircleIcon />
            <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1}>Account Details</Text>
          </Box>

          <Box borderWidth={2} borderColor={result?.data?.verificationData?.mobileVarification?.varification === 'Approve' ? colors.greenText : result?.data?.verificationData?.mobileVarification?.varification !== 'Reject' ? colors.orange : colors.red} justifyContent="center" bgColor={colors.black2} h={moderateScale(65)} borderRadius={moderateScale(10)} overflow="hidden">
            <Box bgColor={result?.data?.verificationData?.mobileVarification?.varification === 'Approve' ? colors.greenText : result?.data?.verificationData?.mobileVarification?.varification !== 'Reject' ? colors.orange : colors.red} position="absolute" right={0} px={moderateScale(10)} py={moderateScaleVertical(4)} borderBottomLeftRadius={moderateScale(10)} top={0}>
              {result?.data?.verificationData?.mobileVarification?.varification === 'Approve' ? (
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>VERIFIED</Text>
              ) : result?.data?.verificationData?.mobileVarification?.varification !== 'Reject' ? (
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>PENDING</Text>
              ) : (
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>REJECT</Text>
              )}
            </Box>

            <Box ml={moderateScale(15)} w={moderateScale(240)} gap={6}>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>Mobile</Text>
              <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>+91 {result?.data?.verificationData?.mobileVarification?.mobileNo ?? 'N/A'}</Text>
            </Box>
          </Box>

          {/* <Box borderWidth={2} borderColor={colors.mediumBlue} flexDirection='row' alignItems='center' bgColor={colors.white} h={moderateScale(65)} borderRadius={moderateScale(10)} overflow='hidden'>
            <Box ml={moderateScale(15)} w={moderateScale(230)} gap={6}>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={1}>User Name</Text>
              <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} w={moderateScale(170)} >hero8rq1so5u</Text>
            </Box>
            <Pressable onPress={() => navigation.navigate(NavigationString.ChangeUserName)} alignSelf='flex-end' mb={moderateScaleVertical(10)} ml={moderateScale(55)}>
              <Text fontFamily={'$robotoMedium'} borderBottomWidth={1} borderBottomColor={colors.mediumBlue} fontSize={12} lineHeight={14} color={colors.mediumBlue} numberOfLines={1} >Change</Text>
            </Pressable>
          </Box> */}

          <Pressable onPress={() => navigation.navigate(NavigationString.KYCVerification, { document: result?.data?.data, })}>
            <Box borderWidth={2} borderColor={result?.data?.verificationData?.kycVarification?.varification === 'Approve' ? colors.greenText : result?.data?.verificationData?.kycVarification?.varification !== 'Reject' ? colors.orange : colors.red} flexDirection="row" alignItems="center" bgColor={colors.black2} h={moderateScale(65)} borderRadius={moderateScale(10)} overflow="hidden">
              <Box bgColor={result?.data?.verificationData?.kycVarification?.varification === 'Approve' ? colors.greenText : result?.data?.verificationData?.kycVarification?.varification !== 'Reject' ? colors.orange : colors.red} position="absolute" right={0} px={moderateScale(10)} py={moderateScaleVertical(4)} borderBottomLeftRadius={moderateScale(10)} top={0}>
                {result?.data?.verificationData?.kycVarification?.varification === 'Approve' ? (
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>VERIFIED</Text>
                ) : result?.data?.verificationData?.kycVarification?.varification !== 'Reject' ? (
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>PENDING</Text>
                ) : (
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>REJECT</Text>
                )}
              </Box>

              <Box ml={moderateScale(15)} w={moderateScale(220)} gap={6}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>KYC Verification</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>
                  Documents: Pan,{' '}{result?.data?.verificationData?.kycVarification?.pancardNumber}, Aadhaar,{' '}{result?.data?.verificationData?.kycVarification?.aadharNumber}{' '}
                </Text>
              </Box>
            </Box>
          </Pressable>

          <Pressable onPress={() => navigation.navigate(NavigationString.BankVerification)}>
            <Box borderWidth={2} borderColor={result?.data?.verificationData?.bank?.varification === 'Approve' ? colors.greenText : result?.data?.verificationData?.bank?.varification !== 'Reject' ? colors.orange : colors.red} flexDirection="row" alignItems="center" bgColor={colors.black2} h={moderateScale(65)} borderRadius={moderateScale(10)} overflow="hidden">
              <Box bgColor={result?.data?.verificationData?.bank?.varification === 'Approve' ? colors.greenText : result?.data?.verificationData?.bank?.varification !== 'Reject' ? colors.orange : colors.red} position="absolute" right={0} px={moderateScale(10)} py={moderateScaleVertical(4)} borderBottomLeftRadius={moderateScale(10)} top={0}>
                {result?.data?.verificationData?.bank?.varification ===
                  'Approve' ? (
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>VERIFIED</Text>
                ) : result?.data?.verificationData?.bank?.varification !==
                  'Reject' ? (
                  <Text
                    fontFamily={'$robotoMedium'}
                    fontSize={12}
                    lineHeight={14}
                    color={colors.white}
                    numberOfLines={1}>
                    PENDING
                  </Text>
                ) : (
                  <Text
                    fontFamily={'$robotoMedium'}
                    fontSize={12}
                    lineHeight={14}
                    color={colors.white}
                    numberOfLines={1}>
                    REJECT
                  </Text>
                )}
              </Box>

              <Box ml={moderateScale(15)} w={moderateScale(220)} gap={6}>
                <Text
                  fontFamily={'$robotoMedium'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}>
                  Bank Verification
                </Text>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}>
                  {
                    result?.data?.verificationData?.bank?.accountNo
                  }
                </Text>
              </Box>
            </Box>
          </Pressable>

          <Box
            borderWidth={2}
            borderColor={
              result?.data?.verificationData?.emailVarification?.varification === 'Approve'
                ? colors.greenText
                : result?.data?.verificationData?.emailVarification?.varification !==
                  'Reject'
                  ? colors.orange
                  : colors.red
            }
            flexDirection="row"
            alignItems="center"
            bgColor={colors.black2}
            h={moderateScale(65)}
            borderRadius={moderateScale(10)}
            overflow="hidden">
            <Box
              bgColor={
                result?.data?.verificationData?.emailVarification?.varification === 'Approve'
                  ? colors.greenText
                  : result?.data?.verificationData?.emailVarification?.varification !==
                    'Reject'
                    ? colors.orange
                    : colors.red
              }
              position="absolute"
              right={0}
              px={moderateScale(10)}
              py={moderateScaleVertical(4)}
              borderBottomLeftRadius={moderateScale(10)}
              top={0}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={14}
                color={colors.white}
                numberOfLines={1}>
                PENDING
              </Text>
            </Box>

            <Box ml={moderateScale(15)} w={moderateScale(220)} gap={6}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}>
                Email ID
              </Text>

              <Text
                fontFamily={'$robotoRegular'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}
                w={moderateScale(170)}>
                {result?.data?.verificationData?.emailVarification?.email?.trim()
                  ? result?.data?.verificationData?.emailVarification?.email
                  : 'Please add email ID'}
              </Text>
            </Box>
            <Pressable
              hitSlop={15}
              onPress={() =>
                navigation.navigate(NavigationString.AddEmailAddress)
              }
              alignSelf="flex-end"
              mb={moderateScaleVertical(10)}
              ml={moderateScale(15)}>
              <Text
                fontFamily={'$robotoMedium'}
                borderBottomWidth={1}
                borderBottomColor={colors.mediumBlue}
                fontSize={12}
                lineHeight={14}
                color={colors.deepPurple}
                numberOfLines={1}>
                {result?.data?.verificationData?.emailVarification?.email ? 'Change Email' : 'Add Email'}
              </Text>
            </Pressable>
          </Box>

          {/* <PrimaryButton onPress={() => navigation.navigate(NavigationString.KYCVerification)} buttonText='KYC Verification' backgroundColor={colors.greenText} height={moderateScale(35)} /> */}

          <Box gap={10}>
            <Box
              flexDirection="row"
              alignItems="center"
              borderBottomWidth={1}
              borderBottomColor={colors.gray3}
              py={moderateScaleVertical(10)}
              gap={moderateScale(5)}>
              <InfoCircleIcon />
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={16}
                lineHeight={18}
                color={colors.white}
                numberOfLines={1}>
                Personal Information
              </Text>
            </Box>

            <Box
              borderWidth={1}
              borderColor={colors.gray6}
              bgColor={colors.black2}
              gap={4}
              px={moderateScale(10)}
              py={moderateScaleVertical(10)}
              borderRadius={moderateScale(10)}>
              <Box flexDirection="row" alignItems="center" gap={6} py={4}>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={0.35}>
                  Name
                </Text>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={1}>
                  : {result?.data?.profileDetails?.name}
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center" gap={6} py={4}>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={0.35}>
                  Date of Birth
                </Text>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={1}>
                  : {result?.data?.profileDetails?.dob}
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center" gap={6} py={4}>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={0.61}>
                  Pincode
                </Text>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={1}>
                  {'    '}
                  : {result?.data?.profileDetails?.pinCode}
                </Text>
                <Pressable
                  hitSlop={15}
                  onPress={() =>
                    navigation.navigate(NavigationString.AddAddressDetails)
                  }>
                  <Text
                    fontFamily={'$robotoMedium'}
                    fontSize={14}
                    lineHeight={16}
                    color={colors.deepPurple}
                    numberOfLines={1}>
                    Add Address Details
                  </Text>
                </Pressable>
              </Box>

              <Box flexDirection="row" alignItems="center" gap={6} py={4}>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={0.35}>
                  Location
                </Text>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={1}>
                  : {result?.data?.profileDetails?.address}
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center" gap={6} py={4}>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={0.35}>
                  City
                </Text>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={1}>
                  : {result?.data?.profileDetails?.city}
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center" gap={6} py={4}>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={0.35}>
                  State
                </Text>
                <Text
                  fontFamily={'$robotoRegular'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}
                  flex={1}>
                  : {result?.data?.profileDetails?.state}
                </Text>
              </Box>
            </Box>
          </Box>

          <Pressable
            onPress={() => setShowProfile(false)}
            flexDirection="row"
            alignItems="center"
            gap={5}
            alignSelf="center">
            <Text
              fontFamily={'$robotoMedium'}
              fontSize={14}
              lineHeight={16}
              color={colors.mediumBlue}
              numberOfLines={1}>
              Show Less
            </Text>
            <AccordionIcon
              as={ChevronUpIcon}
              color={colors.grayish}
              size="lg"
            />
          </Pressable>
        </Box>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(NavigationString.CashWithdraw)}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            px={7}
            py={15}
            borderBottomWidth={1}
            mx={8}
            borderBottomColor={colors.gray5}>
            <Box
              flexDirection="row"
              alignItems="center"
              gap={moderateScale(25)}>
              <UserIcon />
              <Text
                fontFamily={'$robotoRegular'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}>
                Withdraw Cash
              </Text>
            </Box>
            <AccordionIcon
              as={ChevronRightIcon}
              color={colors.grayish}
              size="lg"
            />
          </Box>
        </TouchableOpacity>

        {/* <TouchableOpacity activeOpacity={0.6}>
          <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5}>
            <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
              <UserIcon />
              <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1} >Other details</Text>
            </Box>
            <AccordionIcon as={ChevronRightIcon} color={colors.grayish} size='lg' />
          </Box>
        </TouchableOpacity> */}
      </Body>
    </Container>
  );
};

export default MyAccount;
