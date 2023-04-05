import { AppShell, Header, Text } from '@mantine/core';
import CustomNavbar from '../../components/nav/Navbar';
import StockablyAppShell from '../../components/nav/StockablyAppShell';

const Inventory = () => {
  return <div>Inventory Management</div>;
};

const InventoryWrapper = () => {
  return (
    <StockablyAppShell>
      <Inventory />
    </StockablyAppShell>
  );
};

export default InventoryWrapper;
