import { AppShell, Header, Text } from '@mantine/core';
import CustomNavbar from '../../components/nav/Navbar';
import StockablyAppShell from '../../components/nav/StockablyAppShell';

const Locations = () => {
  return <div>Location Management</div>;
};

const LocationsWrapper = () => {
  return (
    <StockablyAppShell>
      <Locations />
    </StockablyAppShell>
  );
};

export default LocationsWrapper;
