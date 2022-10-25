import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.gray_600};

  padding: 24px;
`;

export const Form = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray_700};

  flex-direction: row;
  justify-content: center;
  border-radius: 6px;
`;

export const HeaderList = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 32px 0 12px;
`;

export const NumberOfPlayer = styled.Text`
   ${({ theme }) => css`
    font-size: ${theme.font_size.SM}px;
    font-family: ${theme.font_family.bold};
    color: ${theme.colors.gray_200};
  `};
`;