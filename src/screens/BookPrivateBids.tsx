import {Box, Text, Toast, ToastTitle, useToast} from '@gluestack-ui/themed';
import {moderateScale, moderateScaleVertical} from '../utils/responsiveSize';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Container} from '../components/Container';
import {AppBar} from '../components/AppBar';
import {colors} from '../constants/colors';
import Body from '../components/Body/Body';
import PrimaryButton from '../components/Button/PrimaryButton';
import InputText from '../components/TextInput/InputText';
import {NavigationString} from '../navigation/navigationStrings';
import useJoinBidHome from '../hooks/home/join-bid-home';
import {useEffect, useState} from 'react';
import useGetCheckAlreadyJoin from '../hooks/home/get-check-already-join';
import useJoinBidPrivate from '../hooks/private/join-bid-private';
import socketServices from '../utils/socketService';
import GameTimer from '../utils/GameTimer';
import {Pressable} from '@gluestack-ui/themed';
import {WalletIconWidth} from '../components/Icons';
import {formatAmount} from '../constants/constant';
import useGetUserWalletInfo from '../hooks/auth/get-user-wallet-info';
import {View} from 'react-native-animatable';
import {ActivityIndicator} from 'react-native';
import {ToastAndroid} from 'react-native';
import Loader from '../components/Loader';

const BookPrivateBids = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const toast = useToast();
  const {contestId}: any = route.params;

  // console.log("contestId: ", contestId);

  // states
  const [bidAmount, setBidAmount] = useState('');

  const [winningUser, setWinningUser] = useState<any[]>([]);
  const [rangeAmount, setRangeAmount] = useState<{max: number; min: number}>({
    max: 0,
    min: 0,
  });

  const [currentTimeSlot, setCurrentTimeSlot] = useState<any>();
  const [upTo, setUpTo] = useState<any>();

  const [contestInfo, setContestInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [insights, setInsights] = useState<any>();
  const [showInsight, setShowInsight] = useState<string>('tip');

  // api
  const useJoinBidPrivateMutation = useJoinBidPrivate();
  const {data: walletInfoData, isLoading: walletInfoIsLoading} =
    useGetUserWalletInfo();

  const showToast = (message: string) => {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleJoinBid = () => {
    const payload = {
      bidAmount: Number(bidAmount),
    };

    if (!!!bidAmount) {
      toast.show({
        placement: 'bottom',
        render: ({id}) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Please enter bid amount</ToastTitle>
            </Toast>
          );
        },
      });
    }

    useJoinBidPrivateMutation?.mutate(
      {contestId: contestId, payload: payload},
      {
        onSuccess: data => {
          // console.log(data?.data,'bid private..');
          console.log('onSuccess: ', data?.data);

          if (data?.data?.success) {
            console.log('onSuccess: ', data?.data?.message);
            showToast(data?.data?.message || 'Bid Successfully placed');

            toast.show({
              placement: 'bottom',
              render: ({id}) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="success">
                    <ToastTitle>
                      {data?.data?.message || 'Bid Successfully placed'}
                    </ToastTitle>
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

  useEffect(() => {
    socketServices.emit('private-winninguser', {contestId: contestId});
    socketServices.on('get-private-user-winning', (data: any) => {
      // console.log(" ================================== get-private-user-winning ================================== ");
      // console.log(data)

      const currentWinningUsers = data?.currentWiningUsers;
      const bidRange = data?.bidRange;
      const currentTimeSlots = data?.cuurenttimeSlots;
      const uptoValue = data?.upto;
      const contestInfoValue = data?.contestInfo;

      setInsights(data?.lastThreeDayBidReview);

      // Update state only if values change
      setWinningUser(prev =>
        prev !== currentWinningUsers ? currentWinningUsers : prev,
      );
      setRangeAmount(prev => (prev !== bidRange ? bidRange : prev));
      setCurrentTimeSlot((prev: any) =>
        prev !== currentTimeSlots ? currentTimeSlots : prev,
      );
      setUpTo((prev: any) => (prev !== uptoValue ? uptoValue : prev));
      setContestInfo((prev: any) =>
        prev !== contestInfoValue ? contestInfoValue : prev,
      );
      setIsLoading(false);
      // console.log("data: ", data);
    });
    return () => {
      socketServices.removeListener('get-private-user-winning');
      socketServices.removeListener('private-winninguser');
    };
  }, []);

  // get-private-user-winning
  /* 
  {
    "contestId":"6719f9bf8a916edee7be819a"
} emmit private-winninguser
  */

  if (isLoading || !contestInfo) {
    return (
      <Box flex={1}>
        <AppBar back title={`Book Bids`} />
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
       <Loader/>
        </View>
      </Box>
    );
  }

  const RightIcon = () => {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        gap={15}
        w={moderateScale(140)}>
        {/* <Pressable onPress={() => navigation.navigate(NavigationString.MyWallet)}>
          <Box bgColor='#d2302b' flexDirection='row' alignItems='center' py={7} px={7} mr={moderateScale(20)} borderRadius={10} gap={10}>
            <WalletIcon />
            <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} ml={moderateScale(5)} style={{ textTransform: 'uppercase' }}>{'\u20B9'} {formatAmount(walletInfoData?.data?.newBalance?.balance)}</Text>
          </Box>
        </Pressable> */}
        <Pressable
          onPress={() => navigation.navigate(NavigationString.MyWallet)}>
          <Box
            flexDirection="row"
            alignItems="center"
            py={8}
            px={7}
            borderRadius={10}
            gap={2}>
            <WalletIconWidth width={18} height={18} />
            <Text
              fontFamily={'$poppinsMedium'}
              fontSize={12}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {formatAmount(walletInfoData?.data?.newBalance?.balance)}
            </Text>
          </Box>
        </Pressable>
      </Box>
    );
  };
  return (
    <Container
      statusBarStyle="light-content"
      statusBarBackgroundColor={colors.black}
      backgroundColor={colors.black}>
      {/* <AppBar back title={contestInfo?.title} /> */}
      {/* <AppBar back title={`${'\u20B9'} ${contestInfo?.firstPrize ? contestInfo?.firstPrize : ""} ${contestInfo?.title ? contestInfo?.title : ""}`} right={<RightIcon />} /> */}
      <AppBar
        back
        title={`${contestInfo?.title ? contestInfo?.title : ''}`}
        right={<RightIcon />}
      />

      <Body>
        <Box
          bgColor={'black'}
          mt={moderateScaleVertical(25)}
          mx={moderateScale(40)}
          py={moderateScaleVertical(15)}
          borderLeftWidth={1}
          borderRightWidth={1}
          borderColor={colors.white}
          borderRadius={moderateScale(10)}
          gap={moderateScale(15)}>
          <Text
            fontFamily={'$robotoBold'}
            fontSize={18}
            lineHeight={20}
            color={colors.white}
            numberOfLines={1}
            textAlign="center">
            Contest ends in
          </Text>
          {/* <Text fontFamily={'$robotoBold'} fontSize={24} lineHeight={26} color={colors.white} numberOfLines={1} textAlign='center'>09:59:52</Text> */}
          {currentTimeSlot ? (
            <GameTimer
              endTime={currentTimeSlot?.endDateTime}
              color={colors.red}
            />
          ) : (
            <Text
              fontFamily={'$robotoBold'}
              fontSize={24}
              lineHeight={26}
              color={colors.white}
              numberOfLines={1}
              textAlign="center">
              00:00:00
            </Text>
          )}
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mx={moderateScale(15)}
          my={moderateScaleVertical(20)}>
          <PrimaryButton
            buttonText="Bidders"
            onPress={() => {
              navigation.navigate(NavigationString.BiddersList, {
                contestId: contestId,
              });
            }}
            fontSize={18}
            backgroundColor={'transparent'}
            textColor={colors.white}
            borderLeftWidth={1}
            borderRightWidth={1}
            borderColor={colors.gold}
            borderRadius={moderateScale(20)}
            height={moderateScale(40)}
            width={moderateScale(120)}
          />
          {/* <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} flex={1} textAlign='center'>Bid for 1 coin</Text> */}
          <PrimaryButton
            buttonText="My Bids"
            onPress={() =>
              navigation.navigate(NavigationString.YourBids, {
                contestId: contestId,
              })
            }
            fontSize={18}
            backgroundColor={'transparent'}
            textColor={colors.white}
            borderLeftWidth={1}
            borderRightWidth={1}
            borderColor={colors.gold}
            borderRadius={moderateScale(20)}
            height={moderateScale(40)}
            width={moderateScale(120)}
          />
        </Box>

        <Text
          fontFamily={'$poppinsMedium'}
          fontSize={16}
          lineHeight={18}
          color={colors.white}
          numberOfLines={1}
          mb={moderateScaleVertical(15)}
          textAlign="center">
          Remaining Bids : {upTo ? upTo : 0}
        </Text>

        <Box mx={moderateScale(15)} gap={moderateScale(20)}>
          <InputText
            label={`Bid between ${rangeAmount?.min} - ${rangeAmount?.max}`}
            textInputProps={{
              placeholder: 'eg. 1.00',
              value: bidAmount,
              onChangeText: t => setBidAmount(t),
              keyboardType: 'number-pad',
            }}
          />

          {/* <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} textAlign='center'>Gowtham is currently winning..</Text> */}
          {winningUser?.length > 0 && (
            <Text
              fontFamily={'$robotoMedium'}
              fontSize={16}
              lineHeight={18}
              color={colors.red}
              numberOfLines={1}
              textAlign="center"
              mb={moderateScaleVertical(15)}>
              {winningUser?.map((val: any) => val?.name).join(', ') ?? 'N/A'}{' '}
              {winningUser?.length === 1
                ? 'is'
                : winningUser.length > 1
                ? 'are'
                : 'is'}{' '}
              currently winning..
            </Text>
          )}

          <PrimaryButton
            backgroundColor={colors.greenText}
            buttonText="Submit Bid"
            onPress={handleJoinBid}
            loading={useJoinBidPrivateMutation?.isPending}
            disabled={useJoinBidPrivateMutation?.isPending}
          />
        </Box>

        {/* <Box mx={moderateScale(15)} my={moderateScaleVertical(20)}>
          <Text fontFamily={'$robotoMedium'} fontSize={18} lineHeight={20} color={colors.white} numberOfLines={1}>TIP: Here's a secret!!</Text>

          <Box borderWidth={1} borderColor={colors.grayish} px={moderateScale(15)} py={moderateScaleVertical(15)} marginTop={moderateScaleVertical(15)} borderRadius={moderateScale(10)} gap={10}>
            <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>Use the 'Bid Range' feature.</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={3}>by using it you can place multiple bid at a time. For example: You can bid from 9.00 to 9.70 at a single time using that feature.</Text>
          </Box>
        </Box> */}
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
              backgroundColor={'transparent'}
              textColor={colors.white}
              borderLeftWidth={1}
              borderRightWidth={1}
              borderColor={colors.gold}
              borderRadius={moderateScale(20)}
              height={moderateScale(30)}
              width={moderateScale(110)}
            />

            <PrimaryButton
              buttonText="Insights"
              onPress={() => {
                setShowInsight('insights');
              }}
              fontSize={16}
              backgroundColor={'transparent'}
              textColor={colors.white}
              borderLeftWidth={1}
              borderRightWidth={1}
              borderColor={colors.gold}
              borderRadius={moderateScale(20)}
              height={moderateScale(30)}
              width={moderateScale(110)}
            />
          </Box>

          <Box
            display={showInsight === 'tip' ? 'flex' : 'none'}
            borderWidth={1}
            borderColor={colors.grayish}
            px={moderateScale(15)}
            py={moderateScaleVertical(15)}
            marginTop={moderateScaleVertical(15)}
            borderRadius={moderateScale(10)}
            gap={10}>
            <Text
              fontFamily={'$robotoMedium'}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Use the 'Bid Range' feature.
            </Text>
            <Text
              fontFamily={'$robotoMedium'}
              fontSize={12}
              lineHeight={16}
              color={colors.white}
              numberOfLines={3}>
              by using it you can place multiple bid at a time. For example: You
              can bid from 9.00 to 9.70 at a single time using that feature.
            </Text>
          </Box>

          <Box
            display={showInsight === 'insights' ? 'flex' : 'none'}
            borderWidth={1}
            borderColor={colors.grayish}
            px={moderateScale(15)}
            py={moderateScaleVertical(15)}
            marginTop={moderateScaleVertical(15)}
            borderRadius={moderateScale(10)}
            gap={10}>
            <Text
              fontFamily={'$poppinsSemiBold'}
              fontSize={16}
              lineHeight={18}
              color={colors.white}
              numberOfLines={1}>
              Bidding Insights :
            </Text>

            <Box gap={moderateScale(4)}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={2}>
                Average bid counts of maximum amount winners :-{' '}
              </Text>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={16}
                color={colors.white}
                numberOfLines={2}
                textAlign="center">
                {insights?.topFiveAmountWinner
                  ?.sort((a: any, b: any) => a - b) // Sort in ascending order
                  .map(
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
                color={colors.white}
                numberOfLines={2}>
                Top 5 winning Bids :-{' '}
              </Text>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={16}
                color={colors.black}
                numberOfLines={2}
                textAlign="center">
                {/* {insights?.topFiveWinningBid?.map((v: any) => ` ${v}, `)} */}
                {insights?.topFiveWinningBid
                  ?.sort((a: any, b: any) => a - b) // Sort in ascending order
                  .map(
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
                color={colors.white}
                numberOfLines={2}>
                Top 5 unique Bids :-{' '}
              </Text>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={16}
                color={colors.black}
                numberOfLines={2}
                textAlign="center">
                {/* {insights?.topFiveUniqBid?.map((v: any) => ` ${v}, `)} */}
                {insights?.topFiveUniqBid
                  ?.sort((a: any, b: any) => a - b) // Sort in ascending order
                  .map(
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
                color={colors.white}
                numberOfLines={2}>
                Top 5 crowded Bids :-{' '}
              </Text>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={16}
                color={colors.white}
                numberOfLines={2}
                textAlign="center">
                {/* {insights?.topFiveCrowdedBid?.map((v: any) => ` ${v}, `)} */}
                {insights?.topFiveCrowdedBid
                  ?.sort((a: any, b: any) => a - b) // Sort in ascending order
                  .map(
                    (v: any, index: number, array: any[]) =>
                      `${v}${index < array.length - 1 ? ', ' : ''}`, // Remove the last comma
                  )}
              </Text>
            </Box>

            <Text
              fontFamily={'$robotoMedium'}
              fontSize={12}
              lineHeight={14}
              color={colors.white}
              numberOfLines={1}>
              Note :- Data collected from last three days{' '}
            </Text>
          </Box>
        </Box>
      </Body>
    </Container>
  );
};

export default BookPrivateBids;
