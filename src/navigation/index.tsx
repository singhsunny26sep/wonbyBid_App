import { View, Text } from 'react-native'
import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import MainNavigation from './type/MainStack';
import { colors } from '../constants/colors';

const AppNavigator = () => {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.brightNavyBlue,
    },
  };

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  )
}

export default AppNavigator