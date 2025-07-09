import { Box, Image, Text, LinearGradient, Pressable, Icon, FavouriteIcon, BellIcon } from '@gluestack-ui/themed'
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"

import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { colors } from '../../constants/colors'
import { CircleGreenTick, MyMatch15Icon, MyMatchYellowColorIcon } from '../Icons'
import { CheckCircleIcon } from '@gluestack-ui/themed'
import { format, formatDate, isToday } from 'date-fns'
import CountDown from 'new-react-native-countdown-component'
import React from 'react'


import CardTimer from '../../utils/CardTimer'
import { formatAmount } from '../../constants/constant'

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
  userId: any;
  categoryId: any;
  categoryStatus: any;

};

const SportCard = ({ item, index, cardShadowColor, onPress, cardFrom }: { item: GET_CATEGORY, index: number, cardShadowColor?: string, onPress?: () => void, cardFrom?: string }) => {
  // init

  console.log("item: ", item);
  console.log("cardFrom: ", cardFrom);

  return (
    <Pressable onPress={onPress}>
      <Box h={moderateScale(133)} w={'100%'} backgroundColor={colors.black} borderRadius={10} borderEndWidth={1} borderLeftWidth={1} borderColor={colors.gold} elevation={2} mb={moderateScaleVertical(15)} >
        <Box flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(25)} bgColor={colors.black} py={5} px={15} overflow='hidden'>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.deepPurple} >{item?.title}</Text>
          <Box >
          </Box>
          {cardFrom === 'upcoming' && (<Box flexDirection='row' alignItems='center' gap={moderateScale(20)}>
            {/* <Pressable hitSlop={20} onPress={() => { }} >
              <Icon as={FavouriteIcon} w="$4" h="$4" color={colors.white} />
            </Pressable> */}
            {/* <Icon as={BellIcon} w="$4" h="$4" color={colors.white} /> */}
          </Box>)}

          {cardFrom === 'live' && <Box >
            <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />
          </Box>}
          {cardFrom === 'winnings' && <Box >
            <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />
          </Box>}
        </Box>


        <Box alignSelf='center' flexDirection='row' alignItems='center' justifyContent='space-between' px={10} py={moderateScale(18)}>
          {cardFrom === 'live' && <>
            <Box gap={5} alignItems='center'>
              <CardTimer endTime={item?.endTime} color={colors.red} startTime={item?.startTime} />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={2} textAlign="center">Next contest is at {format(item?.endTime, "hh:mm a")}</Text>
            </Box>
          </>}

          {cardFrom === 'upcoming' && <>
            <Box gap={5} alignItems='center'>
              <Text fontFamily="$robotoMedium" fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">
                {format(item?.startTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? <CardTimer endTime={item?.endTime} color={colors.red} /> : format(item?.startTime, "hh:mm a")}
              </Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">Upcoming contest is at {format(item?.startTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? format(item?.endTime, "hh:mm a") : format(item?.endTime, "dd MMM yyyy hh:mm a")}</Text>
            </Box>
          </>}

          {cardFrom === 'wining' && <>
            <Box gap={5} alignSelf='center' alignItems='center'>
              <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={14} color={'#c20c0d'} numberOfLines={1} >{formatDate(item?.endTime, "hh:mm a")}</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">{format(item?.endTime, "dd MMM yyyy")}</Text>
            </Box>
          </>}
        </Box>
        <Box flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(35)} py={5} px={10} overflow='hidden'>

          <Box display={cardFrom === 'winnings' ? 'flex' : 'none'} bgColor='black' py={3} px={5} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
            <MyMatchYellowColorIcon />
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? `Mega \u20B9 3.5 Cr` : cardFrom === 'live' ? `Mega \u20B9 3.5 Cr` : `You have won \u20B9 3.5 Cr`}</Text>
          </Box>

          {/* <Box width={'100%'} flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(35)} py={5} overflow='hidden'>
            <Box py={3} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? `Selected Contests : ${item?.selectedContest}` : cardFrom === 'live' ? `Playing Contests: ${item?.playingContest || 0}` : `Played Contests: ${item?.playedContest || 0}`}</Text>
            </Box>
            <Box display={cardFrom === 'upcoming' || cardFrom === 'live' ? 'flex' : 'none'} py={3} px={8} borderRadius={10} alignItems='center' justifyContent='center'>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? `Mega \u20B9 ${formatAmount(item?.megaCountupcoming)}` : `Mega \u20B9 ${formatAmount(item?.megaCountlive || 0)}`}</Text>
            </Box>
            <Box display={cardFrom === 'winnings' ? 'flex' : 'none'} py={3} px={5} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
              <MyMatchYellowColorIcon />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? `Mega \u20B9 ${formatAmount(item?.megaCountupcoming)}` : cardFrom === 'live' ? `Mega \u20B9 ${formatAmount(item?.megaCountlive || 0)}` : `You have won \u20B9 ${formatAmount(item?.contestWinning || 0)}`}</Text>
            </Box>
          </Box> */}
        </Box>


      </Box>
    </Pressable>
  )
}

export default React.memo(SportCard);