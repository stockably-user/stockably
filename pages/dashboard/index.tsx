import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Button, Container, SimpleGrid } from '@mantine/core';
import DashboardDataTable from '../../components/dashboard/DashboardDataTable';

function Dashboard() {
  const [inventory, setInventory] = useState<any>();
  const [itemData, setItemData] = useState<any>(); // specifically for the data table

  // TODO: Move these click handlers into hook
  const handleGetInventory = useCallback(() => {
    async function getInventory() {
      const req = await fetch(`/api/inventory`, {
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
    getInventory();
  }, []);

  const handleGetInventoryFromDB = useCallback(() => {
    async function getInventoryFromDB() {
      const req = await fetch(`/api/inventory/db`, {
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
        setItemData(res.data);
      }
    }
    getInventoryFromDB();
  }, []);

  const handleGetItemInfo = useCallback(() => {
    async function getItemInfo() {
      const req = await fetch(`/api/item/ZO-JRGSL-GOLD`, {
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
    getItemInfo();
  }, []);

  const handleUpdateItemInfo = useCallback(() => {
    async function updateItemInfo() {
      const req = await fetch(`/api/item`, {
        method: 'POST',
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
    updateItemInfo();
  }, []);

  const handleDeleteItemData = useCallback(() => {
    async function deleteItemData() {
      const req = await fetch(`/api/item/test`, {
        method: 'DELETE',
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
    deleteItemData();
  }, []);

  const handleSaveProductsFromAmazon = useCallback(() => {
    async function saveProductsFromAmazon() {
      const req = await fetch(`/api/inventory/amz-to-db`, {
        method: 'POST',
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
    saveProductsFromAmazon();
  }, []);

  const dataTableRecords = itemData
    ? itemData.map((item: any) => ({
        id: item.id,
        name: item.name,
        asin: item.asin,
        sku: item.sku,
        fnsku: item.fnsku,
        amzFulfillable: item.amz_item_quantities[0].amz_fulfillable,
        amzInboundWorking: item.amz_item_quantities[0].amz_inbound_working,
        amzInboundShipped: item.amz_item_quantities[0].amz_inbound_shipped,
        amzInboundReceiving: item.amz_item_quantities[0].amz_inbound_receiving,
        amzTotal: item.amz_item_quantities[0].amz_total,
        // otherLocationQuantities: item.other_item_quantities[0],
      }))
    : [];

  return (
    <Container fluid>
      <h1>Dashboard</h1>
      <SimpleGrid cols={3}>
        <div>
          <h2>Connect Amazon seller account</h2>
          <Button>
            <Link href="/amazon/authorize">Set up Amazon</Link>
          </Button>
        </div>
        <div>
          <h2>Read data from Amazon APIs</h2>
          <div style={{ margin: '1rem 0' }}>
            <Button onClick={handleGetInventory}>Get inventory from AMZ</Button>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <Button onClick={handleGetItemInfo}>Get item info from AMZ</Button>
          </div>
        </div>
        <div>
          <h2>Save data to DB</h2>
          <div style={{ margin: '1rem 0' }}>
            <Button onClick={handleUpdateItemInfo}>
              Get item info from AMZ and update in db
            </Button>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <Button onClick={handleSaveProductsFromAmazon}>
              Get inventory from AMZ and update in db
            </Button>
          </div>
        </div>
        <div>
          <h2>Reset test data</h2>
          <div style={{ margin: '1rem 0' }}>
            <Button onClick={handleDeleteItemData}>
              Delete test item data
            </Button>
          </div>
        </div>
        <div>
          <h2>Read data from DB</h2>
          <Button onClick={handleGetInventoryFromDB}>Get Inventory</Button>
        </div>
      </SimpleGrid>

      <DashboardDataTable records={dataTableRecords} />

      <div>
        <pre>{JSON.stringify(inventory, null, 2)}</pre>
      </div>
    </Container>
  );
}

export default Dashboard;
