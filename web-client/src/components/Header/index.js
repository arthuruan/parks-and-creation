import React from 'react';
import { Logout } from '@mui/icons-material'

import { HeaderContainer, LogoutButton, Title } from './styles';

function Header() {
  return (
    <HeaderContainer>
      <Title>Parks and Creation</Title>
      <LogoutButton>
        <Logout />
      </LogoutButton>
    </HeaderContainer>
  )
};

export default Header;