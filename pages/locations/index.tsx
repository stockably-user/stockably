import { Button, Container, SimpleGrid, Text } from '@mantine/core';
import StockablyAppShell from '../../components/nav/StockablyAppShell';
import { useContactForm } from '../../hooks/useContactForm';
import { useCallback, useState } from 'react';
import AddContactForm from '../../components/contacts/AddContactForm';
import { useSaveLocationQuantityForm } from '../../hooks/useSaveLocationQuantityForm';
import SaveLocationQuantityForm from '../../components/locations/SaveLocationQuantityForm';

const Locations = () => {
  const { isContactFormOpen, toggleContactFormOpenState } = useContactForm();
  const {
    isSaveLocationQuantityFormOpen,
    toggleSaveLocationQuantityFormOpenState,
  } = useSaveLocationQuantityForm();
  const [inventory, setInventory] = useState(); // TODO:

  const handleGetLocations = useCallback(() => {
    async function getLocations() {
      const req = await fetch('api/location', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await req.json();
      if (res.message) {
        console.log(res.message);
        setInventory(res.message);
      } else {
        console.log(res.data);
        setInventory(res.data);
      }
    }

    getLocations();
  }, []);

  const handleSaveLocation = useCallback(() => {
    async function saveLocation() {
      const req = await fetch('api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Matthew',
          description: 'Test matthew',
          locationType: 'amz',
          address_street1: '855 castro st',
          address_street2: 'apt 1',
          address_city: 'san francisco',
          address_state: 'ca',
          address_zip: '94114',
          address_country: 'us',
          contact_fname: 'matthew',
          contact_lname: 'hwang',
          contact_email: 'matthwang92@gmail.com',
          contact_phone: '262212199',
          contact_fax: '2622122199',
        }),
      });
      const res = await req.json();
      if (res.message) {
        console.log(res.message);
        setInventory(res.message);
      } else {
        console.log(res.data);
        setInventory(res.data);
      }
    }
    saveLocation();
  }, []);
  return (
    <Container fluid>
      <h1>Location Management</h1>
      <SimpleGrid cols={3}>
        <div>
          <h2>Locations</h2>
          <div>
            <Button onClick={handleSaveLocation}>Save Location</Button>
          </div>
          <div>
            <Button onClick={handleGetLocations}>Get Locations</Button>
          </div>
          <div>
            <Button onClick={toggleSaveLocationQuantityFormOpenState}>
              Open Save Location Quantity Form
            </Button>
            {isSaveLocationQuantityFormOpen && (
              <SaveLocationQuantityForm setInventory={setInventory} />
            )}
          </div>
        </div>
        <div>
          <h2>Contacts</h2>
          <Button onClick={toggleContactFormOpenState}>
            Show add contact form
          </Button>
          {isContactFormOpen && <AddContactForm setInventory={setInventory} />}
        </div>
      </SimpleGrid>
      <pre>{JSON.stringify(inventory, null, 2)}</pre>
    </Container>
  );
};

const LocationsWrapper = () => {
  return (
    <StockablyAppShell>
      <Locations />
    </StockablyAppShell>
  );
};

export default LocationsWrapper;
