import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={colors.gray_300}
      {...rest}
    />
  );
}