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

  const linking = {
    prefixes: ['com.indiawonbybid.app://'],
    config: {
      screens: {
        TransactionSuccessful: {
          path: 'transaction-successful',
          parse: {
            amount: Number,
            bonus: Number,
            bonusCashExpireDate: (value: any) => value, // parse as string
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <MainNavigation />
    </NavigationContainer>
  )
}

export default AppNavigator