import styled, { css } from 'styled-components/native';

export const Container = styled.TextInput`
  flex: 1;
  
  min-height: 56px;
  max-height: 56px;

  ${({ theme }) => css`
    background-color: ${theme.colors.gray_700};
    color: ${theme.colors.white};
    font-family: ${theme.font_family.regular};
    font-size: ${theme.font_size.MD}px;
  `};

  border-radius: 6px;
  padding: 16px;
`;
