import { AppShell, Header, Text } from '@mantine/core';
import CustomNavbar from './Navbar';
import { ReactNode } from 'react';

const StockablyAppShell = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      padding="md"
      navbar={<CustomNavbar />}
      header={
        <Header height={60} p="xs">
          <Text
            fz="xl"
            sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
          >
            Stockably
          </Text>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default StockablyAppShell;
