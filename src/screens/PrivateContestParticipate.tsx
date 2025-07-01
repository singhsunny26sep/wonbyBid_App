import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Box } from '@gluestack-ui/themed'
import { Pressable } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { FlatList } from 'react-native'
import { ParamListBase, useNavigation } from '@react-navigation/native'

import { colors } from '../constants/colors'
import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import SportCard from '../components/SportCard/SportCard'
import { shadowStyle } from '../constants/constant'
import { NavigationString } from '../navigation/navigationStrings'

const PrivateContestParticipate = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
      <AppBar back title='Participants' />
      <Box flexDirection='row' alignItems='center' alignSelf='center' bgColor={colors.white} style={shadowStyle}>
        <Pressable onPress={() => navigation.navigate(NavigationString.CreatePrivateContest)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>Create Contest</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(NavigationString.JoinPrivateContest)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>Join Contest</Text>
        </Pressable>
        {/* <Pressable onPress={() => navigation.navigate(NavigationString.PrivateContestParticipate)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.themeRed} borderBottomWidth={2} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}>Participants</Text>
        </Pressable> */}
      </Box>

      <FlatList
        data={['01', '02', '03', '04', '05', '06', '07', '08']}
        renderItem={({ item, index }: { item: any, index: number }) => <SportCard key={item} item={item} index={index} cardShadowColor={'#ff4757'} privatecontest={true} onPress={() => navigation.navigate(NavigationString.ContestList, { cardFrom: 'winnings' })} cardFrom='participants'/>}
        keyExtractor={(item: any) => item}
        style={{ flex: 1, marginTop: responsiveHeight(1.5) }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: responsiveWidth(5), marginHorizontal: responsiveWidth(4) }}
      />
    </Container>
  )
}

export default PrivateContestParticipate