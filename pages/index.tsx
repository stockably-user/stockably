import Head from "next/head";
import { useSession } from "@supabase/auth-helpers-react";
import Dashboard from "./dashboard";
import Login from "./login";
import { AppShell, Box, Header, Text } from "@mantine/core";
import CustomNavbar from "../components/nav/Navbar";
import StockablyAppShell from "../components/nav/StockablyAppShell";

function Home() {
  const session = useSession();

  return (
    <div>
      <Head>
        <title>Stockably</title>
        <meta name="description" content="Stockably - Inventory Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session ? (
        <Login />
      ) : (
        <StockablyAppShell>
          <Dashboard session={session} />
        </StockablyAppShell>
      )}
    </div>
  );
}

export default Home;
