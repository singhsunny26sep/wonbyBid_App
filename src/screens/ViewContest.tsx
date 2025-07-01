import { Box, Pressable, CheckCircleIcon, CloseIcon, Icon, Image, Text, DownloadIcon } from '@gluestack-ui/themed'
import { Slider } from '@narodejesus/react-native-slider'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationString } from '../navigation/navigationStrings'
import { useState } from 'react'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import PrimaryButton from '../components/Button/PrimaryButton'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { imgIcon } from '../assets/icons'
import { MLetterIcon, MyMatch15Icon, MyMatchYellowColorIcon, RupeeCircleIcon, SingleLetterIcon, WLetterIcon } from '../components/Icons'
import Body from '../components/Body/Body'
import { shadowStyle } from '../constants/constant'
import { Switch } from '@gluestack-ui/themed'
import Tooltip from 'rn-tooltip'

const ViewContest = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute()
  const { flexible, cardFrom }: any = route.params

  // states
  const [selectLeaderBoard, setSelectLeaderBoard] = useState<string>('winnings')
  const [selectedFill, setSelectedFill] = useState('max')

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white}>
      <AppBar title='' back />
      <Body>
        <Box backgroundColor={colors.white} borderWidth={2} borderColor={colors.paleGray} pt={10} gap={8} borderRadius={10} overflow="hidden">
          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1}>Prize Pool</Text>
            {flexible === 'Yes' && (<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1}>Max Prize Pool</Text>)}

          </Box>

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1}>{'\u20B9'}40,000</Text>
            {flexible === 'Yes' && (<Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1}>{'\u20B9'}60,000</Text>)}

          </Box>

          <Slider
            minimumValue={0}
            maximumValue={100}
            maximumTrackTintColor={'#fdebeb'}
            minimumTrackTintColor={colors.gold}
            maximumTrackStyle={{ height: moderateScale(6) }}
            minimumTrackStyle={{ height: moderateScale(6) }}
            thumbTintColor="transparent"
            value={40}
            onValueChange={(value) => { }}
            containerStyle={{ height: moderateScale(12), marginHorizontal: moderateScale(10) }}
          />

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.themeRed} numberOfLines={1}>8,637 spots left</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >13,605 spots</Text>
          </Box>

          <PrimaryButton display={cardFrom === 'live' ? 'flex' : 'none'} buttonText={`Join ${'\u20B9'} 20`} onPress={() => navigation.navigate(NavigationString.BookBids)} height={moderateScale(32)} backgroundColor={colors.greenText} marginHorizontal={moderateScale(10)} marginBottom={moderateScaleVertical(10)} />

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' backgroundColor={colors.paleGray} px={10} py={15}>
            <Box flexDirection="row" alignItems="center" gap={10}>
              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >First Prize = {'\u20B9'}25,000</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <Image alt="icon" source={imgIcon.prize1} w={moderateScale(15)} h={moderateScale(15)} resizeMode="contain" />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{'\u20B9'}25,000</Text>
                </Box>
              </Tooltip>

              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >7,516 teams win the contest</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <MyMatch15Icon />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >62%</Text>
                </Box>
              </Tooltip>

              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(50)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >Max 20 entries per user in this contest</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  {flexible ? <SingleLetterIcon /> : <MLetterIcon />}
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Upto 20</Text>
                </Box>
              </Tooltip>

              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(35)} width={moderateScale(260)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >You can use 4.3 cash bonus for every entry</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <Image alt="icon" source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} alignSelf='baseline' resizeMode="contain" />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Use 4.3</Text>
                </Box>
              </Tooltip>
            </Box>
            <Box flexDirection="row" alignItems="center" gap={5}>
              {flexible === 'Yes' ? <RupeeCircleIcon /> : <Icon as={CheckCircleIcon} w="$4" h="$4" color={colors.greenText} />}
              <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={1} >{flexible === 'Yes' ? 'Flexible' : 'Guaranteed'}</Text>
            </Box>
          </Box>

        </Box>

        {/* <Box backgroundColor={'#fdebeb'} flexDirection="row" alignItems="center" justifyContent='space-between' px={15} py={15}>
          <Box flexDirection="row" alignItems="center" >
          <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={'#c0392b'} numberOfLines={1}>Earn </Text>
          <Image alt="icon" source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} alignSelf='baseline' resizeMode="contain" />
          <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={'#c0392b'} numberOfLines={1}> 1 for every contest entry</Text>

          </Box>
          <Icon as={CloseIcon} w={moderateScale(20)} h={moderateScale(20)} color={'#c0392b'} />
        </Box> */}
        <Box flexDirection='row' alignItems='center' marginHorizontal={moderateScale(15)} gap={moderateScale(15)}>
          <Pressable onPress={() => { setSelectLeaderBoard('winnings') }} borderBottomWidth={selectLeaderBoard === 'winnings' ? 3 : 0} borderBottomColor={colors.themeRed} width={moderateScale(68)} >
            <Text fontFamily={selectLeaderBoard === 'winnings' ? '$robotoBold' : '$robotoMedium'} fontSize={16} lineHeight={18} color={selectLeaderBoard === 'winnings' ? colors.themeRed : colors.grayish} numberOfLines={1} py={10}>Winnings</Text>
          </Pressable>

          <Pressable display={(cardFrom === 'winnings' || cardFrom === 'privatewinnings') ? 'flex' : 'none'} onPress={() => { setSelectLeaderBoard('leaderboard') }} borderBottomWidth={selectLeaderBoard === 'leaderboard' ? 3 : 0} borderBottomColor={colors.themeRed} width={moderateScale(95)} >
            <Text fontFamily={selectLeaderBoard === 'leaderboard' ? '$robotoBold' : '$robotoMedium'} fontSize={16} lineHeight={18} color={selectLeaderBoard === 'leaderboard' ? colors.themeRed : colors.grayish} numberOfLines={1} py={10}>LeaderBoard</Text>
          </Pressable>
        </Box>


        {(
          <Box borderTopWidth={3} borderTopColor={colors.gray5} py={15} px={15}>

            {selectLeaderBoard === 'leaderboard' ? <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>Bids Count : <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>23</Text></Text>
              <Box flexDirection='row' alignItems='center' gap={5}>
                <MyMatchYellowColorIcon />
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={14} color={colors.black} numberOfLines={1}>You have won {'\u20B9'} 200</Text>
              </Box>
            </Box>

              : (
                <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>'Be the first in your network to join this contest.'</Text>

              )
            }

          </Box>)}

        <Box display={(flexible === 'Yes' && selectLeaderBoard === 'winnings') ? 'flex' : 'none'} flexDirection='row' alignItems='center' justifyContent='center' gap={10} paddingVertical={moderateScaleVertical(10)} borderTopWidth={3} borderTopColor={colors.gray5}>
          <Pressable onPress={() => setSelectedFill('max')} bgColor={selectedFill === 'max' ? '#2f3542' : colors.paleGray} w={moderateScale(110)} h={moderateScale(30)} alignItems='center' justifyContent='center' borderRadius={5}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={selectedFill === 'max' ? colors.white : '#2f3542'} numberOfLines={1}>Max Fill</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedFill('current')} bgColor={selectedFill === 'current' ? '#2f3542' : colors.paleGray} w={moderateScale(110)} h={moderateScale(30)} alignItems='center' justifyContent='center' borderRadius={5}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={selectedFill === 'current' ? colors.white : '#2f3542'} numberOfLines={1}>Current Fill</Text>
          </Pressable>
        </Box>

        <Box display={selectLeaderBoard === 'winnings' ? 'flex' : 'none'} >
          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={40} py={10} borderTopWidth={1} borderTopColor={colors.paleGray} borderBottomWidth={1} borderBottomColor={colors.paleGray}>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>RANK</Text>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>WINNINGS</Text>
          </Box>

          {flexible === 'No' ? <>
            {
              ['1', '2', '3', '4', '5', '6 - 10', '11-20', '20-30', '30-40']?.map((item, index) => {
                return (
                  <Box key={item} flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={40} borderBottomWidth={1} borderBottomColor={colors.paleGray}>
                    {item === '1' ? <Image alt='icon' source={imgIcon.firstprize} resizeMode='contain' w={moderateScale(25)} h={moderateScale(25)} /> : item === '2' ? <Image alt='icon' source={imgIcon.secondprize} resizeMode='contain' w={moderateScale(25)} h={moderateScale(25)} /> : item === '3' ? <Image alt='icon' source={imgIcon.thirdprize} resizeMode='contain' w={moderateScale(25)} h={moderateScale(25)} /> : <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}># {item}</Text>}
                    {/* <Box flexDirection='row' alignItems='center' gap={5}>
                      <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}>{'\u20B9'} 10,000 {item === '2' && '+'}</Text>
                      <Image display={item === '2' ? 'flex' : 'none'} alt="icon" source={imagePaths.bagIcon} w={moderateScale(15)} h={moderateScale(15)} alignSelf='center' resizeMode="contain" />

                    </Box> */}
                    <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}>{'\u20B9'} 10,000</Text>

                  </Box>
                )
              })
            }
          </> : <>
            {
              selectedFill === 'max' ? (
                <Box flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={40} borderBottomWidth={1} borderBottomColor={colors.paleGray}>
                  <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}># 1-2</Text>
                  <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}>{'\u20B9'} 75,000</Text>
                </Box>
              ) : (
                ['1-50', '52']?.map((item, index) => {
                  return (
                    <Box key={index?.toString()} flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={40} borderBottomWidth={1} borderBottomColor={colors.paleGray}>
                      <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}># {item}</Text>
                      <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}>{'\u20B9'} 75,000</Text>
                    </Box>
                  )
                })
              )
            }

          </>}
        </Box>

        <Box display={selectLeaderBoard === 'leaderboard' ? 'flex' : 'none'}>
          <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={15} py={8} bgColor={colors.gray5}>
            <Box w={moderateScale(35)} h={moderateScale(35)} alignItems='center' justifyContent='center' bgColor={colors.white} borderRadius={moderateScale(8)} style={shadowStyle}>
              <Icon as={DownloadIcon} color={colors.mediumBlue} w="$6" h="$6" />
            </Box>

            <Box flexDirection='row' alignItems='center' gap={5}>
              <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1}>My Friends</Text>
              <Switch size="md" sx={{
                _light: {
                  props: {
                    trackColor: {
                      false: "$backgroundLight300",
                      true: colors.themeRed,
                    },
                  },
                },
              }} isDisabled={false} />
            </Box>
          </Box>

          <Box flexDirection="row" px={15} py={12} borderTopWidth={1} borderTopColor={colors.paleGray} bgColor={colors.gray10}>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} flex={1} textAlign='left'>RANK</Text>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} flex={1} textAlign='left'>NAME</Text>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} flex={1} textAlign='center'>WON</Text>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} flex={1} textAlign='right'>BID AMOUNT</Text>
          </Box>
        </Box>

        {selectLeaderBoard === 'leaderboard' && <>
          {['1', '2', '3', '4', '5']?.map((item, index) => {
            return (
              <Box key={item} flexDirection="row" alignItems="center" justifyContent='space-between' px={15} py={12} borderBottomWidth={3} borderBottomColor={colors.white} bgColor={index === 2 || index === 0 ? '#fff9eb' : colors.gray10}>
                <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} flex={1} textAlign='left'>{item}</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} flex={1} textAlign='left'>champ{item}</Text>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.greenText} numberOfLines={1} flex={1} textAlign='center'>{'\u20B9'} {(204 + Number(item))}</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} flex={1} textAlign='right'>{'\u20B9'} 10</Text>
              </Box>
            )
          })}
        </>
        }

        <Box bgColor={colors.paleGray} mx={15} h={moderateScale(45)} px={5} py={5} justifyContent='center' alignItems='center' borderRadius={6} my={moderateScaleVertical(15)}>
          <Text fontFamily='$robotoMedium' textAlign='center' fontSize={10} lineHeight={12} color={colors.grayish} numberOfLines={3}>As per the government regulations, starting 1st April 2023 a tax of 30% will be levied at the time of withdrawal or at the end of financial year on the net winnings.</Text>
        </Box>



      </Body>
    </Container>
  )
}

export default ViewContest