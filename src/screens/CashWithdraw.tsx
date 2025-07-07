import { Text, Box, Input, InputSlot, InputField, InputIcon, Spinner, Toast, ToastTitle, } from '@gluestack-ui/themed';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Container } from '../components/Container';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize';
import { RupeeCircleIcon, WarningIcon } from '../components/Icons';
import PrimaryButton from '../components/Button/PrimaryButton';
import { NavigationString } from '../navigation/navigationStrings';
import { Pressable } from '@gluestack-ui/themed';
import { useState } from 'react';
import Body from '../components/Body/Body';
import useGetUserWalletInfo from '../hooks/auth/get-user-wallet-info';
import useWithdrawWalletAmount from '../hooks/auth/withdraw-wallet-amount';
import authService from '../services/auth-service';
import { queryClient } from '../utils/react-query-config';
import { useToast } from '@gluestack-ui/themed';
import useKycDetails from '../hooks/home/get-kyc-details';
import { formatAmount, serverBaseURL } from '../constants/constant';
import { Alert, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';
import useGetWithdrawal_Balance from '../hooks/auth/use_withdrawal_balance';

const CashWithdraw = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();

  const [enterWithdrawAmount, setEnterWithdrawAmount] = useState<number>();
  const [selectedBox, setSelectedBox] = useState(2);

  // api
  const { data: result, isLoading, isError, error, refetch } = useKycDetails();
  const { data: walletInfoData, isLoading: walletInfoIsLoading } = useGetWithdrawal_Balance();

  const useWithdrawWalletAmountMutation = useWithdrawWalletAmount();

  const bankVerification = result?.data?.verificationData?.bank;
  const kycVarification = result?.data?.verificationData?.kycVarification;
  const minimumWidthraw = walletInfoData?.data?.minimumWidthraw

  console.log(bankVerification);
  const [selectedWithdrawOption, setSelectedWithdrawOption] = useState('upi');
  const [selectedSearchOption, setSelectedSearchOption] = useState('ifsc');

  const boxes = walletInfoData?.data?.data;

  console.log("boxes: ", boxes);


  const handleWithdraw = async () => {
    const payload = {
      type: boxes[selectedBox].label,
      amount: boxes[selectedBox].value || 0,
    };

    try {
      const response = await fetch(
        `${serverBaseURL}wallet/withdrawal_balance`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`, // if auth required
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Withdrawal Success:', data);
        // You can show toast or alert
      } else {
        console.warn('Withdrawal Failed:', data?.message);
        // Show error to user
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  // console.log("walletInfoData :", walletInfoData?.data);
  // console.log("result: ", result?.data?.data);

  // console.log("selectedWithdrawOption: ", selectedWithdrawOption);

  const handleWithdrawAmount = () => {
    if (!enterWithdrawAmount) {
      toast.show({
        placement: 'bottom',
        render: ({ id }) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Enter withdrawal amount</ToastTitle>
            </Toast>
          );
        },
      });
      return;
    }
    const payload = {
      amount: Number(enterWithdrawAmount),
      type: boxes[selectedBox].type,
      selectedWithdrawOption: selectedWithdrawOption,
      AcountNoUpi: selectedWithdrawOption === 'bankAcountNo' ? bankVerification?.accountNo : bankVerification?.upiId
    };
    // console.log('payload', payload);

    useWithdrawWalletAmountMutation.mutate(payload, {
      onSuccess: data => {
        // console.log(data?.data,'WITHHH API');

        if (data?.data?.success) {
          queryClient.invalidateQueries({
            queryKey: [authService.queryKeys.getUserWalletInfo], // Match the `queryKey` structure
          });
          toast.show({
            placement: 'bottom',
            render: ({ id }) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>{`Withdraw successfully`}</ToastTitle>
                </Toast>
              );
            },
          });
          navigation.navigate(NavigationString.SucessScreen, {
            amount: Number(enterWithdrawAmount),
            bonus: 0,
            bonusCashExpireDate: 0,
          });
        } else {
          toast.show({
            placement: 'bottom',
            render: ({ id }) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} variant="accent" action="error">
                  <ToastTitle>
                    {data?.data?.message ||
                      'Something went wrong while withdraw'}
                  </ToastTitle>
                </Toast>
              );
            },
          });
        }

        // navigation.navigate(NavigationString.TransactionSuccessful)
      },
    });
  };

  if (walletInfoIsLoading) {
    return (
      <Container
        statusBarStyle="light-content"
        statusBarBackgroundColor={colors.themeRed}>
        <AppBar back title="Cash Withdraw" />
        <Box flex={1} backgroundColor="black" justifyContent="center" alignItems="center">
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader />
        </Box>
      </Container>
    );
  }
  // console.log("!result?.data?.data?.user?.bankKYC || !result?.data?.data?.documentKYC || !result?.data?.data?.addressKyc: ", !result?.data?.data?.user?.bankKYC || !result?.data?.data?.documentKYC || !result?.data?.data?.addressKyc);
  // || !result?.data?.data?.documentKYC || !result?.data?.data?.addressKyc
  return (
    <Container statusBarStyle="light-content" statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title="Cash Withdraw" />

      <Body>
        {(bankVerification?.varification !== "Approve" ||
          kycVarification?.varification !== "Approve") ? (
          <Box bgColor="black" borderEndWidth={1} borderBottomEndRadius={14} borderColor={colors.gold} gap={moderateScale(10)} py={moderateScaleVertical(10)} px={moderateScale(10)} mx={moderateScale(15)} mt={moderateScaleVertical(15)} borderRadius={moderateScale(10)}>
            <Box flexDirection="row" alignItems="center" gap={5}>
              <WarningIcon />
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={'white'} numberOfLines={2} w={moderateScale(260)}>To make a withdrawal, you must complete {kycVarification?.varification !== "Approve" ? "KYC verification" : "Bank verification"}.</Text>
            </Box>
            <PrimaryButton
              textColor="white"
              buttonText={kycVarification?.varification !== "Approve" ? "Complete my KYC" : "Complete my Bank verification"}
              onPress={() => kycVarification?.varification !== "Approve" ? navigation.navigate(NavigationString.KYCVerification) : navigation.navigate(NavigationString.BankVerification)}
              alignSelf="flex-end"
              fontSize={12}
              height={moderateScale(35)}
              width={kycVarification?.varification !== "Approve" ? moderateScale(150) : moderateScale(210)}
              backgroundColor={colors.Purple}
            />
          </Box>
        ) : (
          <Box />
        )}


        <Box flexDirection="row" flexWrap="wrap" justifyContent="space-around" gap={10} paddingVertical={10}>
          {boxes.map((item: any, index: any) => (
            <Pressable key={index} onPress={() => setSelectedBox(index)}>
              <Box borderLeftWidth={1} borderRightWidth={1} borderRadius={14} padding={24} width={180} borderColor={selectedBox === index ? colors.gold : 'white'} margin={5}>
                <Text textAlign="center" color="white" numberOfLines={1} ellipsizeMode="tail" adjustsFontSizeToFit minFontSize={12}>{'\u20B9'} {item.value || 0}</Text>
                <Text textAlign="center" color="white" numberOfLines={1} ellipsizeMode="tail" adjustsFontSizeToFit minFontSize={10}>{item.label}</Text>
              </Box>
            </Pressable>
          ))}
        </Box>
        {/* <Box flexDirection="row" flexWrap="wrap" justifyContent="space-around" gap={10} paddingVertical={10}>
          {boxes.map((item, index) => (
            <Pressable key={index} onPress={() => setSelectedBox(index)}>
              <Box borderLeftWidth={1} borderRightWidth={1} borderRadius={14} padding={24} width={180} borderColor={selectedBox === index ? colors.gold : 'white'} margin={5}>
                <Text textAlign="center" color="white">{'\u20B9'} {item.value || 0}</Text>
                <Text textAlign="center" color="white">{item.label}</Text>
              </Box>
            </Pressable>
          ))}
        </Box> */}


        <Box bgColor="black" px={24}>
          <Text color="white" numberOfLines={1}>
            {boxes[selectedBox]?.label}:{' '}
            <Text color="gold">
              {'\u20B9'} {formatAmount(boxes[selectedBox]?.value || 0)}
            </Text>
          </Text>
        </Box>

        {/* Rest of the input box and other content stays the same */}
        <Box mx={moderateScale(15)} marginTop={14} borderEndWidth={1} borderBottomEndRadius={14} borderColor={colors.gold} borderRadius={moderateScale(10)} overflow="hidden" my={moderateScaleVertical(15)}>
          <Box>
            <Box bgColor="black" flexDirection="row" alignItems="center" justifyContent="space-between" px={moderateScale(5)}></Box>
          </Box>

          <Box my={moderateScaleVertical(10)} mx={moderateScale(10)} gap={5} w={moderateScale(290)}>
            <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.white}>
              <InputSlot pr="$3"><InputIcon as={RupeeCircleIcon} /></InputSlot>
              <InputField color={colors.gold} fontFamily="$robotoMedium" fontSize={14} onChangeText={t => setEnterWithdrawAmount(Number(t))} keyboardType="number-pad" placeholder="Enter Amount to withdraw *" placeholderTextColor={colors.placeHolderColor} />
            </Input>
            {selectedBox == 2 ? (
              <>
                <Text fontFamily={'$robotoMedium'} fontSize={10} lineHeight={12} color={colors.white} numberOfLines={1}>Withdrawal Amount to be greater than {'\u20B9'} {minimumWidthraw}</Text>
              </>
            ) : null}
          </Box>

          <Box
            flexDirection="row"
            alignItems="center"
            mx={moderateScale(15)}
            mb={moderateScaleVertical(10)}>
            {/* <Text
              fontFamily={'$robotoMedium'}
              fontSize={12}
              lineHeight={14}
              color={colors.grayish}
              numberOfLines={1}>
              Govt policy: 30% Tax will apply on 'Net Winnings'.
            </Text> */}
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('Tds');
              }}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={14}
                color={colors.greenText}
                numberOfLines={1}>
                Know more
              </Text>
            </TouchableOpacity> */}
          </Box>
        </Box>

        <Box
          marginTop={14}
          mx={moderateScale(15)}
          borderEndWidth={1}
          borderColor={colors.gold}
          borderRadius={moderateScale(10)}
          overflow="hidden"
          mb={moderateScaleVertical(15)}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around">
            <Pressable
              onPress={() => setSelectedWithdrawOption('upi')}
              width={150}
              borderBottomWidth={selectedWithdrawOption === 'upi' ? 3 : 0}
              borderBottomColor={colors.gold}
              alignItems="center"
              backgroundColor={
                selectedWithdrawOption === 'upi' ? 'black' : '#000'
              }
              py={moderateScaleVertical(10)}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={14}
                color={
                  selectedWithdrawOption === 'upi' ? 'white' : colors.white
                }
                numberOfLines={1}>
                UPI
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedWithdrawOption('bankAcountNo')}
              width={150}
              borderBottomWidth={selectedWithdrawOption === 'bankAcountNo' ? 3 : 0}
              borderBottomColor={colors.gold}
              alignItems="center"
              backgroundColor={
                selectedWithdrawOption === 'bankAcountNo' ? 'black' : '#000'
              }
              py={moderateScaleVertical(10)}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={14}
                color={
                  selectedWithdrawOption === 'bankAcountNo' ? 'white' : colors.white
                }
                numberOfLines={1}>
                Bank Account
              </Text>
            </Pressable>
          </Box>
          <Box
            display={selectedWithdrawOption === 'bankAcountNo' ? 'flex' : 'none'}
            overflow="hidden"
            mx={moderateScale(10)}
            my={moderateScaleVertical(15)}
            borderRadius={moderateScale(10)}>
            <Box
              bgColor="black"
              py={moderateScaleVertical(10)}
              px={moderateScale(10)}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}>
                Bank details
              </Text>
            </Box>

            <Box
              mx={moderateScale(15)}
              my={moderateScaleVertical(15)}
              w={moderateScale(240)}
              gap={moderateScale(10)}>
              <Input
                variant="underlined"
                size="md"
                isDisabled={true}
                isInvalid={false}
                isReadOnly={false}
                $focus-borderColor={colors.themeRed}>
                <InputField
                  color={colors.white}
                  fontFamily="$robotoMedium"
                  fontSize={14}
                  placeholder="Enter Account Number *"
                  placeholderTextColor={colors.placeHolderColor}
                  value={
                    bankVerification?.accountNo
                      ? bankVerification?.accountNo
                      : ''
                  }
                />
              </Input>

              {/* <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
                <InputField fontFamily='$robotoMedium' fontSize={14} placeholder="Re-Enter Account Number *" placeholderTextColor={colors.placeHolderColor} />
              </Input> */}
            </Box>

            {/* <Box mx={moderateScale(5)} borderWidth={1} borderColor={colors.gray3} borderRadius={moderateScale(10)} overflow='hidden' my={moderateScaleVertical(10)}>
              <Box flexDirection='row' alignItems='center'>
                <Pressable onPress={() => setSelectedSearchOption('ifsc')} flex={1} borderBottomWidth={selectedSearchOption === 'ifsc' ? 2 : 0} borderBottomColor={'rgb(182,117,115)'} alignItems='center' backgroundColor={colors.paleGray} py={moderateScaleVertical(10)}>
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} >Search by IFSC</Text>
                </Pressable>

                <Pressable onPress={() => setSelectedSearchOption('bankname')} flex={1} borderBottomWidth={selectedSearchOption === 'bankname' ? 2 : 0} borderBottomColor={'rgb(182,117,115)'} alignItems='center' backgroundColor={colors.paleGray} py={moderateScaleVertical(10)}>
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} >Search by Bank Name</Text>
                </Pressable>
              </Box>

              <Box display={selectedSearchOption === 'bankname' ? 'flex' : 'none'} flexDirection='row' alignItems='center'>
                <Box mx={moderateScale(15)} my={moderateScaleVertical(15)} w={moderateScale(160)} gap={moderateScale(10)}>
                  <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
                    <InputField fontFamily='$robotoMedium' fontSize={14} placeholder="Bank Name *" placeholderTextColor={colors.placeHolderColor} />
                  </Input>

                  <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
                    <InputField fontFamily='$robotoMedium' fontSize={14} placeholder="Branch Name *" placeholderTextColor={colors.placeHolderColor} />
                  </Input>
                </Box>

                <PrimaryButton buttonText='Search' backgroundColor={'rgb(130,170,22)'} marginLeft={moderateScale(30)} height={moderateScale(30)} />
              </Box>

              <Box display={selectedSearchOption === 'ifsc' ? 'flex' : 'none'} flexDirection='row' alignItems='center'>
                <Box mx={moderateScale(15)} my={moderateScaleVertical(15)} w={moderateScale(160)} gap={moderateScale(10)}>
                  <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed}>
                    <InputField fontFamily='$robotoMedium' fontSize={14} placeholder="IFSC Code *" placeholderTextColor={colors.placeHolderColor} />
                  </Input>
                </Box>

                <PrimaryButton buttonText='Search' backgroundColor={'rgb(130,170,22)'} marginLeft={moderateScale(30)} height={moderateScale(30)} />
              </Box>
            </Box> */}
          </Box>
          <Box display={selectedWithdrawOption === 'upi' ? 'flex' : 'none'}>
            <Box
              bgColor="black"
              py={moderateScaleVertical(24)}
              px={moderateScale(24)}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}>
                UPI
              </Text>
            </Box>
            <Box
              mx={moderateScale(15)}
              px={moderateScale(14)}
              w={moderateScale(240)}
              gap={moderateScale(10)}>
              <Input
                variant="underlined"
                size="md"
                isDisabled={true}
                isInvalid={false}
                isReadOnly={false}
                $focus-borderColor={colors.themeRed}>
                <InputField
                  color={colors.white}
                  fontFamily="$robotoMedium"
                  fontSize={14}
                  placeholder="Enter Account Number *"
                  placeholderTextColor={colors.placeHolderColor}
                  value={bankVerification?.upiId ? bankVerification?.upiId : ''}
                />
              </Input>
              {/* <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.lavenderGray} numberOfLines={1} >Format - username@bankname</Text> */}
            </Box>

            {/* <PrimaryButton buttonText='Save' backgroundColor={'rgb(130,170,22)'} height={moderateScale(30)} width={moderateScale(210)} alignSelf='center' marginBottom={moderateScaleVertical(10)} /> */}
          </Box>
        </Box>
      </Body>
      {/* {result?.data?.data?.user?.bankKYC && result?.data?.data?.documentKYC && result?.data?.data?.addressKyc ?
        <PrimaryButton buttonText='Withdraw' onPress={handleWithdrawAmount} disabled={useWithdrawWalletAmountMutation.isPending} loading={useWithdrawWalletAmountMutation.isPending} marginHorizontal={moderateScale(15)} marginVertical={moderateScaleVertical(10)} /> :
        <PrimaryButton buttonText='Withdraw' onPress={handleWithdrawAmount} disabled={true} loading={useWithdrawWalletAmountMutation.isPending} marginHorizontal={moderateScale(15)} marginVertical={moderateScaleVertical(10)} />
      } */}

      <PrimaryButton
        width={'80%'}
        alignSelf="center"
        buttonText="Withdraw"
        backgroundColor={(bankVerification?.varification === "Approve" &&
          kycVarification?.varification === "Approve" && (selectedBox === 2 ? Number(enterWithdrawAmount) >= minimumWidthraw : true))
          ? colors.greenText : colors.gray6
        }
        onPress={(selectedBox === 2 ? Number(enterWithdrawAmount) >= minimumWidthraw : true) ? handleWithdrawAmount : () => { Alert.alert(`Withdrawal Amount to be greater than or equal to ${minimumWidthraw}`) }}
        disabled={(bankVerification?.varification !== "Approve" ||
          kycVarification?.varification !== "Approve" && (selectedBox === 2 ? Number(enterWithdrawAmount) >= minimumWidthraw : true))}
        loading={useWithdrawWalletAmountMutation.isPending}
        marginHorizontal={moderateScale(15)}
        marginVertical={moderateScaleVertical(10)}
      />
    </Container>
  );
};

export default CashWithdraw;
