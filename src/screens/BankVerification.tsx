import { useState } from 'react'
import { Box, Input, InputField, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { Pressable } from '@gluestack-ui/themed'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import PrimaryButton from '../components/Button/PrimaryButton'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useBankDetails from '../hooks/home/get-kyc-details'
import useBankKyc from '../hooks/home/bank-kyc'

const BankVerification = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { data: result, isLoading, isError, error } = useBankDetails()
  const toast = useToast()

  const updateKyc = useBankKyc()

  // console.log("result: ", result?.data?.data);

  // state
  // const [selectedSearchOption, setSelectedSearchOption] = useState('ifsc')
  const [accountNumber, setAccountNumber] = useState<number | any>(result?.data?.data?.enterAccountNumber ? result?.data?.data?.enterAccountNumber.toString() : '')
  const [confirmaccountNumber, setConfirmaccountNumber] = useState<string | any>(result?.data?.data?.enterAccountNumber ? result?.data?.data?.enterAccountNumber.toString() : '')
  const [bankName, setBankName] = useState<string | any>(result?.data?.data?.enterBankName ? result?.data?.data?.enterBankName : '')
  const [branchName, setBranchName] = useState<string | any>('')
  const [ifscCode, setIFSCCode] = useState<string | any>(result?.data?.data?.enterIFSCCode ? result?.data?.data?.enterIFSCCode : '')
  const [upiId, setUpiId] = useState<string | any>(result?.data?.data?.enterUpiId ? result?.data?.data?.enterUpiId : '')

  // console.log(result?.data?.data)
  const handlSubmit = async () => {
    if (!accountNumber || !confirmaccountNumber || !bankName || !ifscCode || !upiId) {
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
    if (accountNumber !== confirmaccountNumber) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>A/C Numbers and Confirm A/C Number do not match.</ToastTitle>
            </Toast>
          );
        },
      });
      return;
    }
    updateKyc?.mutate({ enterAccountNumber: accountNumber, enterBankName: bankName, enterIFSCCode: ifscCode, enterUpiId: upiId }, {
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
                  <ToastTitle>User Bank KYC Updated Successfully.</ToastTitle>
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
      <AppBar back title='Bank Verification' />
      <Box overflow='hidden' mx={moderateScale(10)} my={moderateScaleVertical(15)} borderEndWidth={1} borderColor={colors.gold} borderRadius={moderateScale(10)}>
        <Box bgColor='black' py={moderateScaleVertical(10)} px={moderateScale(10)}>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Bank details</Text>
        </Box>

        <Box mx={moderateScale(15)} my={moderateScaleVertical(15)} w={moderateScale(240)} gap={moderateScale(10)}>
          <Input marginBottom={5} variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Enter Account Number *" keyboardType="numeric" placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setAccountNumber(e)} value={accountNumber} />
          </Input>

          <Input marginBottom={5} variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Re-Enter Account Number *" keyboardType="numeric" placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setConfirmaccountNumber(e)} value={confirmaccountNumber} />
          </Input>

          <Input marginBottom={5} variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily="$robotoMedium" fontSize={14} placeholder="ENTER BANK NAME *" placeholderTextColor={colors.placeHolderColor} autoCapitalize="characters" style={{ textTransform: 'uppercase', paddingRight: 10, }} onChangeText={(e) => setBankName(e.toUpperCase())} value={bankName} />
          </Input>
          
          <Input marginBottom={5} variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Enter IFSC Code *" placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setIFSCCode(e)} value={ifscCode} />
          </Input>

          <Input marginBottom={5} variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Enter UPI Id *" autoCapitalize='none' placeholderTextColor={colors.placeHolderColor} onChangeText={(e) => setUpiId(e)} value={upiId} />
          </Input>
        </Box>

        {/* <Box mx={moderateScale(5)} borderWidth={1} borderColor={colors.gray3} borderRadius={moderateScale(10)} overflow='hidden' my={moderateScaleVertical(10)}>
              <Box flexDirection='row' alignItems='center'>
                <Pressable onPress={() => setSelectedSearchOption('ifsc')} flex={1} borderBottomWidth={selectedSearchOption === 'ifsc' ? 2 : 0} borderBottomColor={'rgb(182,117,115)'} alignItems='center' backgroundColor={colors.paleGray} py={moderateScaleVertical(10)}>
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} >IFSC</Text>
                </Pressable>

              </Box>

              <Box display={selectedSearchOption === 'ifsc' ? 'flex' : 'none'} flexDirection='row' alignItems='center'>
                <Box mx={moderateScale(15)} my={moderateScaleVertical(15)} w={moderateScale(160)} gap={moderateScale(10)}>
                  <Input
                    variant="underlined"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    $focus-borderColor={colors.themeRed}

                  >
                    <InputField fontFamily='$robotoMedium' fontSize={14} placeholder="IFSC Code *" placeholderTextColor={colors.placeHolderColor} />

                  </Input>
                </Box>

                <PrimaryButton buttonText='Search' backgroundColor={'rgb(130,170,22)'} marginLeft={moderateScale(30)} height={moderateScale(30)} />
              </Box>
            </Box> */}
      </Box>

      <PrimaryButton onPress={handlSubmit} loading={updateKyc?.isPending} disabled={updateKyc?.isPending} buttonText='Submit' backgroundColor={colors.Purple} height={moderateScale(45)} marginTop={28} marginHorizontal={moderateScale(20)} />
    </Container>
  )
}

export default BankVerification



