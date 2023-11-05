import { Button } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, blue, red);
  font-family: 'Roboto';
`;

export const UserInfoContainer = styled.section`
  border-radius: 8px;
  background-color: #FFF;
  padding: 24px;
  width: 450px;
  gap: 32px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 16px;
`;

export const LoginButton = styled(Button)`
  border-radius: 8px !important;
  width: 100%;
  background: linear-gradient(45deg, blue, red) !important;
  color: #FFF !important;
  margin-top: 24px !important;
`