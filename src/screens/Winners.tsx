import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { AppBar } from '../components/AppBar'
import ParallaxSlider from '../components/WinnerSlider/ParallaxSlider'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import PrimaryButton from '../components/Button/PrimaryButton'
import { NavigationString } from '../navigation/navigationStrings'
import { Box } from '@gluestack-ui/themed'
import { Image } from '@gluestack-ui/themed'
import { imagePaths } from '../assets/images'

const Winners = ({ route }: any) => {
  // init 
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const cardFrom = route?.params?.cardFrom
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.black} backgroundColor={colors.black}>
      <AppBar back title='Top Winners' />

      <ParallaxSlider cardFrom={cardFrom} />

    </Container>
  )
}

export default Winners