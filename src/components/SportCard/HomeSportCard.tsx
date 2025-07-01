import { Box, Image, Text, LinearGradient, Pressable, Icon, FavouriteIcon, BellIcon } from '@gluestack-ui/themed'
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"

import { moderateScale, moderateScaleVertical, scale } from '../../utils/responsiveSize'
import { colors } from '../../constants/colors'
import { CircleGreenTick, MyMatch15Icon, MyMatchYellowColorIcon } from '../Icons'
import { CheckCircleIcon } from '@gluestack-ui/themed'
import { format, isToday, differenceInSeconds, formatDate } from 'date-fns'
import CountDown from 'new-react-native-countdown-component'
import React, { useState } from 'react'
import CardTimer from '../../utils/CardTimer'
import { formatAmount } from '../../constants/constant'
import { ActivityIndicator } from 'react-native'
import Loader from '../Loader'

interface GET_CATEGORY {
  __v: number;
  _id: string;
  createdAt: string;
  duration: string;
  maxEndDate: string;
  maxStartDate: string;
  state: string;
  title: string;
  updatedAt: string;
  timeSlots: any;
  playerCount: number;
  megaCount: number;
};
const HomeSportCard = ({ item, index, cardShadowColor, onPress, cardFrom }: { item: GET_CATEGORY, index: number, cardShadowColor?: string, onPress?: () => void, cardFrom?: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePress = async () => {
    if (!onPress) return;
    try {
      setLoading(true);
      await onPress();  // If onPress is not async, you can remove await.
    } catch (error) {
      console.error("Error during press:", error);
    } finally {
      setLoading(false);
    }
  };
  {loading && (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0,0,0,0.4)"
      borderRadius={5}
      zIndex={1}
    >
      <Loader/>
    </Box>
  )}
  


  return (
    <Pressable onPress={handlePress}>
      {/* <Text> ============ {cardFrom} ============</Text> */}
      <Box h={moderateScale(133)} w={'100%'} borderLeftWidth={1} borderRightWidth={1} padding={2} borderEndEndRadius={10}  borderColor={colors.gold}  borderRadius={5} mb={moderateScaleVertical(15)} >
        <Box flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(25)} py={5} px={15} overflow='hidden'>
          {/* <Box flexDirection='row' alignItems='center' justifyContent='space-between' w={moderateScale(320)}> */}
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} fontWeight='800' color={colors.deepPurple} >{item?.title}</Text>
          <Box >
          </Box>
          {cardFrom === 'upcoming' && (<Box flexDirection='row' alignItems='center' gap={moderateScale(20)}>
            <Pressable hitSlop={20} onPress={() => { }} >
              <Icon as={FavouriteIcon} w="$4" h="$4" color={colors.themeRed} />
            </Pressable>
            <Icon as={BellIcon} w="$4" h="$4" color={colors.themeRed} />
          </Box>)}
          {cardFrom === 'live' && <Box >
            <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />
          </Box>}

          {cardFrom === 'winnings' &&
            <Box >
              <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />
            </Box>
          }
        </Box>

        <Box alignSelf='center' flexDirection='row' alignItems='center' justifyContent='space-between' px={10} py={moderateScale(18)}>

          {cardFrom === 'live' && <>
            <Box gap={5} alignItems='center'>
              <CardTimer endTime={item?.timeSlots?.endTime} color={colors.red} startTime={item?.timeSlots?.startTime} />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={2} textAlign="center">Next contest is at {format(item?.timeSlots?.endTime, "hh:mm a")}</Text>
            </Box>
          </>}

          {cardFrom === 'upcoming' && <>
            <Box gap={5} alignItems='center'>
              <Text fontFamily="$robotoMedium" fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">
                {format(item?.timeSlots?.startTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? <CardTimer endTime={item?.timeSlots?.endTime} color={colors.red} /> : format(item?.timeSlots?.startTime, "hh:mm a")}
              </Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">Upcoming contest is at {format(item?.timeSlots?.startTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? format(item?.timeSlots?.endTime, "hh:mm a") : format(item?.timeSlots?.endTime, "dd MMM yyyy hh:mm a")}</Text>
            </Box>
          </>}

          {cardFrom === 'winnings' && <>
            <Box gap={5} alignSelf='center' alignItems='center'>
              <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={14} color={'#c20c0d'} numberOfLines={1} >{formatDate(item?.timeSlots?.endTime, "hh:mm a")}</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">{format(item?.timeSlots?.endTime, "dd MMM yyyy")}</Text>
            </Box>
          </>}

        </Box>
        <Box flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(35)} borderTopColor={colors.gray8} py={5} px={10} overflow='hidden'>
          <Box py={3} px={5} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
          
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? `Selected Contests : ${item?.selectedContest}` : cardFrom === 'live' ? `Playing Contests: ${item?.playingContest}` : `Played Contests: ${item?.playedContest}`}</Text>
          </Box>
          <Box display={cardFrom === 'upcoming' || cardFrom === 'live' ? 'flex' : 'none'} py={3} px={8} borderRadius={10} alignItems='center' justifyContent='center'>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? `Mega \u20B9 ${formatAmount(item?.megaCountupcoming)}` : `Mega \u20B9 ${formatAmount(item?.megaCountlive)}`}</Text>
          </Box>
          <Box display={cardFrom === 'winnings' ? 'flex' : 'none'} py={3} px={5} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
            <MyMatchYellowColorIcon />
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? `Mega \u20B9 ${formatAmount(item?.megaCountupcoming)}` : cardFrom === 'live' ? `Mega \u20B9 ${formatAmount(item?.megaCountlive)}` : `You have won \u20B9 ${formatAmount(item?.contestWinning)}`}</Text>
          </Box>
        </Box>

      </Box>
    </Pressable>
  )
}

export default React.memo(HomeSportCard);