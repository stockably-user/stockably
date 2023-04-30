import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { Dispatch } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  LocationStatusFormMeta,
  LocationStatusMeta,
} from '../../types/location';

type SaveLocationQuantityForm = {
  item_id: number;
  location_id: number;
  to_location_id: number;
  location_status_id: number;
  quantity: number;
};

type LocationData = {
  id: number;
  name: string;
  description: string;
  location_type_id: number;
  address: {
    street_1: string;
    street_2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  contacts: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    fax: string;
  };
};

const SaveLocationQuantityForm = ({
  setInventory,
  locations,
}: {
  setInventory: Dispatch<any>;
  locations: any;
}) => {
  const { register, handleSubmit, watch, formState, setValue } =
    useForm<SaveLocationQuantityForm>();

  const locationsData = locations
    ? (locations as LocationData[]).map((location) => {
        return {
          value: location.id.toString(),
          label: location.name,
        };
      }, {})
    : [];

  const handleSaveLocationQuantity: SubmitHandler<SaveLocationQuantityForm> = (
    data: SaveLocationQuantityForm
  ) => {
    async function saveLocationQuantity(data: any) {
      const req = await fetch('api/inventory/other', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: data.item_id,
          location_id: data.location_id,
          to_location_id: data.to_location_id,
          location_status_id: data.location_status_id,
          quantity: data.quantity,
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
    saveLocationQuantity(data);
  };

  return (
    <form
      id="saveLocationQuantityForm"
      onSubmit={handleSubmit(handleSaveLocationQuantity)}
    >
      <h3>Save quantity for a location</h3>
      <TextInput label="item id" {...register('item_id')} />
      <Select
        label="location id"
        placeholder="Select location"
        {...register('location_id')}
        onChange={(valueString) => {
          if (valueString) {
            setValue('location_id', Number(valueString));
          }
        }}
        data={locationsData}
      />
      <Select
        clearable
        label="to location id"
        placeholder="Select to location"
        {...register('to_location_id')}
        onChange={(valueString) => {
          if (valueString) {
            setValue('to_location_id', Number(valueString));
          }
        }}
        data={locationsData}
      />
      <Select
        label="location status id"
        placeholder="Select location status"
        {...register('location_status_id')}
        onChange={(valueString) => {
          if (valueString) {
            setValue('location_status_id', LocationStatusMeta[valueString].id);
          }
        }}
        data={LocationStatusFormMeta}
      />
      <NumberInput
        label="quantity"
        {...register('quantity')}
        max={1000000}
        min={0}
        onChange={(valueString) => setValue('quantity', Number(valueString))}
      />

      <Button type="submit">Save quantity for a location</Button>
    </form>
  );
};

export default SaveLocationQuantityForm;
