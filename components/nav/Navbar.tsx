import { NavLink, Navbar } from '@mantine/core';

const CustomNavbar = () => {
  return (
    <Navbar width={{ base: 300 }} height={500}>
      <Navbar.Section grow mt="md">
        <NavLink component="a" label="Dashboard" href="/" />
        <NavLink component="a" label="Inventory" href="/inventory" />
        <NavLink component="a" label="Locations" href="/locations" />
      </Navbar.Section>
    </Navbar>
  );
};

export default CustomNavbar;
