import { v4 } from "uuid";
import {
  Marketplaces,
  MarketPlaces_Europe,
  MarketPlaces_FarEast,
  MarketPlaces_NorthAmerica,
} from "../../../types/marketplace";
import styles from "./authorize.module.css";

async function initiateConsentFlow(state: string, countryCode: string) {
  const req = await fetch(`/api/amazon/consent/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      state,
      countryCode,
    }),
  });
  const res = await req.json();
  console.log(res);
}

async function constructOauthURI(marketplace: string, test: boolean = true) {
  const redirectConfirmed = confirm(`Redirect to Amazon for authorization?`);

  if (redirectConfirmed) {
    const applicationId = process.env.NEXT_PUBLIC_AMAZON_APP_ID;
    const m = Marketplaces[marketplace];
    const redirectUri = "https://stockably.vercel.app/amazon/authorize/result";
    const state = v4();
    const oAuthURI = `${
      m.endpoint
    }/apps/authorize/consent?application_id=${applicationId}&redirect_uri=${redirectUri}&state=${state}${
      test ? "&version=beta" : null
    }`;
    console.log(`redirecting to ${oAuthURI}`);

    window.open(oAuthURI, "_blank");
    await initiateConsentFlow(state, m.countryCode);
  }
}

export default function Authorize() {
  return (
    <div>
      <section className={styles.region}>
        <h3>North America</h3>
        {Object.keys(MarketPlaces_NorthAmerica).map((marketplace) => (
          <button
            key={marketplace}
            className={styles.buttons}
            onClick={() => constructOauthURI(marketplace)}
          >
            <span className={styles.marketplace}>{marketplace}</span>
          </button>
        ))}
      </section>
      <section className={styles.region}>
        <h3>Europe</h3>
        {Object.keys(MarketPlaces_Europe).map((marketplace) => (
          <button
            key={marketplace}
            className={styles.buttons}
            onClick={() => constructOauthURI(marketplace)}
          >
            <span className={styles.marketplace}>{marketplace}</span>
          </button>
        ))}
      </section>
      <section className={styles.region}>
        <h3>Far East</h3>
        {Object.keys(MarketPlaces_FarEast).map((marketplace) => (
          <button
            key={marketplace}
            className={styles.buttons}
            onClick={() => constructOauthURI(marketplace)}
          >
            <span className={styles.marketplace}>{marketplace}</span>
          </button>
        ))}
      </section>
    </div>
  );
}
