import { Button, NumberInput, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type AddContactForm = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  fax: string;
};

const AddContactForm = ({ setInventory }: { setInventory: Dispatch<any> }) => {
  const { register, handleSubmit, watch, formState } =
    useForm<AddContactForm>();

  const handleAddContact: SubmitHandler<AddContactForm> = (
    data: AddContactForm
  ) => {
    async function addNewContact(data: any) {
      const req = await fetch('api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          phone: data.phone,
          fax: data.fax,
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
    addNewContact(data);
  };

  return (
    <form id="addContactForm" onSubmit={handleSubmit(handleAddContact)}>
      <h3>Add a new contact</h3>
      <TextInput label="First Name" {...register('fname')} />
      <TextInput label="Last Name" {...register('lname')} />
      <TextInput label="Phone number" {...register('phone')} />
      <TextInput label="Email" {...register('email')} />
      <TextInput label="Fax" {...register('fax')} />

      <Button type="submit">Add new contact</Button>
    </form>
  );
};

export default AddContactForm;
