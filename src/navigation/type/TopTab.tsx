import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationString } from '../navigationStrings';
import { StackRoute } from '../navigationRoutes';
import { Box, Text } from '@gluestack-ui/themed';
import { BasketBallColorIcon, BasketBallIcon, CircketColorIcon, CircketIcon, FootBallColorIcon, FootBallIcon } from '../../components/Icons';
import { colors } from '../../constants/colors';
import { responsiveWidth } from 'react-native-responsive-dimensions';


const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  return (
    <Tab.Navigator style={{
      borderTopLeftRadius: responsiveWidth(5),
      borderTopRightRadius: responsiveWidth(5),


    }} screenOptions={{
      tabBarIndicatorStyle: { backgroundColor: colors.brightNavyBlue }, tabBarStyle: {
        backgroundColor: colors.gray9, //Color of your choice
        borderBottomColor: colors.brightNavyBlue,

      }
    }} >
      <Tab.Screen name={NavigationString.Cricket} component={StackRoute.Cricket}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              {focused ? <CircketColorIcon /> : <CircketIcon />}
            </Box>
          ),
          tabBarLabel: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              <Text fontFamily={focused ? '$robotoMedium' : '$robotoMedium'} fontSize={12} lineHeight={14} color={focused ? colors.brightNavyBlue : colors.dimGray} >Cricket</Text>
            </Box>
          ),
        }}
      />
      <Tab.Screen name={NavigationString.Kabaddi} component={StackRoute.Kabaddi}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              {focused ? <CircketColorIcon /> : <CircketIcon />}
            </Box>
          ),
          tabBarLabel: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              <Text fontFamily={focused ? '$robotoMedium' : '$robotoMedium'} fontSize={12} lineHeight={14} color={focused ? colors.brightNavyBlue : colors.dimGray} >Kabaddi</Text>
            </Box>
          ),
        }} />
      <Tab.Screen name={NavigationString.Football} component={StackRoute.Football}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              {focused ? <FootBallColorIcon /> : <FootBallIcon />}
            </Box>
          ),
          tabBarLabel: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              <Text fontFamily={focused ? '$robotoMedium' : '$robotoMedium'} fontSize={12} lineHeight={14} color={focused ? colors.brightNavyBlue : colors.dimGray} >Football</Text>
            </Box>
          ),
        }} />
      <Tab.Screen name={NavigationString.BasketBall} component={StackRoute.BasketBall}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              {focused ? <BasketBallColorIcon /> : <BasketBallIcon />}
            </Box>
          ),
          tabBarLabel: ({ focused }) => (
            <Box alignItems='center' justifyContent='center' gap={3}>
              <Text fontFamily={focused ? '$robotoMedium' : '$robotoMedium'} fontSize={12} lineHeight={14} color={focused ? colors.brightNavyBlue : colors.dimGray} >BasketBall</Text>
            </Box>
          ),

        }} />

    </Tab.Navigator>
  );
}

export default TopTabNavigation;

