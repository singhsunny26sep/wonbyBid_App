import { Box, Input, Text } from "@gluestack-ui/themed";
// import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { TextInput, TextInputProps } from 'react-native'
import { colors } from "../../constants/colors";

export interface InputTextProps {
  label?: string;
  // field: ControllerRenderProps<FieldValues, string>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  handleKeyPress?: () => void;
  onChange?: (val:number) => void;
}

function InputText(props: InputTextProps) {
  const { right, left, handleKeyPress, textInputProps, label,onChange } = props;
  // const { onChange, value, onBlur } = field;

  return (
    <Box gap={10}>
      <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white}>
        {label}
      </Text>
      <Input h={45}  borderRadius={9} borderEndWidth={1} borderColor={colors.gold}   borderWidth={0} alignItems="center">
        {left}
        <TextInput 
          placeholder={textInputProps?.placeholder ?? ""}
          // value={value}
          onChangeText={textInputProps?.keyboardType === "numeric"&&onChange ? (val) => onChange(Number(val)) : onChange}
          // onBlur={onBlur}
          onSubmitEditing={handleKeyPress}
          returnKeyType="done"
          placeholderTextColor={colors.grayish}
          style={[{ fontSize: 14, color: colors.white, fontFamily: 'Roboto-Regular', paddingLeft: 20, flex: 1, }]}
          {...textInputProps}
        />
        {right}
      </Input>
    </Box>
  );
}

export default InputText;