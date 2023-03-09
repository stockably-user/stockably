import { useEffect, useState } from 'react';
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import styles from './dashboard.module.css';
import Link from 'next/link';

function Dashboard({ session }: { session: Session }) {
  const supabase = useSupabaseClient();

  const [inventory, setInventory] = useState();

  useEffect(() => {
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

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/amazon/authorize">Set up Amazon</Link>
      <div>
        <pre>{JSON.stringify(inventory, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Dashboard;
