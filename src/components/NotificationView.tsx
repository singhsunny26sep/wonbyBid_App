import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { format } from 'date-fns';
import { colors } from '../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NavigationString } from '../navigation/navigationStrings';

const NotificationView = ({ item }: any): React.JSX.Element => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


    const handaleNavigation = (item:{linkPath:string})=>{
      if(item.linkPath==="ViewHomeContest"){
        const {flexible,cardFrom,slotId,isUserJoinContest,contestId} = item?.notficationParamObj
         navigation.navigate(NavigationString.ViewHomeContest,{
          flexible,
          cardFrom,
          slotId,
          isUserJoinContest,
          contestId,
          isDeclare:true
         })
      }else if(item.linkPath==="PrivateViewContest"){
        const {flexible,cardFrom,contestId} = item?.notficationParamObj
        navigation.navigate(NavigationString.PrivateViewContest,
           { flexible,cardFrom,contestId,isDeclare:true})
      }else if(item.linkPath==="BottomTabBar"){
        navigation.navigate(NavigationString.BottomTabBar)

      }
      else if(item.linkPath==="Profile"){
        navigation.navigate(NavigationString.Profile)

      }
  }
  return (
    <Pressable onPress={()=>{handaleNavigation(item)}}>
    <View style={styles.mainView} >
      <View>
        <Text style={{  color: colors.mutedPurple,fontSize:15,textTransform:"capitalize",marginBottom:5 }}>{item.name}</Text>
        <Text style={{ color: colors.white,textTransform:"capitalize",fontWeight:"800",marginBottom:10,fontSize:14 }}>{item.description}</Text>
        <Text style={{ color:colors.gray6 }}>{format(new Date(item.createdAt), 'dd/MM/yyyy hh:mm a')}</Text>
      </View>
    </View >
    </Pressable>
  )
}

export default NotificationView
const styles = StyleSheet.create({
  mainView: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    // shadowColor: '#000',

    // elevation: 2,
    marginTop:10,
    borderRightWidth:1,
    borderEndEndRadius:10,
    borderColor:colors.gold,
    // borderBottomWidth:0.3
  }
})