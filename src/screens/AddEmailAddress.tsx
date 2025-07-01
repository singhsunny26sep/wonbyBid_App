
import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { Box, Input, InputField, Text, ToastTitle } from '@gluestack-ui/themed'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import PrimaryButton from '../components/Button/PrimaryButton'
import useKycDetails from '../hooks/home/get-kyc-details'
import { useState } from 'react'
import { useToast } from '@gluestack-ui/themed'
import useEmailKyc from '../hooks/home/useEmailKyc'
import { Toast } from '@gluestack-ui/themed'

const AddEmailAddress = () => {

  const { data: result, isLoading } = useKycDetails()
  const toast = useToast()
  const updateKyc = useEmailKyc()

  console.log("result: ",result?.data?.verificationData?.emailVarification);

  const emailVerification =result?.data?.verificationData?.emailVarification     

  const [email, setEmail] = useState<string | any>(emailVerification?.email ? emailVerification?.email : '')
  const [conEmail, setConEmail] = useState<string | any>(emailVerification?.email ? emailVerification?.email : '')


  const handlSubmit = async () => {
 
    if (email !== conEmail) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Emails do not match.</ToastTitle>
            </Toast>
          );
        },
      });
      return
    }
    updateKyc?.mutate({ email }, {
      onSuccess: (data) => {
        // console.log("data response: ", data?.data?.message);

        if (data?.data?.success) {
          // Update only the name field in userInfo
          // updateUserName(data?.data?.data?.name, data?.data?.data?.profile);

          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>User Email KYC Updated Successfully.</ToastTitle>
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
      <AppBar back title='' />

      <Box mx={moderateScale(15)} my={moderateScaleVertical(10)} py={moderateScaleVertical(10)}  borderBottomColor={colors.gray5}>
        <Text fontFamily='$robotoBold' fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1} >Email</Text>
      </Box>

      <Box borderEndWidth={1} borderColor={colors.gold} mx={moderateScale(15)} borderRadius={moderateScale(10)} overflow='hidden'>
        {/* <Box bgColor={colors.gray3} py={moderateScaleVertical(8)} px={moderateScale(10)}>
          <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.gray2} numberOfLines={1} >Change your username here</Text>
        </Box>

        
        <Text fontFamily='$robotoRegular' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={2} px={moderateScale(15)} pt={moderateScaleVertical(10)}>Username you had requestedfor was not available. To change your username, enter new username below.</Text>
        <Text fontFamily='$robotoBold' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={2} px={moderateScale(15)} py={moderateScaleVertical(10)}>Please note that you can change your username only once.</Text>

        <Text fontFamily='$robotoRegular' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} textAlign='center'>Old Username :  hero8rq1so5u</Text>
           */}
        <Box mx={moderateScale(15)} my={moderateScale(15)} gap={moderateScale(10)}>
          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Email Address *" placeholderTextColor={colors.placeHolderColor} autoCapitalize='none' onChangeText={(e) => setEmail(e)} value={email} />
          </Input>

          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
            <InputField color={colors.white} fontFamily='$robotoMedium' fontSize={14} placeholder="Confirm Email Address *" placeholderTextColor={colors.placeHolderColor} autoCapitalize='none' onChangeText={(e) => setConEmail(e)} value={conEmail} />
          </Input>
        </Box>

        <PrimaryButton buttonText='Submit' onPress={handlSubmit} loading={updateKyc?.isPending} disabled={updateKyc?.isPending} alignSelf='center' backgroundColor={colors.Purple} width={moderateScale(120)} height={moderateScale(35)} marginLeft={moderateScale(15)} marginBottom={moderateScaleVertical(15)} />
      </Box>

    </Container>
  )
}

export default AddEmailAddress