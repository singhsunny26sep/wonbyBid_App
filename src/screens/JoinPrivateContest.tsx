import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Box, Pressable, Text } from '@gluestack-ui/themed'
import { NavigationString } from '../navigation/navigationStrings'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import InputText from '../components/TextInput/InputText'
import PrimaryButton from '../components/Button/PrimaryButton'
import { shadowStyle } from '../constants/constant'
import useJoinPrivateContest from '../hooks/private/join-private-contest'
import { useState } from 'react'

const JoinPrivateContest = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [joiningCode,setJoiningCode] = useState('')
   
  // api
  const useJoinPrivateContestMutation = useJoinPrivateContest()

  const handleJoinPrivateContest = () => {
    useJoinPrivateContestMutation.mutate({contestId:joiningCode},{
      onSuccess:(data)=>{
        console.log(data.status,'resp join');
        
      }
    })
  }

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title='Join Private Contest' />
      <Box flexDirection='row' alignItems='center' alignSelf='center' bgColor={colors.black} style={shadowStyle}>
        <Pressable onPress={() => navigation.navigate(NavigationString.CreatePrivateContest)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} borderBottomColor={colors.gold} lineHeight={16} color={colors.white} numberOfLines={1} py={10}>Create Contest</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(NavigationString.JoinPrivateContest)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} borderBottomWidth={2} borderBottomColor={colors.gold} numberOfLines={1} py={10}>Join Contest</Text>
        </Pressable>
        {/* <Pressable onPress={() => navigation.navigate(NavigationString.PrivateContestParticipate)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>Participants</Text>
        </Pressable> */}
      </Box>

      <Box mx={15} mt={25} gap={30}>
        <InputText  
          label='Join Contest'
          textInputProps={{ 
            placeholder: 'Enter 10 Digit Invite Code',
            value:joiningCode
          }}
          
          onChange={(e)=>{
               setJoiningCode(e)
          }}
          
        />

        <PrimaryButton onPress={handleJoinPrivateContest} buttonText='Join Contest' backgroundColor={colors.mediumBlue} />
      </Box>

    </Container>
  )
}

export default JoinPrivateContest