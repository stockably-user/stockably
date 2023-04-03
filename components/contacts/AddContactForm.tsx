import { Button, NumberInput, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction, useCallback } from 'react';

const AddContactForm = ({ setInventory }: { setInventory: Dispatch<any> }) => {
  const handleAddContact = useCallback(() => {
    async function addNewContact() {
      const req = await fetch('api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: 'matthew',
          lname: 'hwang',
          email: 'matthwang92@gmail.com',
          phone: '262212199',
          fax: '2622122199',
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
    addNewContact();
  }, []);

  return (
    <form id="addContactForm">
      <h3>Add a new contact</h3>
      <div>
        I can't currently add an input component to the dashboard, not sure why,
        so just have a button here to add instead
      </div>
      <Button onClick={handleAddContact}>Add new contact</Button>
      {/* <input type="text">Contact ID</input> */}
    </form>
  );
};

export default AddContactForm;
