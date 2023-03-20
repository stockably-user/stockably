import { useCallback, useEffect, useState } from 'react';
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';

function Dashboard({ session }: { session: Session }) {
  const supabase = useSupabaseClient();

  const [inventory, setInventory] = useState();

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

  const handleSaveInventory = useCallback(() => {
    async function postInventory() {
      const req = await fetch(`/api/inventory`, {
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
    postInventory();
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

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ paddingRight: '1rem' }}>
          <h2>Connect Amazon seller account</h2>
          <button>
            <Link href="/amazon/authorize">Set up Amazon</Link>
          </button>
        </div>
        <div style={{ paddingRight: '1rem' }}>
          <h2>Read data from Amazon APIs</h2>
          <div style={{ margin: '1rem 0' }}>
            <button onClick={handleGetInventory}>Get inventory from AMZ</button>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <button onClick={handleGetItemInfo}>Get item info from AMZ</button>
          </div>
        </div>
        <div style={{ paddingRight: '1rem' }}>
          <h2>Save data to DB</h2>
          <div style={{ margin: '1rem 0' }}>
            <button onClick={handleSaveInventory}>
              Save sample inventory item
            </button>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <button onClick={handleUpdateItemInfo}>
              Get item info from AMZ and update in db
            </button>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <button onClick={handleSaveProductsFromAmazon}>
              Get inventory from AMZ and update in db
            </button>
          </div>
        </div>
        <div style={{ paddingRight: '1rem' }}>
          <h2>Reset test data</h2>
          <div style={{ margin: '1rem 0' }}>
            <button onClick={handleDeleteItemData}>
              Delete test item data
            </button>
          </div>
        </div>
      </div>

      <div>
        <pre>{JSON.stringify(inventory, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Dashboard;
