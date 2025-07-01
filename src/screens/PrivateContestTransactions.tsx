import { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Box, ChevronDownIcon, Text, Icon, Input, InputField, useToast, ToastTitle } from '@gluestack-ui/themed'
import { Dropdown } from 'react-native-element-dropdown'
import { Pressable } from '@gluestack-ui/themed'
import { Modal } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { CloseIcon } from '@gluestack-ui/themed'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { deviceHeight, formatAmount, privateContestTransactionTypes } from '../constants/constant'
import PrimaryButton from '../components/Button/PrimaryButton'
import useKycDetails from '../hooks/home/get-kyc-details'
import useGetUserWalletInfo from '../hooks/auth/get-user-wallet-info'
import { Toast } from '@gluestack-ui/themed'

const TransactionCard = ({ item, index }: { item: any, index: number }) => {
  return (
    <Box backgroundColor="black" py={moderateScaleVertical(10)} px={moderateScale(10)} borderRadius={moderateScale(5)} borderRightWidth={2} borderLeftWidth={2} borderTopRightRadius={moderateScale(10)} borderBottomRightRadius={moderateScale(10)} borderTopLeftRadius={moderateScale(15)} borderBottomLeftRadius={moderateScale(15)} borderColor="white" gap={moderateScale(5)}>
      {/* <Box borderWidth={1} borderColor={colors.gray3} py={moderateScaleVertical(10)} px={moderateScale(10)} borderRadius={moderateScale(5)} gap={moderateScale(5)}> */}
      <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Date & Time</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Aug 01,07:47 PM</Text>
      </Box>

      <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} alignSelf='flex-start'>Description</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={3} >Commission for Private Contest</Text>
      </Box>

      <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Transaction Amount</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >{'\u20B9'}50</Text>
      </Box>

      {/* <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Net Balance</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >{'\u20B9'}50</Text>
      </Box> */}

      <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Winning Balance</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >{'\u20B9'}0</Text>
      </Box>
    </Box>
  )
}

const PrivateContestTransactions = () => {
  const toast = useToast()
  // api
  const { data: result, isLoading, isError, error } = useKycDetails()
  const { data: walletInfoData, isLoading: walletInfoIsLoading } = useGetUserWalletInfo()


  // states
  const [selectedTransactionType, setSelectedTransactionType] = useState<string>('')
  const [showWidthdrawModal, setShowWidthdrawModal] = useState(false)
  const [amountWithdrawConfirm, setamountWithdrawConfirm] = useState(false)
  const [enterAmount, setEnterAmount] = useState('')

  const gstAmount = Number(enterAmount) * 0.10;

  // Subtract GST from the original amount
  const amountAfterGst = Number(enterAmount) - gstAmount;

  const showTost = async (msg: any) => {
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id
        return (
          <Toast nativeID={toastId} variant="accent" action="error">
            <ToastTitle>{msg}</ToastTitle>
          </Toast>
        );

      },
    })
  }

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar textColor={colors.gold} back title='Private Contest Transactions' />
      {/* <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(15)} py={moderateScaleVertical(10)} borderBottomColor={colors.gray3} mt={moderateScaleVertical(10)}>
        <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.Purple} numberOfLines={1} >Private Contest Transactions</Text>
      </Box> */}

      <Box flexDirection='row' alignItems='center' marginTop={10} justifyContent='center' bgColor={colors.paleGray} gap={10} borderWidth={1} borderColor={colors.grayish} borderRadius={moderateScale(5)} py={moderateScaleVertical(8)} mx={moderateScale(15)}>
        <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} fontWeight='800' numberOfLines={1} >Private Contest Winning Balance: </Text>
        <Text fontWeight='800' fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{'\u20B9'}{formatAmount(walletInfoData?.data?.newBalance?.winningbalance) ?? '0'}</Text>

      </Box>


      <Box mx={moderateScale(15)} mb={moderateScaleVertical(5)}>
        <Dropdown
          style={localStyles.dropdown}
          placeholderStyle={localStyles.placeholderStyle}
          selectedTextStyle={localStyles.selectedTextStyle}
          data={privateContestTransactionTypes}
          labelField="label"
          valueField="value"
          placeholder={'Select Transaction Type'}
          // value={formik.values.bookingfor}
          onChange={(item: any) => { setSelectedTransactionType(item) }}
          renderRightIcon={() => <Icon as={ChevronDownIcon} size="sm" mr='$2' color="white" />}

          selectedTextProps={{ numberOfLines: 1 }}
          renderItem={(item) => { return (<Text backgroundColor={colors.black} color='white' fontFamily='$robotoMedium' fontSize={12} lineHeight={16} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.5) }} >{item?.label}</Text>) }}
          itemTextStyle={localStyles.selectedTextStyle}
          itemContainerStyle={localStyles.itemContainerStyle}
        />
      </Box>

      <FlatList
        data={['01', '02', '03', '04', '05', '06']}
        renderItem={({ item, index }: { item: any, index: number }) => <TransactionCard key={item} item={item} index={index} />}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        style={{}}
        contentContainerStyle={{ marginHorizontal: moderateScale(15), gap: moderateScale(15), marginTop: moderateScaleVertical() }}
      />

      {/* {result?.data?.data?.user?.bankKYC && result?.data?.data?.documentKYC && result?.data?.data?.addressKyc ? <PrimaryButton onPress={() => setShowWidthdrawModal(true)} buttonText='Widthdraw' backgroundColor={'rgb(130,170,22)'} height={moderateScale(40)} width={"80%"} alignSelf='center' marginBottom={moderateScaleVertical(10)} /> :
        <PrimaryButton onPress={() => showTost("KYC is pending! Please complete KYC to withraw")} buttonText='Widthdraw' backgroundColor={'rgb(130,170,22)'} height={moderateScale(40)} width={"80%"} alignSelf='center' marginBottom={moderateScaleVertical(10)} />
      } */}


      <Modal animationType='slide' transparent={true} visible={showWidthdrawModal} onRequestClose={() => setShowWidthdrawModal(false)}>
        <Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)' alignItems='center' justifyContent='center'>
          <Box backgroundColor={colors.white} borderRadius={10} w={'90%'} gap={15} py={20} h={moderateScale(260)} >
            <Box flexDirection='row' justifyContent='flex-end' alignItems='center' px={15}>
              <Pressable hitSlop={20} onPress={() => { setShowWidthdrawModal(false); setEnterAmount('') }}>
                <Icon as={CloseIcon} size="lg" color={colors.grayish} />
              </Pressable>
            </Box>

            <Box mx={moderateScale(10)}>
              <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={16} color={colors.white} numberOfLines={1} >Withdraw Amount</Text>

              <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
                <InputField value={enterAmount} onChangeText={(t) => setEnterAmount(t)} fontFamily='$robotoMedium' fontSize={14} placeholder="Enter Amount *" placeholderTextColor={colors.placeHolderColor} />
              </Input>
              <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} textAlign='center' mt={moderateScaleVertical(10)} >Govt policy: 10% Tax will apply on 'Hostings'</Text>
            </Box>

            <Box display={!!enterAmount ? 'flex' : 'none'} mx={moderateScale(10)} gap={moderateScaleVertical(5)}>

              <Box flexDirection='row' alignItems='center' >
                <Text flex={1} fontFamily={'$robotoSemiBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Winning Balance :</Text>
                <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >{'\u20B9'} {enterAmount}</Text>
              </Box>

              <Box flexDirection='row' alignItems='center' >
                <Text flex={1} fontFamily={'$robotoSemiBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >10% TDS :</Text>
                <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >{'\u20B9'} {gstAmount}</Text>
              </Box>

              <Box flexDirection='row' alignItems='center' >
                <Text flex={1} fontFamily={'$robotoSemiBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Withdrawable Balance:</Text>
                <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >{'\u20B9'} {amountAfterGst}</Text>
              </Box>

            </Box>

            <PrimaryButton buttonText='Submit' onPress={() => { }} backgroundColor={'rgb(130,170,22)'} height={moderateScale(30)} width={moderateScale(140)} alignSelf='center' marginTop={moderateScaleVertical(5)} />


          </Box>
        </Box>
      </Modal>

    </Container>
  )
}

export default PrivateContestTransactions

const localStyles = StyleSheet.create({

  dropdown: {
    borderRadius: moderateScale(6),
    height: moderateScale(30),
    // backgroundColor: colors.black,
    marginTop: moderateScaleVertical(10),
    paddingLeft: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grayish,

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
    fontSize: textScale(12),
    fontFamily: 'Roboto-Medium',
    color: colors.white,
    backgroundColor: colors.black
    // ...typography.fontSizes.f12,
    // ...typography.fontWeights.Medium,
    // color: colors.black,

  },
  itemContainerStyle: {
    // borderBottomWidth: 1,
  },

})