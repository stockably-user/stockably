import Head from 'next/head';
import { useSession } from '@supabase/auth-helpers-react';
import Dashboard from './dashboard';
import Login from './login';

function Home() {
  const session = useSession();

  return (
    <div>
      <Head>
        <title>Stockably</title>
        <meta name="description" content="Stockably - Inventory Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session ? <Login /> : <Dashboard session={session} />}
    </div>
  );
}

export default Home;
