import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Box, Text } from '@gluestack-ui/themed';

import { colors } from '../../constants/colors';
import { HomeColorIcon, HomeIcon, MyMatchColorIcon, MyMatchIcon, ReferEarnColorIcon, ReferEarnIcon, } from '../../components/Icons';
import { StackRoute } from '../navigationRoutes';
import { NavigationString } from '../navigationStrings';
import { moderateScale } from '../../utils/responsiveSize';
import { Alert } from 'react-native';



const BottomTabStack = () => {
  // init
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: colors.black, } }} initialRouteName={NavigationString.Home} >

      <Tab.Screen name={NavigationString.Home} component={StackRoute.Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              {focused ? <HomeColorIcon /> : <HomeIcon />}
              <Text fontFamily={focused ? '$robotoMedium' : '$robotoRegular'} fontSize={12} lineHeight={14} textAlign='center' color={focused ? colors.white : colors.grayish} numberOfLines={1} w={moderateScale(83)} >Home</Text>
            </Box>
          )
        }}
      />
      <Tab.Screen name={NavigationString.MyMatches} component={StackRoute.MyMatches}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              {focused ? <MyMatchColorIcon /> : <MyMatchIcon />}
              <Text fontFamily={focused ? '$robotoMedium' : '$robotoRegular'} fontSize={12} lineHeight={14} textAlign='center' color={focused ? colors.white : colors.grayish} numberOfLines={1} w={moderateScale(83)} >My Matches</Text>
            </Box>
          )
        }}
      />
      <Tab.Screen
        name={NavigationString.PrivateContest}
        component={StackRoute.PrivateContest}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box alignItems="center" justifyContent="center" gap={3}>
              {focused ? <ReferEarnColorIcon /> : <ReferEarnIcon />}
              <Text
                fontFamily={focused ? '$robotoMedium' : '$robotoRegular'}
                fontSize={12}
                lineHeight={14}
                textAlign="center"
                color={focused ? colors.white : colors.grayish}
                numberOfLines={1}
                w={moderateScale(83)}
              >
                Private Contest
              </Text>
            </Box>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Stop default navigation
            Alert.alert('Coming Soon', 'This feature will be available soon.');
          },
        }}
      />


    </Tab.Navigator>
  )
}

export default BottomTabStack