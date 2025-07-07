import { useState } from 'react'
import { TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Box, Input, Text, InputField, Pressable, useToast, Toast } from '@gluestack-ui/themed'
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { format, parse } from 'date-fns';

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import Body from '../components/Body/Body'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import PrimaryButton from '../components/Button/PrimaryButton'
import { deviceHeight, shadowStyle } from '../constants/constant';
import usePersonalInfo from '../hooks/home/usePersonal-info';
import useKycDetails from '../hooks/home/get-kyc-details';
import { ToastTitle } from '@gluestack-ui/themed';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const AddAddressDetails = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { data: result, isLoading } = useKycDetails()
  const toast = useToast()
  const updateKyc = usePersonalInfo()
  const profileDetails = result?.data?.profileDetails


  // state
  const [focusDob, setFocusDob] = useState<boolean>(false)
  const [datePickerModel, setDatePickerModel] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<string | any>(profileDetails?.dob ? profileDetails?.dob : '')
  const [fullName, setFullName] = useState<string | any>(profileDetails?.name ? profileDetails?.name : '')
  const [pincode, setPincode] = useState<number | any>(profileDetails?.pinCode ? profileDetails?.pinCode : '')
  const [address, setAddress] = useState<string | any>(profileDetails?.address ? profileDetails?.address : '')
  const [city, setCity] = useState<string | any>(profileDetails?.city ? profileDetails?.city : '')
  const [state, setState] = useState<string | any>(profileDetails?.state ? profileDetails?.state : '')


  const handlSubmit = async () => {
    if (!selectedDate || !fullName || !pincode || !address || !city || !state) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>All fields are required.</ToastTitle>
            </Toast>
          );
        },
      });
      return
    }
    updateKyc?.mutate({ selectedDate, fullName, pincode, address, city, state, dob: selectedDate }, {
      onSuccess: (data) => {
        // console.log("data response: ", data?.data?.message);

        if (data?.data?.success) {
          // Update only the name field in userInfo
          // updateUserName(data?.data?.data?.name, data?.data?.data?.profile);
          navigation.goBack()
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>User Personal Information KYC Updated Successfully.</ToastTitle>
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
    })
  }



  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title='Personal Information' />
      <Body>
        <Box mb={moderateScaleVertical(25)} mt={moderateScaleVertical(50)} gap={moderateScale(13)} alignItems='center'>
          <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.white} numberOfLines={1} >Play Responsibly!</Text>
          <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={2} textAlign='center' w={moderateScale(320)}>To continue playing cash games, you need to provide Address details</Text>
        </Box>

        <Box mx={moderateScale(30)} gap={moderateScale(20)}>
          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed} >
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Full Name *"
              placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setFullName(e)} value={fullName} />
          </Input>

          <Box flexDirection='row' alignItems='center' gap={moderateScale(10)}>
            <Pressable onPress={() => { setFocusDob(!focusDob); setDatePickerModel(true) }} flex={1} borderWidth={1} borderColor={focusDob ? colors.themeRed : colors.gray3} pl={moderateScale(15)} h={moderateScale(38)} borderRadius={moderateScale(5)} justifyContent='center'>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={!!selectedDate ? colors.white : colors.placeHolderColor} numberOfLines={1} >{!!selectedDate ? selectedDate : 'Date of Birth *'}</Text>
            </Pressable>


            <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed} flex={1}>
              <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Pincode *" placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setPincode(e)} value={pincode} />
            </Input>
          </Box>

          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Address *" placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setAddress(e)} value={address} />
          </Input>

          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="State *" placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setState(e)} value={state} />
          </Input>

          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="City *" placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setCity(e)} value={city} />
          </Input>

          <PrimaryButton buttonText='Submit' onPress={handlSubmit} marginTop={24} loading={updateKyc?.isPending} disabled={updateKyc?.isPending} textColor={colors.white} fontSize={18} backgroundColor={colors.Purple} height={moderateScale(35)} elevation={5} />
        </Box>
      </Body>

      <Modal animationType='slide' transparent={true} visible={datePickerModel}>

        <Box style={localStyles.modalCenterView} >
          <Box style={localStyles.modalView}>
            <DatePicker mode='calendar' options={{ mainColor: colors.themeRed, }} selected={selectedDate}
              onDateChange={(propDate: any) => {
                const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date())
                setSelectedDate(format(parsedDate, 'yyyy-MM-dd'))
              }}
            />
            <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
              <TouchableOpacity activeOpacity={0.6} onPress={() => { setFocusDob(false); setDatePickerModel(false); }} >
                <Text style={{ color: colors.black, fontSize: textScale(12), fontFamily: 'Roboto-medium' }} >Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setFocusDob(false); setDatePickerModel(false) }} style={{ backgroundColor: colors.themeRed, paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(2) }} >
                <Text style={{ color: colors.white, fontSize: textScale(14), fontFamily: 'Roboto-medium' }} >Done</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}

export default AddAddressDetails

const localStyles = StyleSheet.create({

  dropdown: {
    borderRadius: moderateScale(6),
    height: moderateScale(50),
    backgroundColor: colors.paleGray,
    marginTop: moderateScaleVertical(10),
    paddingLeft: moderateScale(10),
    flex: 1,
  },
  labelStyle: {
    // ...styles.mt15,
  },
  placeholderStyle: {
    fontSize: textScale(12),
    fontFamily: 'Roboto-Medium',
    color: colors.grayish,
  },
  selectedTextStyle: {
    // ...typography.fontSizes.f12,
    // ...typography.fontWeights.Medium,
    // color: colors.black,
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