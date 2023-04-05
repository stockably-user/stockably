import { AppShell, Container, Header, Text } from '@mantine/core';
import CustomNavbar from '../../components/nav/Navbar';
import StockablyAppShell from '../../components/nav/StockablyAppShell';

const Inventory = () => {
  return (
    <Container fluid>
      <h1>Inventory Management</h1>
    </Container>
  );
};

const InventoryWrapper = () => {
  return (
    <StockablyAppShell>
      <Inventory />
    </StockablyAppShell>
  );
};

export default InventoryWrapper;
