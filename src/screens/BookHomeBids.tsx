import { AddIcon, Box, Icon, Text, Toast, ToastTitle, useToast, View, } from '@gluestack-ui/themed';
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Container } from '../components/Container';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import Body from '../components/Body/Body';
import PrimaryButton from '../components/Button/PrimaryButton';
import InputText from '../components/TextInput/InputText';
import { NavigationString } from '../navigation/navigationStrings';
import useJoinBidHome from '../hooks/home/join-bid-home';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import useGetCheckAlreadyJoin from '../hooks/home/get-check-already-join';
import socketServices from '../utils/socketService';
import { KeyboardAvoidingView, Modal, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { AuthContext } from '../utils/authContext';
import GameTimer from '../utils/GameTimer';
import { ActivityIndicator } from 'react-native';
import { formatDate } from 'date-fns';
import { SecurityGaurdIcon, SquarePlusIcon, UploadPlusIcon, WalletIcon, WalletIconBlack, WalletIconWidth, } from '../components/Icons';
import { formatAmount, shadowStyle } from '../constants/constant';
import useGetUserWalletInfo from '../hooks/auth/get-user-wallet-info';
import { Pressable } from '@gluestack-ui/themed';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import Loader from '../components/Loader';

const BookHomeBids = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const authContext: any = useContext(AuthContext);
  const route = useRoute();
  const toast = useToast();

  const { contestId, slotId, maxPrice }: any = route.params;
  const [showInsight, setShowInsight] = useState<string>('tip');
  const [currentTimeSlot, setCurrentTimeSlot] = useState<any>();
  const [upTo, setUpTo] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [winningUser, setWinningUser] = useState<any[]>([]);
  const [rangeAmount, setRangeAmount] = useState<{ max: number; min: number }>({ max: 0, min: 0, });
  const [contestInfo, setContestInfo] = useState<any>(null);
  const [insights, setInsights] = useState<any>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showFull, setShowFull] = useState(false);
  const [decimalRange, stedecimalRange] = useState('');

  // api
  const useJoinBidHomeMutation = useJoinBidHome();
  const { data: walletInfoData, isLoading: walletInfoIsLoading, refetch, } = useGetUserWalletInfo();


  const showToast = (message: string) => {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    socketServices.removeListener(`user-winning`);

    const handleUserWinning = (data: any) => {
      const currentWinningUsers = data?.currentWiningUsers;
      const bidRange = data?.bidRange;
      const currentTimeSlots = data?.cuurenttimeSlots;
      const uptoValue = data?.upto;
      const contestInfoValue = data?.contestInfo;
      stedecimalRange(data?.decimalRange);
      setInsights(data?.lastThreeDayBidReview);

      setWinningUser(prev => prev !== currentWinningUsers ? currentWinningUsers : prev,);
      setRangeAmount(prev => (prev !== bidRange ? bidRange : prev));
      setCurrentTimeSlot((prev: any) => prev !== currentTimeSlots ? currentTimeSlots : prev,);
      setUpTo(prev => (prev !== uptoValue ? uptoValue : prev));
      setContestInfo((prev: any) => prev !== contestInfoValue ? contestInfoValue : prev,);
      setIsLoading(false);
    };

    socketServices.on(`user-winning`, handleUserWinning);
    socketServices.emit(`get-winninguser`, {
      contestId: contestId,
      timeSlotId: slotId,
      userId: authContext?.authState?.userId,
    });

    return () => {
      socketServices.removeListener(`user-winning`);
      socketServices.removeListener(`get-winninguser`);
    };
  }, [contestId, slotId, authContext?.authState?.userId, refreshing]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  const validateBidAmount = (bid: number, range: { min: number; max: number },): string | null => {
    if (!bid) return 'Please enter a bid amount';
    if (bid < range.min || bid > range.max) return 'Please enter a bid amount within the range';
    return null;
  };

  const handleJoinBid = () => {
    const validationError = validateBidAmount(Number(bidAmount), rangeAmount);
    if (validationError) {
      showToast(validationError);
      setBtnLoading(false);
      return;
    }

    setBtnLoading(true);
    const payload = { bidAmount: Number(bidAmount) };

    useJoinBidHomeMutation?.mutate(
      { contestId, timeslotId: slotId, payload },
      {
        onSuccess: data => {
          if (data?.data?.success) {
            setUpTo(prev => Number(prev || '') - 1 > 0 ? Number(prev || '') - 1 : prev,);
            setBidAmount(''); // Yeh line input field blank karega
          }
          setBtnLoading(false);
          showToast(data?.data?.message || 'Bid successful');
          refetch();
        },
        onError: error => {
          setBtnLoading(false);
          showToast(error?.response?.data?.message || 'An error occurred');
        },
      },
    );
  };

  if (isLoading || !contestInfo) {
    return (
      <Box flex={1}>
        <AppBar back title={`Book Bids`} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', }}>
          {/* <ActivityIndicator size='large' color={colors.themeRed} /> */}
          <Loader />
        </View>
      </Box>
    );
  }

  const RightIcon = () => {
    return (
      <Box flexDirection="row" alignItems="center" gap={15} w={moderateScale(140)}>
        <Pressable onPress={() => navigation.navigate(NavigationString.MyWallet)}>
          <Box flexDirection="row" alignItems="center" py={8} px={7} borderRadius={10} gap={2}>
            <WalletIconWidth width={18} height={18} />
            <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{formatAmount(walletInfoData?.data?.newBalance?.balance)}</Text>
          </Box>
        </Pressable>
      </Box>
    );
  };

  return (
    <Container statusBarStyle="light-content" statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <KeyboardAvoidingView >
        <AppBar onBackPress={() => { socketServices.emit('leave-winninguser'); }} textColor={colors.gold} back title={`${'\u20B9'} ${maxPrice ? maxPrice : ''} `} right={<RightIcon />} />
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.themeRed]} />
        }>
          <Body>
            <Box bgColor={'black'} borderRightWidth={1} borderEndEndRadius={10} borderColor="white" borderLeftWidth={1} width={'80%'} alignSelf="center" marginBottom={24} mt={moderateScaleVertical(25)} mx={moderateScale(15)} py={moderateScaleVertical(15)} borderRadius={moderateScale(10)} gap={moderateScale(15)}>
              <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.white} numberOfLines={1} textAlign="center">Contest ends in</Text>

              {currentTimeSlot ? (
                <GameTimer onRoomLeft={() => { socketServices.emit('leave-winninguser'); }} contestId={contestId} slotId={slotId} endTime={currentTimeSlot?.endTime} color={colors.red} />
              ) : (
                <Text fontFamily={'$robotoBold'} fontSize={24} lineHeight={26} color={colors.red} numberOfLines={1} textAlign="center">00:00:00</Text>
              )}
            </Box>
            <Box flexDirection="row" alignItems="center" justifyContent="space-between" mx={moderateScale(15)} my={moderateScaleVertical(20)}>
              <PrimaryButton buttonText="Bidders"
                onPress={() => {
                  navigation.navigate(NavigationString.BiddersHomeList, {
                    contestId: contestId,
                    slotId: slotId,
                  });
                }}
                fontSize={18}
                backgroundColor={'transparent'}
                textColor={colors.white}
                borderRightWidth={1}
                borderLeftWidth={1}
                borderColor={colors.gold}
                borderRadius={moderateScale(20)}
                height={moderateScale(40)}
                width={moderateScale(120)}
              />
              <PrimaryButton
                buttonText="My Bids"
                onPress={() =>
                  navigation.navigate(NavigationString.YourBidsHome, {
                    contestId: contestId,
                    slotId: slotId,
                  })
                }
                fontSize={18}
                backgroundColor={'transparent'}
                textColor={colors.white}
                borderRightWidth={1}
                borderLeftWidth={1}
                borderColor={colors.white}
                borderRadius={moderateScale(20)}
                height={moderateScale(40)}
                width={moderateScale(120)}
              />
            </Box>

            <Text fontFamily={'$poppinsMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} mb={moderateScaleVertical(15)} textAlign="center">Remaining Bids : {upTo ? upTo : 0}</Text>

            {winningUser?.length > 0 && (
              <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.gold} numberOfLines={1} textAlign="center" mb={moderateScaleVertical(15)}>
                {winningUser?.map((val: any) => val?.name).join(', ') ?? 'N/A'}{' '}
                {winningUser?.length === 1 ? 'is' : winningUser.length > 1 ? 'are' : 'is'}{' '}currently winning..
              </Text>
            )}

            <Box mx={moderateScale(15)} gap={moderateScale(20)}>
              <InputText label={`Bid between ${rangeAmount?.min}${decimalRange.trim() ? '.' + decimalRange : decimalRange} - ${rangeAmount?.max}${decimalRange.trim() ? '.' + decimalRange : decimalRange}`} textInputProps={{ placeholder: 'eg. 1.00', value: bidAmount, onChangeText: t => setBidAmount(t), keyboardType: 'number-pad', }} />
              <PrimaryButton buttonText="Submit Bid" onPress={handleJoinBid} loading={useJoinBidHomeMutation?.isPending || btnLoading} disabled={useJoinBidHomeMutation?.isPending} bgColor={colors.greenText} />
            </Box>

            <Box mx={moderateScale(15)} my={moderateScaleVertical(20)}>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                {/* <Text fontFamily={'$robotoMedium'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1}>TIP: Here's a secret!!</Text> */}
                <PrimaryButton
                  buttonText="Tips"
                  onPress={() => {
                    setShowInsight('tip');
                  }}
                  fontSize={16}
                  textColor={colors.white}
                  borderLeftWidth={1}
                  borderRightWidth={1}
                  borderColor={colors.white}
                  borderRadius={moderateScale(20)}
                  height={moderateScale(30)}
                  width={moderateScale(110)}
                />

                {/* <PrimaryButton buttonText='Insights' onPress={() => { setShowInsight('insights') }} fontSize={16} backgroundColor={'transparent'} borderLeftWidth={1} borderRightWidth={1} textColor={colors.white} borderColor={colors.gold} borderRadius={moderateScale(20)} height={moderateScale(30)} width={moderateScale(110)} /> */}
                <PrimaryButton
                  onPress={() => {
                    navigation.navigate('HowToPlay');
                  }}
                  buttonText="How To Play"
                  fontSize={16}
                  backgroundColor={'transparent'}
                  borderLeftWidth={1}
                  borderRightWidth={1}
                  textColor={colors.white}
                  borderColor={colors.gold}
                  borderRadius={moderateScale(20)}
                  height={moderateScale(30)}
                  width={moderateScale(140)}
                />
              </Box>

              {/* <Box display={showInsight === 'tip' ? 'flex' : 'none'} borderWidth={1} borderColor={colors.grayish} px={moderateScale(15)} py={moderateScaleVertical(15)} marginTop={moderateScaleVertical(15)} borderRadius={moderateScale(10)} gap={10}>
         
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>1. Bid Smartly – Analyze patterns and place your</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>bids strategically instead of rushing.</Text>

              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>2. Manage Your Budget – Set a limit and play</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}> wisely to maximize your chances over multiple.</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>contests.</Text>

          
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>3. Stay Active – Participate consistently to </Text>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>understand the game better and improve your.</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>winning strategy.</Text>

              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>4. Favourite count - Favorite count shows the</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={1}>most popular upcoming contests.”</Text>
            </Box> */}
              <Box display={'flex'} borderWidth={1} borderColor={colors.grayish} px={moderateScale(15)} py={moderateScaleVertical(15)} marginTop={moderateScaleVertical(15)} borderRadius={moderateScale(10)} gap={10}>
                {/* Pehla point hamesha dikhai dega */}
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2}>
                  1. Bid Smartly – Analyze patterns and place your bids
                  strategically instead of rushing.
                </Text>

                {/* Baaki ke points sirf tab dikhai denge jab showFull true hoga */}
                {showFull && (
                  <>
                    <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2}>
                      2. Manage Your Budget – Set a limit and play wisely to
                      maximize your chances over multiple contests.
                    </Text>

                    <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2}>
                      3. Stay Active – Participate consistently to understand the
                      game better and improve your winning strategy.
                    </Text>

                    <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2}>
                      4. Favourite count - Favorite count shows the most popular
                      upcoming contests.
                    </Text>
                  </>
                )}

                {/* Show More / Show Less Button */}
                <Pressable onPress={() => setShowFull(!showFull)}>
                  <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.Purple}>{showFull ? 'Show Less' : 'Show More'}</Text>
                </Pressable>
              </Box>
              {/* <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>2. Manage Your Budget – Set a limit and play wisely to maximize your chances over multiple contests.</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>3. Stay Active – Participate consistently to understand the game better and improve your winning strategy.</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>4. Favourite count - Favorite count shows the most popular upcoming contests.”</Text> */}

              <Box display={showInsight === 'insights' ? 'flex' : 'none'} borderWidth={1} borderColor={colors.grayish} px={moderateScale(15)} py={moderateScaleVertical(15)} marginTop={moderateScaleVertical(15)} borderRadius={moderateScale(10)} gap={10}>
                <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.gray2} numberOfLines={1}>Bidding Insights :</Text>

                <Box gap={moderateScale(4)}></Box>

                <Box gap={moderateScale(4)}>
                  <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={2}>Top 5 winning Bids :-{' '}</Text>
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.gray2} numberOfLines={2} textAlign="center">
                    {insights?.topFiveWinningBid.map(
                      (v: any, index: number, array: any[]) =>
                        `${v}${index < array.length - 1 ? ', ' : ''}`, // Remove the last comma
                    )}
                  </Text>
                </Box>
                <Box gap={moderateScale(4)}>
                  <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray2} numberOfLines={2}>Top 5 unique Bids :-{' '}</Text>
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.gray2} numberOfLines={2} textAlign="center">
                    {insights?.topFiveUniqBid.map(
                      (v: any, index: number, array: any[]) =>
                        `${v}${index < array.length - 1 ? ', ' : ''}`, // Remove the last comma
                    )}
                  </Text>
                </Box>
                <Box gap={moderateScale(4)}>
                  <Text
                    fontFamily={'$robotoMedium'}
                    fontSize={14}
                    lineHeight={16}
                    color={colors.gray2}
                    numberOfLines={2}>
                    Top 5 duplicate Bids :-{' '}
                  </Text>
                  <Text
                    fontFamily={'$robotoMedium'}
                    fontSize={12}
                    lineHeight={16}
                    color={colors.gray2}
                    numberOfLines={2}
                    textAlign="center">
                    {insights?.topFiveCrowdedBid.map(
                      (v: any, index: number, array: any[]) =>
                        `${v}${index < array.length - 1 ? ', ' : ''}`, // Remove the last comma
                    )}
                  </Text>
                </Box>

                <Text
                  fontFamily={'$robotoMedium'}
                  fontSize={12}
                  lineHeight={14}
                  color={colors.gray2}
                  numberOfLines={1}>
                  Note :- Data collected from last three days{' '}
                </Text>
              </Box>
            </Box>
          </Body>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default BookHomeBids;
