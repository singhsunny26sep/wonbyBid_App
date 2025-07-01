import { FlatList } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Box, Text } from '@gluestack-ui/themed'

import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import SportCard from '../components/SportCard/SportCard'

const Kabaddi = () => {
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.brightNavyBlue}>
       <FlatList
        data={['01', '02', '03', '04', '05', '06', '07', '08']}
        renderItem={({ item, index }: { item: string, index: number }) => <SportCard key={item} item={item} index={index} />}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={() => {
          return (
            <Box>
              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} >Upcoming Matches</Text>
            </Box>
          )
        }}
        style={{ flex: 1, }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: responsiveWidth(5), marginTop: responsiveHeight(2), marginHorizontal: responsiveWidth(4) }}
      />
    </Container>
  )
}

export default Kabaddi