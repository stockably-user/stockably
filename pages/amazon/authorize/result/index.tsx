import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface AuthorizationResultParams {
  oAuthCode: string;
  state: string;
  sellingPartnerId: string;
}

export default function AuthorizeResult(props: AuthorizationResultParams) {
  const [consentResult, setConsentResult] = useState("");

  useEffect(() => {
    const { sellingPartnerId, oAuthCode, state } = props;

    const data = {
      oAuthCode,
      state,
      sellingPartnerId,
    };

    // immediately exchange auth code for refresh token & save user data
    fetch(`/api/amazon/consent/complete`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((response) => {
        setConsentResult(response.message);
      });
  }, []);

  return (
    <section>
      <pre>
        {JSON.stringify({ sellerId: props.sellingPartnerId }, null, 2)}
        <p>{consentResult}</p>
      </pre>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const amazonParams: AuthorizationResultParams = {
    sellingPartnerId: context.query.selling_partner_id!.toString(),
    oAuthCode: context.query.spapi_oauth_code!.toString(),
    state: context.query.state!.toString(),
  };
  return { props: amazonParams };
};
