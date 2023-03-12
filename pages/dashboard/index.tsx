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
      } else {
        console.log(res.data);
      }
    }
    postInventory();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/amazon/authorize">Set up Amazon</Link>
      <div style={{ margin: '1rem 0' }}>
        <button onClick={handleGetInventory}>Get inventory</button>
      </div>
      <div style={{ margin: '1rem 0' }}>
        <button onClick={handleSaveInventory}>
          Save sample inventory item
        </button>
      </div>
      <div>
        <pre>{JSON.stringify(inventory, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Dashboard;
