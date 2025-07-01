import { Box, } from "@gluestack-ui/themed"
import { TextInput } from "react-native"
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions"

import { SearchIcon } from "../Icons"
import { colors } from "../../constants/colors"

interface Props {
  placeholder: string;
}

const SearchBar = (props: Props) => {

  // init
  const { placeholder } = props

  return (
    <Box bgColor={'#f1f1f1'} flexDirection='row' alignItems='center' h={50} borderRadius={10} pl={20} gap={7} overflow='hidden' mt={20}>
      <SearchIcon />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.mutedPurple}
        style={{ flex: 1, fontFamily: 'Poppins-Medium', fontSize: responsiveFontSize(1.6), alignSelf: 'baseline', lineHeight: responsiveHeight(1.4), marginBottom: -4 }}
      />
    </Box>
  )
}

export default SearchBar