import { Box, Image, Text, LinearGradient, Pressable, Icon, FavouriteIcon, BellIcon } from '@gluestack-ui/themed'
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"

import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { colors } from '../../constants/colors'
import { CircleGreenTick, MyMatch15Icon, MyMatchYellowColorIcon } from '../Icons'
import { CheckCircleIcon } from '@gluestack-ui/themed'
import CountDown from 'new-react-native-countdown-component'
import { format, formatDate, isToday } from 'date-fns'
import CardTimer from '../../utils/CardTimer'

interface GET_CATEGORY {
  __v: number;
  _id: string;
  createdAt: string;
  duration: string;
  categoryName: string;
  updatedAt: string;
  endDateTime: string;
  startDateTime: string;
};


const PrivateSportCard = ({ item, index, cardShadowColor, onPress, cardFrom }: { item: GET_CATEGORY, index: number, cardShadowColor?: string, onPress?: () => void, cardFrom?: string }) => {

  // console.log("item: ", item);

  return (
    <Pressable onPress={onPress}>
      <Box h={moderateScale(130)} w={'100%'} borderEndWidth={1} borderStartWidth={1} borderColor={colors.gold} backgroundColor={colors.black} borderRadius={10} elevation={2} overflow='hidden' >
        <Box flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(25)} bgColor={colors.black}  py={5} px={10} overflow='hidden'>
          {/* <Box flexDirection='row' alignItems='center' justifyContent='space-between' w={moderateScale(320)}> */}
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.deepPurple} >{item?.categoryName}</Text>
          <Box >
          </Box>
          {cardFrom === 'upcoming' && (<Box flexDirection='row' alignItems='center' gap={moderateScale(20)}>
            {/* <Icon as={FavouriteIcon} w="$4" h="$4" color={colors.red} /> */}
            {/* <Icon as={BellIcon} w="$4" h="$4" color={colors.gold} /> */}
          </Box>)}

          {cardFrom === 'live' && <Box >
            <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />
          </Box>}
        </Box>
        <LinearGradient as={RNLinearGradient} colors={['black', 'black']} useAngle={true} angle={172} angleCenter={{ x: -0.2, y: 0.1 }} flexDirection='row' alignItems='center' justifyContent='space-between' px={10} py={moderateScale(35)}>
          <Box></Box>
          {cardFrom === 'live' &&
            <Box gap={5} alignItems='center'>
              <CardTimer endTime={item?.endDateTime} color={colors.red} startTime={item?.startDateTime} />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">Next contest is at {format(item?.endDateTime, "hh:mm a")}</Text>
            </Box>
          }
          {cardFrom === 'upcoming' &&
            <Box gap={5} alignItems='center'>
              <Text fontFamily="$robotoMedium" fontSize={12} lineHeight={14} color={colors.red} numberOfLines={2} textAlign="center">
                {format(item?.startDateTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? <CardTimer endTime={item?.startDateTime} color={colors.red} /> : format(item?.startDateTime, "hh:mm a")}
              </Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">Upcoming contest is at {format(item?.startDateTime, "dd MMM yyyy")}</Text>
            </Box>
          }
          {cardFrom === 'winnings' &&
            <Box gap={5} alignItems='center'>
              <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={14} color={'#c20c0d'} numberOfLines={1} >{formatDate(item?.endDateTime, "hh:mm a")}</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">{format(item?.endDateTime, "dd MMM yyyy")}</Text>
            </Box>
          }
          <Box></Box>

        </LinearGradient>

        <Box flexDirection='row' alignItems='center'  justifyContent='space-between' h={moderateScale(35)}  py={5} px={10} overflow='hidden'>
          <Box bgColor='#fdf9e5' py={3} px={5} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
            {/* <MyMatchYellowColorIcon /> */}
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>{cardFrom === 'upcoming' ? 'Selected Contests : 10' : cardFrom === 'live' ? 'Playing Contests: 12' : 'Played Contests: 12'}</Text>
          </Box>
          {/* <Box bgColor='#fdf9e5' py={3} px={8}  borderRadius={10} alignItems='center' justifyContent='center'>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>{cardFrom === 'winnings' ? 'Played Contests: 12' : `Mega \u20B9 3.5 Cr`}</Text>
          </Box> */}


          <Box display={cardFrom === 'upcoming' || cardFrom === 'live' ? 'flex' : 'none'} bgColor='#fdf9e5' py={3} px={8} borderRadius={10} alignItems='center' justifyContent='center'>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>{cardFrom === 'upcoming' ? 'Mega \u20B9 3.5 Cr' : `Mega \u20B9 3.5 Cr`}</Text>
          </Box>

          <Box display={cardFrom === 'winnings' ? 'flex' : 'none'} bgColor='#fdf9e5' py={3} px={5} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
            <MyMatchYellowColorIcon />
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>{cardFrom === 'upcoming' ? `Mega \u20B9 3.5 Cr` : cardFrom === 'live' ? `Mega \u20B9 3.5 Cr` : `You have won \u20B9 3.5 Cr`}</Text>
          </Box>

        </Box>

      </Box>
    </Pressable>



  )
}

export default PrivateSportCard;

/* 
{cardFrom === 'live' && <>
            <Box gap={5} alignItems='center'>
              <CardTimer endTime={item?.timeSlots?.endTime} color={colors.red} startTime={item?.startDateTime} />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">Next contest is at {format(item?.timeSlots?.endTime, "hh:mm a")}</Text>
            </Box>
          </>}

          {cardFrom === 'upcoming' && <>
            <Box gap={5} alignItems='center'>
              <Text fontFamily="$robotoMedium" fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">
                {format(item?.startDateTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? <CardTimer endTime={item?.startDateTime} color={colors.red} /> : format(item?.startDateTime, "hh:mm a")}
              </Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">Upcoming contest is at {format(item?.startDateTime, "dd MMM yyyy")}</Text>
            </Box>
          </>}

          {cardFrom === 'winnings' && <>
            <Box gap={5} alignItems='center'>
              <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={14} color={'#c20c0d'} numberOfLines={1} >{formatDate(item?.timeSlots?.endTime, "hh:mm a")}</Text>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">{format(item?.timeSlots?.endTime, "dd MMM yyyy")}</Text>
            </Box>
          </>}

*/