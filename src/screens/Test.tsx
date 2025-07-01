import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import { Box, CloseIcon, Image, Input, InputIcon, InputSlot, Pressable, Text, Toast, ToastTitle, useToast, View } from '@gluestack-ui/themed'
import { InputField } from '@gluestack-ui/themed'
import { Icon } from '@gluestack-ui/themed'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import RazorpayCheckout from 'react-native-razorpay'; //razorpay 
import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import Body from '../components/Body/Body'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { imgIcon } from '../assets/icons'
import { AddCashOfferImgIcon, CircleGreenTick, OfferPercentageIcon, SecurityGaurdIcon } from '../components/Icons'
import { deviceHeight, razorKeyTest, shadowStyle } from '../constants/constant'
import PrimaryButton from '../components/Button/PrimaryButton'
import { NavigationString } from '../navigation/navigationStrings'
import useAddWalletAmount from '../hooks/auth/add-wallet-amount'
import authService from '../services/auth-service'
import { queryClient } from '../utils/react-query-config'
import { AuthContext } from '../utils/authContext'
import useGetOffer from '../hooks/home/get-all-offer'
import useGenerateOrder from '../hooks/auth/generate-order'


const key = razorKeyTest

const Test = () => {
  // init 
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast()
  const authContext: any = useContext(AuthContext);
  // console.log("authContext: ", authContext);
  // console.log("authState: ", authContext?.userInfo);


  const { data: offers, isLoading } = useGetOffer()

  // state
  const [selectedOffer, setSelectedOffer] = useState<string | null>('')
  const [showAddCashModel, setShowAddCashModel] = useState<boolean>(false)
  const [enterAmount, setEnterAmount] = useState<number>()

  const [matchedOffer, setMatchedOffer] = useState<any>(null);


  // api
  const useAddWalletAmountMutation = useAddWalletAmount()
  const useGenerateOrderMutation = useGenerateOrder()

  const handlePaymentNow = (addAmount: number, type: string, typeBonus: number) => {
    // console.log(" ========================================== handlePaymentNow =================================== ");




    if (!(!!addAmount)) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action='error'>
              <ToastTitle>Please enter amount</ToastTitle>
            </Toast>
          );
        },
      })
      return
    }



    let amount = `${addAmount}00`
    var options = {
      description: 'Recharge your wallet',
      // image: 'https://www.api.bsafelinkr.com/images/logo.png',
      currency: 'INR',
      key: razorKeyTest,
      amount: Number(amount),
      name: 'WonByBid',
      // order_id: orderPayment.id, //Replace this with an order_id created using Orders API.
      // prefill: { email: authContext?.userInfo?.useEmail || "example@gmail.com", contact: authContext?.userInfo?.userMobile || "654789XXXX", name: authContext?.userInfo?.userName || "Jon Doe" },
      theme: { color: '#FF2626' },
    };

    RazorpayCheckout.open(options).then(async (data: any) => {
      handleAddWalletAmount(addAmount, type, typeBonus)

      setShowAddCashModel(false)

    }).catch((error: any) => {
      console.log('error on razorpay: ', error);
      setShowAddCashModel(false)
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>{`Failed to proceed payment!`}</ToastTitle>
            </Toast>
          );
        },
      })
    });
  };

  const handleLogout = () => {
    authContext.logout()
    navigation.navigate(NavigationString.Login)
  }

  const handleAddWalletAmount = (addAmount: number, type: string, typeBonus: Number) => {
    // console.log(" ========================================== handleAddWalletAmount =================================== ");

    let bonuseAmount = type === "offer" ? typeBonus : addAmount === matchedOffer.amount ? matchedOffer.bounusAmount : 0



    const payload = {
      amount: Number(addAmount),
      bounusAmount: Number(bonuseAmount)
    }

    useAddWalletAmountMutation.mutate(payload, {
      onSuccess: (data) => {
        console.log("data: response", data?.data);
        setShowAddCashModel(false)
        if (data?.data?.success) {
          queryClient.invalidateQueries({
            queryKey: [authService.queryKeys.getUserWalletInfo],  // Match the `queryKey` structure
          });
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>{`${data?.data?.message}`}</ToastTitle>
                </Toast>
              );
            },
          })
          navigation.navigate(NavigationString.TransactionSuccessful, { amount: addAmount, bonus: addAmount === matchedOffer.amount ? matchedOffer.bounusAmount : 0 })
        } else {
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="error">
                  <ToastTitle>{`${data?.data?.message}`}</ToastTitle>
                </Toast>
              );
            },
          })
        }
      }
    })
  }

  const hanldeAmountOnChange = (amount: number) => {
    setEnterAmount(amount);
    // Sort offers in ascending order of amount
    const sortedOffers = [...offers?.data?.data].sort((a, b) => a.amount - b.amount);
    // Find the nearest higher or equal offer
    const matchedOffer = sortedOffers.find((offer) => offer.amount >= amount);
    // If no higher offer is found, set the highest available offer
    const highestOffer = sortedOffers[sortedOffers.length - 1];
    setMatchedOffer(matchedOffer || highestOffer);
  };

  const handleOpenModal = () => {
    if (!(!!enterAmount)) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action='error'>
              <ToastTitle>Please enter amount</ToastTitle>
            </Toast>
          );
        },
      })
      return
    }
    setShowAddCashModel(true)
  }

  // console.log("matche:", matchedOffer);


  const handleGenerateOrder = async () => {
    /* if (!(!!addAmount)) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action='error'>
              <ToastTitle>Please enter amount</ToastTitle>
            </Toast>
          );
        },
      })
      return
    }

    const payload = {
      amount: `${Number(addAmount)}00`
    } */

    let payload = {
      amount: 10000,
      type: "addWallet"
    }
    useGenerateOrderMutation.mutate(payload, {
      onSuccess: (data) => {
        console.log(" ============================= response ======================================");

        console.log("data: response", data?.data);
        setShowAddCashModel(false)
        handleCheckOut(data?.data?.result)
        if (data?.data?.success) {
          queryClient.invalidateQueries({
            queryKey: [authService.queryKeys.getUserWalletInfo],  // Match the `queryKey` structure
          });
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>{`${data?.data?.message}`}</ToastTitle>
                </Toast>
              );
            },
          })
          console.log("success");

          // navigation.navigate(NavigationString.TransactionSuccessful, { amount: addAmount, bonus: addAmount === matchedOffer.amount ? matchedOffer.bounusAmount : 0 })
        } else {
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="error">
                  <ToastTitle>{`${data?.data?.message}`}</ToastTitle>
                </Toast>
              );
            },
          })
        }
      }
    })
  }

  const handleCheckOut = async (result: any) => {
    console.log(" ============================= handleCheckOut ======================================");
    console.log("options: ", result);
    var options = {
      description: 'Recharge your wallet',
      image: 'https://www.api.bsafelinkr.com/images/logo.png',
      currency: 'INR',
      key: key,
      amount: result.amount,
      name: 'WonByBid',
      order_id: result.id, //Replace this with an order_id created using Orders API.
      prefill: { email: authContext?.userInfo?.useEmail, contact: authContext?.userInfo?.userMobile, name: authContext?.userInfo?.userName },
      theme: { color: '#FF2626' },
    }

    RazorpayCheckout.open(options).then(async (data: any) => {
      // handleAddWalletAmount(addAmount, type, typeBonus)
      console.log(" ============================= RazorpayCheckout ======================================");
      // setShowAddCashModel(false)
      console.log("data: ", data);

    }).catch((error: any) => {
      console.log('error on razorpay: ', error);
      setShowAddCashModel(false)
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>{`Failed to proceed payment!`}</ToastTitle>
            </Toast>
          );
        },
      })
    });
  }

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title='Choose Amount' />

      <Body>
        <Box gap={moderateScaleVertical(15)} mt={moderateScaleVertical(15)}>
          <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={moderateScale(15)} mx={moderateScale(20)}>
            {isLoading ?
              <Box w={'100%'} h={moderateScale(110)} alignContent={'center'} justifyContent={'center'}>
                <ActivityIndicator size="large" color={colors.gray6} />
              </Box>
              :
              offers?.data?.data?.map((item: any, ind: number) => {
                return (
                  <TouchableOpacity style={{ width: '47%' }} onPress={() => { handlePaymentNow(item?.amount, "offer", item?.bounusAmount); setEnterAmount(item?.amount); }} key={ind}>
                    <Box borderRightWidth={1} borderLeftWidth={1} borderRadius={10} borderColor={colors.white} overflow="hidden" pt={moderateScaleVertical(15)} pb={moderateScaleVertical(15)} >
                      <Text fontFamily={'$robotoMedium'} fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1} alignSelf="center">{'\u20B9'} {item?.amount}</Text>

                      <Box flexDirection="row" alignItems="center" gap={4} width={140} borderRadius={5} alignSelf='center' h={moderateScale(25)} justifyContent="center">
                        <Text fontFamily={'$robotoMedium'} fontSize={10} lineHeight={20} color={colors.gold} numberOfLines={1}>Get</Text>
                        <Image alt="icon" source={imgIcon.bCoin} w={moderateScale(10)} h={moderateScale(10)} resizeMode="contain" />
                        <Text fontFamily={'$robotoMedium'} fontSize={10} lineHeight={20} color={colors.gold} numberOfLines={1}>{item?.bounusAmount} Bonus Cash</Text>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                );
              })}
          </Box>
        </Box>
        <Box flexDirection='row' alignItems='center' mx={moderateScale(20)} my={moderateScaleVertical(20)}>
          <Box gap={5}>
            <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed} style={{ flex: 1 }}>
              <InputField color='white' fontFamily='$robotoMedium' keyboardType='number-pad' fontSize={14} placeholder="Enter Amount" onChangeText={(t) => hanldeAmountOnChange(t)} placeholderTextColor={colors.placeHolderColor} />
            </Input>

            <Box flexDirection='row' alignItems='center'>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.greenText} numberOfLines={1} alignSelf='center'>Get </Text>
              <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} resizeMode='contain' alignSelf='baseline' />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.greenText} numberOfLines={1} alignSelf='center'>{matchedOffer ? ` ${matchedOffer?.bounusAmount} Bonus on ₹${matchedOffer?.amount}` : ' Bonus Cash will be shown here'}</Text>

            </Box>

          </Box>

          <Pressable flex={1}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.Purple} numberOfLines={1} alignSelf='center'>Includes Deposit & GST</Text>
          </Pressable>

        </Box>



        <Box flexDirection='row' alignItems='center' mx={moderateScale(20)} gap={moderateScale(10)} mt={moderateScaleVertical(15)}>
          <OfferPercentageIcon />
          <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} alignSelf='center'>Best Offer</Text>
        </Box>

        <Box mx={moderateScale(20)} gap={15} mt={moderateScaleVertical(15)}>
          {
            // ['01', '02']?.map((item, index) => {
            ['01']?.map((item, index) => {
              return (
                <Pressable key={index?.toString()} onPress={() => setSelectedOffer(item)} flexDirection='row' alignItems='center' h={moderateScale(70)} borderRadius={moderateScale(8)} overflow='hidden' style={shadowStyle}>
                  <Box bgColor={colors.themeRed} h={'100%'} alignItems='center' justifyContent='center' borderRightWidth={3} borderRightColor={colors.white} borderStyle='dashed' >
                    <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} style={{ transform: [{ rotate: '270deg' }] }}>OFFER</Text>
                  </Box>
                  <Box flexDirection='row' alignItems='center' backgroundColor={colors.white} h={'100%'} w={'100%'} px={moderateScale(15)}>
                    <Box flex={1.5} gap={moderateScale(8)}>
                      <Box flexDirection='row' alignItems='center' gap={4} >
                        <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.black} numberOfLines={1} >You get</Text>
                        <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(13)} h={moderateScale(13)} resizeMode='contain' />
                        <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.black} numberOfLines={1}>500 Bonus </Text>
                      </Box>

                      <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <Box backgroundColor={'#d4f5e2'} py={3} px={5} borderWidth={1} borderColor={colors.gray3} borderRadius={moderateScale(5)}>
                          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={1}>BONUS_CASH1ST</Text>
                        </Box>

                        <Pressable>
                          <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.red} numberOfLines={1} >Remove</Text>
                        </Pressable>
                      </Box>
                    </Box>
                    {selectedOffer === item ? (<Box flex={1} alignItems='center' gap={moderateScaleVertical(5)}>
                      <CircleGreenTick />
                      <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={18} color={colors.greenText} numberOfLines={1}>Applied</Text>
                    </Box>) :
                      (<Box flex={1}>
                      </Box>)}
                  </Box>
                </Pressable>
              )
            })
          }
          <View style={{ width: '100%', backgroundColor: 'black', elevation: 3, padding: 15, borderRadius: 8, marginTop: 40, borderRightWidth: 1, borderEndEndRadius: 10, borderColor: colors.white }}>
            <Box backgroundColor={colors.themeRed} position='absolute' alignSelf='center' w={'40%'} mt={5} borderRadius={5} height={23}>
              <Text fontFamily={'$robotoMedium'} fontSize={17} lineHeight={22} color={colors.brightNavyBlue} numberOfLines={1} alignSelf='center'>Key Point</Text>
            </Box>
            <Text style={{ color: 'white', fontWeight: 600, }} mt={15}>“Get instant bonuses cash on every deposit—₹1 bonus equals ₹1 real value! Use 10% in every contest and get more out of every rupee you spend.”</Text>
          </View>
        </Box>


      </Body>

      <PrimaryButton onPress={handleGenerateOrder} buttonText='Add Amount' loading={useAddWalletAmountMutation?.isPending} disabled={useAddWalletAmountMutation.isPending} bgColor={colors.greenText} height={moderateScale(35)} width={moderateScale(170)} />
      {/* <PrimaryButton onPress={handleLogout} buttonText='Add Amount' loading={useAddWalletAmountMutation?.isPending} disabled={useAddWalletAmountMutation.isPending} bgColor={colors.greenText} height={moderateScale(35)} width={moderateScale(170)} /> */}

      <Box flexDirection='row' alignItems='center' justifyContent='space-between' backgroundColor={colors.black} px={moderateScale(15)} py={moderateScaleVertical(15)} style={shadowStyle}>
        <Box flexDirection='row' alignItems='center' gap={moderateScale(5)}>
          <SecurityGaurdIcon />
          <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.white} numberOfLines={1}>100% SECURE</Text>
        </Box>

        <PrimaryButton onPress={handleOpenModal} buttonText='Next' loading={useAddWalletAmountMutation?.isPending} disabled={useAddWalletAmountMutation.isPending} bgColor={colors.greenText} height={moderateScale(35)} width={moderateScale(170)} />
      </Box>

      <Modal animationType='slide' transparent={true} visible={showAddCashModel} onRequestClose={() => setShowAddCashModel(false)}>
        <Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)' justifyContent='flex-end' >
          <Box backgroundColor={colors.black} borderColor='white' borderTopRightRadius={10} borderTopLeftRadius={10} w={'100%'} gap={15} py={20} h={moderateScale(380)}>
            <Box flexDirection='row' justifyContent='flex-end' alignItems='center' px={15}>
              <Pressable hitSlop={20} onPress={() => setShowAddCashModel(false)}>
                <Icon as={CloseIcon} size="lg" color={colors.red} />
              </Pressable>
            </Box>

            <AddCashOfferImgIcon style={{ alignSelf: 'center' }} />

            <Box alignItems='center' gap={moderateScaleVertical(10)} mt={moderateScaleVertical(25)}>
              <Box flexDirection='row' alignItems='center' gap={4} >
                <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={23} color={colors.white} numberOfLines={1} >Get</Text>
                <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(20)} h={moderateScale(20)} resizeMode='contain' />
                <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={23} color={colors.white} numberOfLines={1}>{matchedOffer?.bonus} Bonus Cash </Text>
              </Box>

              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.gray6} numberOfLines={1}>On deposit of {'\u20B9'}{matchedOffer?.amount}</Text>

              <PrimaryButton onPress={() => handlePaymentNow(matchedOffer?.amount)} buttonText={`Add \u20B9${matchedOffer?.amount}`} backgroundColor={colors.greenText} height={moderateScale(45)} width={'85%'} />

              <TouchableOpacity onPress={() => handlePaymentNow(Number(enterAmount))}>
                <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.white} numberOfLines={1}>Continue with {'\u20B9'}{enterAmount}</Text>
              </TouchableOpacity>
            </Box>

          </Box>
        </Box>
      </Modal>
    </Container>
  )
}

export default Test