import React, { useContext, useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { BellIcon, Box, Pressable, Spinner } from '@gluestack-ui/themed'
import { moderateScale } from '../utils/responsiveSize'
import { NavigationString } from '../navigation/navigationStrings'
import { Icon } from '@gluestack-ui/themed';
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text } from '@gluestack-ui/themed'
import { BackButton, WalletIcon, WinnerIcon } from '../components/Icons'
import useNotification from '../hooks/home/useNotification'
import { AuthContext } from '../utils/authContext'
import axios from 'axios'
import { serverBaseURL } from '../constants/constant'
import NotificationView from '../components/NotificationView'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { RNSVGLinearGradient } from 'react-native-svg'
import Loader from '../components/Loader'
// import Pdf from 'react-native-pdf';

const Notification = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { userInfo }: any = useContext(AuthContext)
  const [notifications, setNotifications] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [refresh, setRefresh] = useState<boolean>(false)
  // console.log("userInfo: ", userInfo?.userId);

  // const { data: result, isLoading, error } = useNotification(userInfo?.userId)

  const getAllNotifications = async () => {
    return await axios.get(`${serverBaseURL}notify/notifications/${userInfo?.userId}`).then((response) => {
      setNotifications(response.data.notifications)
      setLoading(false)
    }).catch((error) => {
      console.log("error on getAllNotification: ", error);
      setLoading(false)
    })
  }

  const handleRefresh = () => {
    setRefresh(true)
    // setRefreshing(true);
    getAllNotifications();
    setTimeout(() => {
      setRefresh(false)
    }, 2000);
  };


  useEffect(() => {
    getAllNotifications()
  }, [loading, refresh])

  // left icon for top bar
  const LeftAppBar = () => {
    return (
      <Box flexDirection='row' alignItems='center' px={moderateScale(10)} gap={moderateScale(15)}>
        <Pressable hitSlop={22} onPress={() => { navigation?.goBack() }}>
          <BackButton />
        </Pressable>

        <Box>
          <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1}>Notification</Text>
        </Box>
      </Box>
    )
  }



  const RightIcon = () => {
    return (
      <Box flexDirection='row' bg='black' alignItems='center' gap={15} w={moderateScale(250)}>
        {/* <Pressable onPress={() => navigation.navigate(NavigationString.Notification)}>
          <Box  flexDirection='row' alignItems='center' py={8} px={7} borderRadius={10} gap={10}>
            <Icon as={BellIcon} color={colors.white} w="$5" h="$5" />
          </Box>
        </Pressable> */}
        <Pressable onPress={() => navigation.navigate(NavigationString.Winners)}>
          <Box flexDirection='row' alignItems='center' py={8} px={7} borderRadius={10} gap={10}>
            <WinnerIcon />
          </Box>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(NavigationString.MyWallet)}>
          <Box flexDirection='row' alignItems='center' py={7} px={7} mr={moderateScale(20)} borderRadius={10} gap={10}>
            <WalletIcon />
          </Box>
        </Pressable>
      </Box>
    )
  }


  return (
    <LinearGradient as={RNSVGLinearGradient} colors={[colors.black, colors.black]} locations={[0.65, 1]} useAngle={true} angle={205} angleCenter={{ x: -0.2, y: 0.1 }} style={{ flex: 1 }}      >

      {/* <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} > */}
      <AppBar left={<LeftAppBar />} right={<RightIcon />} />

      <FlatList data={notifications} renderItem={({ item }) => <NotificationView item={item} />} refreshing={refresh} onRefresh={handleRefresh} />

      {loading && (<Box w={'100%'} h={'100%'} justifyContent='center' alignItems='center' ><Loader /></Box>)}

      {/* </Container> */}
    </LinearGradient>
  )
}

export default Notification