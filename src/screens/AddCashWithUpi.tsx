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
import useGetSettings from '../hooks/private/use-get-settings'
import { useGetUserWalletWaletSetting } from '../hooks/auth/get-user-wallet-info'
import {CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk';
import {CFDropCheckoutPayment,CFEnvironment,CFSession} from 'cashfree-pg-api-contract';
import UPIWebView from '../components/WebView/UPIWebView'
import { Linking, Platform } from "react-native";



const key = razorKeyTest

const CheckEnterdCashBonus = ({amount,hanldeAmountOnChange,setAmount,matchedOffer})=>{
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
 useEffect(()=>{
    if(amount){
    hanldeAmountOnChange(amount)
    }
  },[amount])

  return <Box flexDirection='row' alignItems='center' mx={moderateScale(20)} my={moderateScaleVertical(20)}>
          <Box gap={5}>
             <Text fontFamily='$robotoMedium' fontSize={14} color={colors.white} mb={1}>
                Enter Amount 
             </Text>

            <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} $focus-borderColor={colors.themeRed} style={{ flex: 1 }}>
             
             
       
              <InputField value={`${amount}`} color='white' fontFamily='$robotoMedium' 
              keyboardType='number-pad' fontSize={14} placeholder="Enter Amount" 
              onChangeText={(t) => setAmount(t)} placeholderTextColor={colors.placeHolderColor} />
            </Input>

            <Box flexDirection='row' alignItems='center'>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.greenText} numberOfLines={1} alignSelf='center'>Get </Text>
              <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} resizeMode='contain' alignSelf='baseline' />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.greenText} numberOfLines={1} alignSelf='center'>{matchedOffer ? ` ${matchedOffer?.bounusAmount} Bonus on ₹${matchedOffer?.amount}` : ' Bonus Cash will be shown here'}</Text>

            </Box>

          </Box>

          <Pressable onPress={(()=>{navigation.navigate("Gst")})} flex={1}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.Purple} numberOfLines={1} alignSelf='center'>Includes Deposit & GST</Text>
          </Pressable>

        </Box>
}

const AddCash = () => {
  // init 
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast()
  const authContext: any = useContext(AuthContext);
  // console.log("authContext: ", authContext);
  // console.log("authState: ", authContext?.userInfo);


  const { data: offers, isLoading } = useGetOffer()
  const { data: offersSettingsData, isLoading:offersSettingsIsLoading } = useGetUserWalletWaletSetting()


  // state
  const [selectedOffer, setSelectedOffer] = useState<string | null>('')
  const [showAddCashModel, setShowAddCashModel] = useState<boolean>(false)
  const [enterAmount, setEnterAmount] = useState<number>()
  const [amount,setAmount]= useState<number|string>('')

  const [matchedOffer, setMatchedOffer] = useState<any>(null);
  const [matchedOffer2, setMatchedOffer2] = useState<any>(null);
  const [isActiveWebView,setWebViewStatus] =useState(false)
  const [paymentLink,setPaymentLink] = useState('')

  // api
  const useAddWalletAmountMutation = useAddWalletAmount()

  const useGenerateOrderMutation = useGenerateOrder()
  
 const createOrder = async () => {
      try {
        const response = await fetch('https://api.ekqr.in/api/create_order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: '06718f0b-8d2a-42c5-a753-15f4471a5a3c',
            client_txn_id: '1234567810',
            amount: '1',
            p_info: 'Product Name',
            customer_name: 'Jon Doe',
            customer_email: 'jondoe@gmail.com',
            customer_mobile: '6201342801',
            redirect_url: 'https://www.wonbybid.com',
            udf1: 'user defined field 1 (max 25 char)',
            udf2: 'user defined field 2 (max 25 char)',
            udf3: 'user defined field 3 (max 25 char)',
          }),
        });

        const data = await response.json();
          navigation.navigate('PaymentScreen', { apiData: data });
        console.log('API Response:', data);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };
  const openInBrowser = async (url:string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url); // opens in external browser
  } else {
    console.log("Don't know how to open URI: " + url);
  }
};

console.log(offersSettingsData?.data?.data?.mobileNumber)

const handleAddWalletAmount = async (
  addAmount: number,
  type: string,
  typeBonus: number
) => {
  const minimumAmount = Number(offersSettingsData?.data?.data?.minimumWaletRecharge || "");
  const isInvalidAmount = !addAmount || Number(addAmount) < minimumAmount;

  if (isInvalidAmount) {
    toast.show({
      placement: "bottom",
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} variant="accent" action="error">
          <ToastTitle>
            {Number(addAmount) >= 0 && Number(addAmount) < minimumAmount
              ? `Please enter a minimum amount of ₹${minimumAmount}`
              : "Please enter an amount"}
          </ToastTitle>
        </Toast>
      ),
    });
    return;
  }

  try {
    // Calculate bonus
    let bonuseAmount = 0;
    if (type === "offer") {
      bonuseAmount = +typeBonus;
    } else if (type === "enter") {
      bonuseAmount = matchedOffer?.bounusAmount || 0;
    } else if (type === "add") {
      bonuseAmount = matchedOffer2?.bounusAmount || 0;
    }

    // Generate unique order ID
   const orderId = `ORD${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;


    // Create order in backend
    const orderResponse = await useGenerateOrderMutation.mutateAsync({
      amount: addAmount,
      type: "Wallet Recharge",
    });

    const obj = {
      payin_ref: orderResponse.data.data.order_id,
      amount: String(addAmount),
      fName: "Yash",
      lName: "Sir",
      mNo: offersSettingsData?.data?.data?.mobileNumber || "9005126629",
      email: "wonbybid@gmail.com",
      add1: "xxxxxx",
      city: "Mumbai",
      state: "Maharastra",
      pCode: "xxxxxx",
    };

    console.log(obj)

    const queryParams = new URLSearchParams(obj).toString();

    const url = `https://api.ekonetsolutions.com/EkoN54454ss/api/v2/endpoints/EkoNetSolutionsDynamicQR?${queryParams}`;

    // Send POST request to payment gateway
    console.log(url)
    
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      "merchantId": "23971251",
      "clientid": "PMICW73B-942Q-8KZK-V45G-9QHFVYF1254F",
      "clientSecretKey": "82L3KN3FJSZOTKCHWKOTQ7I9EFM7LB3P"
    })
    }).then((res) => res.json());

    console.log("Payment API Response:", data);

    if ((Platform.OS === "android" || Platform.OS === "ios") && data?.UpiLink) {
      Linking.canOpenURL(data?.UpiLink)
        .then((supported) => {
          if (supported) {
            Linking.openURL(data?.UpiLink);
          } else {
            toast.show({
              placement: "bottom",
              render: ({ id }) => (
                <Toast nativeID={`toast-${id}`} variant="accent" action="error">
                  <ToastTitle>
                    No UPI app found. Please install Google Pay, PhonePe, or Paytm.
                  </ToastTitle>
                </Toast>
              ),
            });
          }
        })
        .catch((err) => {
          console.error("❌ Error checking UPI link support:", err);
        });
    } else {
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} variant="accent" action="error">
            <ToastTitle>Payment link not received.</ToastTitle>
          </Toast>
        ),
      });
    }

    // Optionally store or send recharge attempt info
    const payload = {
      amount: Number(addAmount),
      bounusAmount: Number(bonuseAmount),
      date: new Date().toISOString(),
    };
    console.log("Recharge Payload:", payload);
  } catch (err) {
    console.error("Payment Error:", err);
    toast.show({
      placement: "bottom",
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} variant="accent" action="error">
          <ToastTitle>Something went wrong while initiating payment.</ToastTitle>
        </Toast>
      ),
    });
  }
};




  // console.log(offers?.data?.data)

  const hanldeAmountOnChange = (amount: number | any) => {
    setEnterAmount(amount);
    // Sort offers in ascending order of amount
    const sortedOffers = [...offers?.data?.data].sort((a, b) => a.amount - b.amount);
  
    // Find the nearest higher or equal offer
    const matchedOffer = sortedOffers.find((offer) => offer.amount > amount);
    console.log("Checking Matched",Number(matchedOffer?.amount)!==Number(amount))

    if(Number(matchedOffer?.amount)!==Number(amount)){

        const pickedRange = sortedOffers.find((el)=>{
          const [min,max] =  el.range.split(' - ')
          return (Number(min)<=Number(amount) && Number(max)>=Number(amount))
        })
        console.log("Checking Exact Matched",pickedRange?.range,pickedRange?.bounusPercentage)

        if(pickedRange){
          setMatchedOffer({
            bounusAmount:Number((pickedRange?.bounusPercentage*amount).toFixed(2)),
            amount
          })
        }else{
          const pickedRange = sortedOffers.at(-1)

          setMatchedOffer({
            bounusAmount:Number((pickedRange?.bounusPercentage*amount).toFixed(2)),
            amount
          }) 
        }
      //  const cretedOffer =  matchedOffer.bounusAmount
    }else{
      const highestOffer = sortedOffers[sortedOffers.length - 1];
      setMatchedOffer(matchedOffer || highestOffer);
    }

     if(matchedOffer){
      setMatchedOffer2(matchedOffer)
     }else{
         const pickedRange = sortedOffers.at(-1)
         setMatchedOffer2({
            bounusAmount:Number((pickedRange?.bounusPercentage*(Number(amount)+100)).toFixed(2)),
            amount:Number(amount)+100
          }) 
     }
    // If no higher offer is found, set the highest available offer
  };


  const handleOpenModal = () => {
        // Correctly check if enterAmount is invalid
   const minimumAmount = Number(offersSettingsData?.data?.data?.minimumWaletRecharge || "");    
    const isInvalidAmount = !enterAmount || Number(enterAmount) < minimumAmount;
  
    if (isInvalidAmount) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>
                {Number(enterAmount || "") >= 0 && Number(enterAmount) < minimumAmount
                  ? `Please enter a minimum amount of ${minimumAmount}`
                  : "Please enter an amount"}
              </ToastTitle>
            </Toast>
          );
        },
      });
      return;
    }

     setShowAddCashModel(true)
  };
  


  const handleLogout = () => {
    authContext.logout()
    navigation.navigate(NavigationString.Login)
  }



  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title='Amount' />

      <Body>
        <Box gap={moderateScaleVertical(15)} mt={moderateScaleVertical(15)}>
          <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={moderateScale(15)} mx={moderateScale(20)}>
            {isLoading && offersSettingsIsLoading ?
              <Box w={'100%'} h={moderateScale(110)} alignContent={'center'} justifyContent={'center'}>
                <ActivityIndicator size="large" color={colors.gray6} />
              </Box>
              :
              offers?.data?.data?.map((item: any, ind: number) => {
                return (
                  <TouchableOpacity style={{ width: '47%' }} onPress={() => {  
                    setEnterAmount(item?.amount),
                    setAmount(item?.amount),
                    handleAddWalletAmount(item?.amount, "offer", item?.bounusAmount);
                     
                     }} key={ind}>
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
        
         <CheckEnterdCashBonus amount={amount} hanldeAmountOnChange={hanldeAmountOnChange} setAmount={setAmount}
         matchedOffer={matchedOffer} 
         
         />


        <Box flexDirection='row' alignItems='center' mx={moderateScale(20)} gap={moderateScale(10)} mt={moderateScaleVertical(15)}>
          <OfferPercentageIcon />
          <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} alignSelf='center'>Best Offer</Text>
        </Box>

        <Box mx={moderateScale(20)} gap={15} mt={moderateScaleVertical(15)}>
          {
              offersSettingsData?.data?.data?.selectedBestOfferWaletRecharge?.map((item, index) => {
              return (
                <Pressable key={index?.toString()} onPress={() => {
                  handleAddWalletAmount(item?.amount, "offer", item?.bounusAmount);
                   setAmount(item?.amount)
                  }} flexDirection='row' alignItems='center' h={moderateScale(70)} borderRadius={moderateScale(8)} overflow='hidden' style={shadowStyle}>
                  <Box bgColor={colors.themeRed} h={'100%'} alignItems='center' justifyContent='center' borderRightWidth={3} borderRightColor={colors.white} borderStyle='dashed' >
                    <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} style={{ transform: [{ rotate: '270deg' }] }}>OFFER</Text>
                  </Box>
                  <Box flexDirection='row' alignItems='center' backgroundColor={colors.white} h={'100%'} w={'100%'} px={moderateScale(15)}>
                    <Box flex={1.5} gap={moderateScale(8)}>
                      <Box flexDirection='row' alignItems='center' gap={4} >
                        <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.black} numberOfLines={1} >You get</Text>
                        <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(13)} h={moderateScale(13)} resizeMode='contain' />
                        <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.black} numberOfLines={1}>{item.bonusAmount} Bonus </Text>
                      </Box>

                        <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <Box marginRight={6} backgroundColor={'#d4f5e2'} py={3} px={5} borderWidth={1} borderColor={colors.gray3} borderRadius={moderateScale(5)}>
                          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14}  color={colors.gray6} numberOfLines={1}>{item.label}</Text>
                        </Box>

                        <Pressable>
                          <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={14} color={colors.greenText} numberOfLines={1} > Rs {item.amount}</Text>
                        </Pressable>
                      </Box>
                    </Box>
                    {selectedOffer._id === item._id ? (<Box flex={1} alignItems='center' gap={moderateScaleVertical(5)}>
                      <CircleGreenTick />
                      <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={18} color={colors.greenText} numberOfLines={1}></Text>
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
        <TouchableOpacity onPress={createOrder}>

<Text>sunny</Text>
        </TouchableOpacity>

      </Body>

      {/* <PrimaryButton onPress={handleGenerateOrder} buttonText='Add Amount' loading={useAddWalletAmountMutation?.isPending} disabled={useAddWalletAmountMutation.isPending} bgColor={colors.greenText} height={moderateScale(35)} width={moderateScale(170)} /> */}
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
                <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={23} color={colors.white} numberOfLines={1}>{matchedOffer2?.bounusAmount} Bonus Cash </Text>
              </Box>

              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.gray6} numberOfLines={1}>On deposit of {'\u20B9'}{matchedOffer2?.amount}</Text>

              <PrimaryButton onPress={() => handleAddWalletAmount(matchedOffer2?.amount,"add")} buttonText={`Add \u20B9${matchedOffer2?.amount}`} backgroundColor={colors.greenText} height={moderateScale(45)} width={'85%'} />

              <TouchableOpacity onPress={() => handleAddWalletAmount(matchedOffer?.amount,"enter")}>
                <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.white} numberOfLines={1}>Continue with {'\u20B9'}{enterAmount}</Text>
              </TouchableOpacity>
            </Box>

          </Box>
        </Box>
      </Modal>
         <UPIWebView paymentLink={paymentLink} visible={isActiveWebView} onClose={() => setWebViewStatus(false)}>
  <CheckEnterdCashBonus
    amount={amount}
    hanldeAmountOnChange={hanldeAmountOnChange}
    setAmount={setAmount}
    matchedOffer={matchedOffer}
  />
</UPIWebView> 
    </Container>
  )
}

export default AddCash

