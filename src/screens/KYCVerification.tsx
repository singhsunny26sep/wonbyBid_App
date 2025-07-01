import {
  Box,
  CloseIcon,
  Text,
  Icon,
  useToast,
  Toast,
  ToastTitle,
  Image,
} from '@gluestack-ui/themed';

import {Container} from '../components/Container';
import {AppBar} from '../components/AppBar';
import {colors} from '../constants/colors';
import {moderateScale, moderateScaleVertical} from '../utils/responsiveSize';
import {useRef, useState} from 'react';
import {Pressable} from '@gluestack-ui/themed';
import PrimaryButton from '../components/Button/PrimaryButton';
import {Input} from '@gluestack-ui/themed';
import {InputField} from '@gluestack-ui/themed';
import {CameraIconBig, ImageIcon, UploadPlusIcon} from '../components/Icons';
import {Animated, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {uploadImageToCloudinary} from '../utils/Cloudinary';
import {Spinner} from '@gluestack-ui/themed';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useKycUpdateDetails from '../hooks/home/update-kyc-details';
import useKycDetails from '../hooks/home/get-kyc-details';

const KYCVerification = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {data: result} = useKycDetails();
  const toast = useToast();

  const updateKyc = useKycUpdateDetails();

  // console.log("result: ", result?.data?.data);

  // states
  const [selectedUplaodIdProof, setSelectedUplaodIdProof] = useState(false);
  const [adharNo, setAdharNo] = useState<Number | any>(
    result?.data?.verificationData?.kycVarification?.aadharNumber
      ? result?.data?.verificationData?.kycVarification?.aadharNumber.toString()
      : '',
  );
  const [panNo, setPanNo] = useState<string | any>(
    result?.data?.verificationData?.kycVarification?.pancardNumber
      ? result?.data?.verificationData?.kycVarification.pancardNumber
      : '',
  );
  const [adharImage, setAdharImage] = useState<string | any>(
    result?.data?.verificationData?.aadhar_photo
      ? result?.data?.verificationData?.aadhar_photo
      : '',
  );
  const [panImage, setPanImage] = useState<string | any>(
    result?.data?.verificationData?.pancard_photo
      ? result?.data?.verificationData?.pancard_photo
      : '',
  );

  // loading
  const [adharLoading, setAdharLoading] = useState<boolean>(false);
  const [panLoading, setPanLoading] = useState<boolean>(false);

  const [type, setType] = useState<string>('adhar');

  const actionSheetRef: any = useRef<ActionSheetRef>(null);

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const hideActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleAnimation = () => {
    setSelectedUplaodIdProof(!selectedUplaodIdProof);

    Animated.timing(animatedHeight, {
      toValue: selectedUplaodIdProof ? 0 : moderateScale(120),
      duration: 600, // Adjust duration for smoothness
      useNativeDriver: false,
    }).start();
  };

  const pickImage = async () => {
    try {
      if (type == 'adhar') {
        setAdharLoading(true);
      }
      if (type == 'pan') {
        setPanLoading(true);
      }
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.5,
      });

      // setImage(image.path);
      const url = await uploadImageToCloudinary(image?.path);
      if (type == 'adhar') {
        setAdharImage(url);
        setAdharLoading(false);
      }
      if (type == 'pan') {
        setPanImage(url);
        setPanLoading(false);
      }

      hideActionSheet();
    } catch (error: any) {
      hideActionSheet();
      setPanLoading(false);
      setAdharLoading(false);
      console.log('Error on openCamera:', error);
    }
  };

  const openCamera = async () => {
    try {
      if (type == 'adhar') {
        setAdharLoading(true);
      }
      if (type == 'pan') {
        setPanLoading(true);
      }
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.5,
      });

      const url = await uploadImageToCloudinary(image?.path);
      if (type == 'adhar') {
        setAdharImage(url);
        setAdharLoading(false);
      }
      if (type == 'pan') {
        setPanImage(url);
        setPanLoading(false);
      }

      hideActionSheet();
    } catch (error: any) {
      hideActionSheet();
      setPanLoading(false);
      setAdharLoading(false);
      console.log('Error on openCamera:', error);
    }
  };

  console.log(result?.data?.verificationData);

  const handlSubmit = async () => {
    updateKyc?.mutate(
      {
        pancardNumber: panNo,
        aadharNumber: adharNo,
        aadhar_photo: adharImage,
        pancard_photo: panImage,
      },
      {
        onSuccess: data => {
          // console.log("data response: ", data?.data?.message);

          if (data?.data?.success) {
            // Update only the name field in userInfo
            // updateUserName(data?.data?.data?.name, data?.data?.data?.profile);

            toast.show({
              placement: 'bottom',
              render: ({id}) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="success">
                    <ToastTitle>User KYC Updated Successfully.</ToastTitle>
                  </Toast>
                );
              },
            });
          } else {
            toast.show({
              placement: 'bottom',
              render: ({id}) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="error">
                    <ToastTitle>{data?.data?.message}</ToastTitle>
                  </Toast>
                );
              },
            });
          }
        },
      },
    );
  };

  // console.log("adhar image: ", adharImage);
  // console.log("adhar pan: ", panImage);
  // console.log("isLoading: ", isLoading);

  /* if (isLoading) return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white}>
      <AppBar title='' back />
      <Box flex={1} justifyContent='center' alignItems='center' >
        <Spinner size={'large'} color={colors.themeRed} />
      </Box>
    </Container>
  ) */

  return (
    <Container
      statusBarStyle="light-content"
      statusBarBackgroundColor={colors.themeRed}
      backgroundColor={colors.black}>
      <AppBar back title="KYC Verification" />

      <Box
        mx={moderateScale(15)}
        my={moderateScaleVertical(20)}
        gap={moderateScale(6)}>
        <Text
          fontFamily="$robotoBold"
          fontSize={16}
          lineHeight={18}
          color={colors.white}
          numberOfLines={1}>
          Complete KYC Verification
        </Text>
        <Text
          fontFamily="$robotoMedium"
          fontSize={14}
          lineHeight={16}
          color={colors.white}
          numberOfLines={1}>
          Select an option to proceed
        </Text>
      </Box>

      <Box gap={moderateScale(10)}>
        {/* <Box borderWidth={2} borderColor={selectedRadio === `aadhaar` ? colors.greenText : colors.gray8} mx={moderateScale(15)} justifyContent='center' bgColor={colors.white} h={moderateScale(65)} borderRadius={moderateScale(10)} overflow='hidden'>
          <Box bgColor={colors.greenText} position='absolute' right={0} px={moderateScale(10)} py={moderateScaleVertical(4)} borderBottomLeftRadius={moderateScale(10)} top={0}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>take less tah 2 mins</Text>
          </Box>

          <Box flexDirection='row' alignItems='center' ml={moderateScale(15)} gap={moderateScale(10)}>
            <Pressable onPress={() => { setSelectedRadio('aadhaar') }} h={moderateScale(20)} w={moderateScale(20)} borderWidth={2} borderRadius={moderateScale(10)} borderColor={colors.gray4} alignItems='center' justifyContent='center'>
              <Box h={moderateScale(15)} w={moderateScale(15)} borderRadius={moderateScale(10)} bgColor={selectedRadio === `aadhaar` ? colors.greenText : 'transparent'}>
              </Box>
            </Pressable>

            <Box w={moderateScale(240)} gap={6}>
              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}>Aadhaar Number with OTP</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1}>Verify via phone number linked with Aadhaar</Text>
            </Box>
          </Box>
        </Box> */}
        <Box
          mx={moderateScale(20)}
          mb={moderateScaleVertical(15)}
          w={moderateScale(220)}
          gap={moderateScale(20)}>
          <Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            $focus-borderColor={colors.themeRed}>
            <InputField
              fontFamily="$robotoMedium"
              fontSize={14}
              placeholder="Enter Pan Card Number *"
              autoCapitalize="characters"
              color={colors.white}
              placeholderTextColor={colors.placeHolderColor}
              onChangeText={e => setPanNo(e)}
              value={panNo}
              maxLength={10}
            />
            {/*  e.g. AAAA1111A  */}
          </Input>

          <Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            $focus-borderColor={colors.white}>
            <InputField
              fontFamily="$robotoMedium"
              fontSize={14}
              placeholder="Enter Aadhar Number *"
              keyboardType="numeric"
              maxLength={12}
              placeholderTextColor={colors.placeHolderColor}
              onChangeText={e => setAdharNo(e)}
              color={colors.white}
              value={adharNo}
            />
          </Input>
        </Box>
        {/* <Pressable onPress={() => { setSelectedUplaodIdProof(!selectedUplaodIdProof) }}> */}
        <Pressable onPress={toggleAnimation}>
          <Box
            borderEndWidth={2}
            borderColor={selectedUplaodIdProof ? colors.greenText : colors.gold}
            mx={moderateScale(15)}
            justifyContent="center"
            bgColor={colors.black}
            h={moderateScale(65)}
            borderRadius={moderateScale(10)}
            overflow="hidden">
            <Box
              flexDirection="row"
              alignItems="center"
              ml={moderateScale(15)}
              gap={moderateScale(10)}>
              <Pressable
                h={moderateScale(20)}
                w={moderateScale(20)}
                borderWidth={2}
                borderRadius={moderateScale(10)}
                borderColor={colors.gray4}
                alignItems="center"
                justifyContent="center">
                <Box
                  h={moderateScale(15)}
                  w={moderateScale(15)}
                  borderRadius={moderateScale(10)}
                  bgColor={
                    selectedUplaodIdProof ? colors.greenText : 'transparent'
                  }></Box>
              </Pressable>

              <Box w={moderateScale(270)} gap={6}>
                <Text
                  fontFamily={'$robotoBold'}
                  fontSize={14}
                  lineHeight={16}
                  color={colors.white}
                  numberOfLines={1}>
                  Upload ID Proof
                </Text>
                <Text
                  fontFamily={'$robotoMedium'}
                  fontSize={12}
                  lineHeight={14}
                  color={colors.white}
                  numberOfLines={2}>
                  Valid ID Proofs: Aadhaar Card
                </Text>
              </Box>
            </Box>
          </Box>
        </Pressable>
        <Animated.View
          style={{
            height: animatedHeight,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(15),
            marginHorizontal: moderateScale(15),
            marginTop: moderateScaleVertical(15),
          }}>
          {/* adhar */}
          {panLoading ? (
            <Spinner
              size={'large'}
              color={colors.themeRed}
              h={moderateScale(120)}
              w={'49%'}
              borderRadius={moderateScale(10)}
              borderWidth={1}
              borderColor={colors.gray3}
            />
          ) : (
            <Pressable
              onPress={() => {
                showActionSheet();
                setType('pan');
              }}
              alignItems="center"
              justifyContent="center"
              borderWidth={1}
              borderColor={colors.gray3}
              flex={1}
              gap={moderateScale(15)}
              h={moderateScale(120)}
              borderRadius={moderateScale(10)}>
              {panImage ? (
                <>
                  <Image
                    source={{uri: panImage}}
                    alt="pan card"
                    w={'90%'}
                    h={'90%'}
                    resizeMode="contain"
                    alignSelf="center"
                  />
                </>
              ) : (
                <>
                  <UploadPlusIcon />
                  <Text
                    fontFamily={'$robotoMedium'}
                    fontSize={14}
                    lineHeight={16}
                    color={colors.white}
                    numberOfLines={2}>
                    Upload Pan
                  </Text>
                </>
              )}
            </Pressable>
          )}

          {/* pan card */}
          {adharLoading ? (
            <Spinner
              size={'large'}
              color={colors.gold}
              h={moderateScale(120)}
              w={'49%'}
              borderRadius={moderateScale(10)}
              borderWidth={1}
              borderColor={colors.gray3}
            />
          ) : (
            <Pressable
              onPress={() => {
                showActionSheet();
                setType('adhar');
              }}
              alignItems="center"
              justifyContent="center"
              borderWidth={1}
              borderColor={colors.gray3}
              flex={1}
              gap={moderateScale(15)}
              h={moderateScale(120)}
              borderRadius={moderateScale(10)}>
              {adharImage ? (
                <>
                  <Image
                    source={{uri: adharImage}}
                    alt="pan card"
                    w={'90%'}
                    h={'90%'}
                    resizeMode="cover"
                    alignSelf="center"
                  />
                </>
              ) : (
                <>
                  <UploadPlusIcon />
                  <Text
                    fontFamily={'$robotoMedium'}
                    fontSize={14}
                    lineHeight={16}
                    color={colors.white}
                    numberOfLines={2}>
                    Upload Aadhar
                  </Text>
                </>
              )}
            </Pressable>
          )}
        </Animated.View>
      </Box>

      <PrimaryButton
        backgroundColor={colors.Purple}
        onPress={handlSubmit}
        buttonText="Continue"
        height={moderateScale(45)}
        marginHorizontal={moderateScale(15)}
        marginTop={moderateScaleVertical(100)}
        loading={updateKyc?.isPending}
        disabled={updateKyc?.isPending}
      />

      <ActionSheet ref={actionSheetRef}>
        <Box
          w={'100%'}
          h={moderateScale(20)}
          display="flex"
          flexDirection="row">
          {/* <Box> */}
          <Text
            fontFamily={'$robotoMedium'}
            fontSize={12}
            lineHeight={14}
            mt={moderateScale(8)}
            ml={moderateScale(8)}
            textTransform="capitalize"
            color={colors.gray4}
            numberOfLines={2}>
            {type}
          </Text>
          {/* </Box> */}
          <Box flex={1} />
          <TouchableOpacity
            hitSlop={20}
            onPress={hideActionSheet}
            style={{
              marginRight: moderateScale(8),
              marginTop: moderateScale(8),
            }}>
            <Icon as={CloseIcon} size="lg" color={colors.grayish} />
          </TouchableOpacity>
        </Box>

        <Box
          w={'100%'}
          h={moderateScale(150)}
          display="flex"
          flexDirection="row">
          <Box flex={1} alignItems="center" justifyContent="center">
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={pickImage}>
              <ImageIcon />
              <Text
                fontFamily={'$robotoBold'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}
                py={20}>
                Choose From Gallery
              </Text>
            </TouchableOpacity>
          </Box>
          <Box flex={1} alignItems="center" justifyContent="center">
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={openCamera}>
              <CameraIconBig />
              <Text
                fontFamily={'$robotoBold'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}
                py={20}>
                Open Camera
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ActionSheet>
    </Container>
  );
};

export default KYCVerification;
