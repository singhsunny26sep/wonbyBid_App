import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Box, Text } from '@gluestack-ui/themed';

import { colors } from '../../constants/colors';
import { BackButton, } from '../Icons';
colors

type AppBarProps = {
  left?: any;
  back?: boolean;
  right?: any;
  title?: string;
  elevation?: number;
  onCustomBackPress?: () => void;
  onBackPress?: () => void;
  onClear?: () => void;
  whiteBack?: boolean;
  fontFamily?: any;
  backgroundColor?: string;
  textColor?: string;
};

export function AppBar(props: AppBarProps) {
  const { left, right, back, title, elevation = 5,onClear=undefined, onBackPress=undefined, onCustomBackPress = undefined, fontFamily, backgroundColor = colors.themeRed, textColor = '#ffffff' } = props;
  const navigation = useNavigation()

  const handaleGOBack = ()=>{
    if(onClear){
      onClear()
    }
    if(onBackPress){
      onBackPress()
    }
    navigation.goBack()
   
  }

  return (
    <Box flexDirection={'row'} backgroundColor={backgroundColor} elevation={elevation} height={50}>
      {back ? (
        <Box marginLeft={1} alignItems={'center'} justifyContent={'center'} flex={1}>
          <Pressable hitSlop={22} onPress={onCustomBackPress ?? handaleGOBack}>
            <BackButton />
          </Pressable>
        </Box>
      ) : (left)}
      <Box flex={8} justifyContent='center' alignItems='center' marginLeft={!back ? 25 : 0}>
        <Text fontFamily='$robotoMedium' color={colors.gold}  lineHeight={20} fontSize={18}>{title}</Text>
      </Box>
      <Box alignItems={'center'} justifyContent={'center'} flex={1}>{right}</Box>
    </Box>
  );
}

