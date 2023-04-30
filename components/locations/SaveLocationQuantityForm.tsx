import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LocationTypeFormMeta, LocationTypeMeta } from '../../types/location';

type SaveLocationQuantityForm = {
  item_id: number;
  location_id: number;
  to_location_id: number;
  location_status_id: number;
  quantity: number;
};

const SaveLocationQuantityForm = ({
  setInventory,
}: {
  setInventory: Dispatch<any>;
}) => {
  const { register, handleSubmit, watch, formState, setValue } =
    useForm<SaveLocationQuantityForm>();

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
      <TextInput label="location id" {...register('location_id')} />
      <TextInput label="to location id" {...register('to_location_id')} />
      <Select
        label="location status id"
        placeholder="Select location status"
        {...register('location_status_id')}
        onChange={(valueString) => {
          if (valueString) {
            setValue('location_status_id', LocationTypeMeta[valueString].id);
          }
        }}
        data={LocationTypeFormMeta}
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
