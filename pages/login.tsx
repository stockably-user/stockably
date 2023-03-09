import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

export default function Login() {
  const supabase = useSupabaseClient();

  return (
    <div className={styles.container}>
      <Head>
        <title>Stockably: Login</title>
      </Head>
      <h1 className={styles.title}>Welcome to Stockably!</h1>
      <div className="container">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    </div>
  );
}
