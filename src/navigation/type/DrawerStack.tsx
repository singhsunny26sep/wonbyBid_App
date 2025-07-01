import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackRoute } from '../navigationRoutes';
import { NavigationString } from '../navigationStrings';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { moderateScale } from '../../utils/responsiveSize';
import { AvatarImage, Box, Pressable, Text } from '@gluestack-ui/themed';
import { Image } from '@gluestack-ui/themed';
import { colors } from '../../constants/colors';
import { useContext } from 'react';
import { AuthContext } from '../../utils/authContext';

const Drawer = createDrawerNavigator();

const Header = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { userInfo }: any = useContext(AuthContext)

  return (
    <Box flexDirection='row' alignItems='center' justifyContent='space-between' mr={40} alignSelf='flex-end' >
      <Pressable onPress={() => navigation.navigate(NavigationString.Setting)}>
        <Box h={moderateScale(30)} w={moderateScale(30)} borderRadius={moderateScale(35)} >
          {/* <Image alt='icon' source={{ uri: 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png' }} h={'100%'} w={'100%'} resizeMode='contain' /> */}
          <AvatarImage source={{ uri: userInfo?.profile ? userInfo?.profile : 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} alt='profile image' />
        </Box>
      </Pressable>

      <Box></Box>
      <Text color={colors.white}>Add</Text>
    </Box>
  )
}

const DrawerStack = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name={NavigationString.BottomTabBar} component={StackRoute.BottomTabStack}
        options={{
          headerShown: true,
          headerTitle: '',
          headerRight: () => (<Pressable onPress={() => navigation.navigate(NavigationString.Setting)}>
            <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)} mr={15}>
              <Image alt='icon' source={{ uri: 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png' }} h={'100%'} w={'100%'} resizeMode='contain' />
            </Box>
          </Pressable>),
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.brightNavyBlue,

            // height: 120,
          }

        }}
      />
      <Drawer.Screen name={NavigationString.Home} component={StackRoute.Home} />
      <Drawer.Screen name={NavigationString.Setting} component={StackRoute.Setting} />
    </Drawer.Navigator>
  );
}

export default DrawerStack;