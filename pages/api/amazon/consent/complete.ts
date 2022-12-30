import { SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import * as url from "url";
import { checkForActiveSession } from "../../../../utils";

async function verifyConsentState(supabase: SupabaseClient, state: string) {
  // get initial consent
  let amazon_consent_query = await supabase
    .from("amazon_consents")
    .select("*")
    .eq("state", state)
    .eq("is_flow_active", true)
    .select("*");

  if (amazon_consent_query.data) {
    console.log("verified consent: ", amazon_consent_query);
    return amazon_consent_query.data;
  }
}

async function exchangeAuthCodeForRefreshToken(authCode: string) {
  try {
    const url = new URL("https://api.amazon.com/auth/o2/token");
    const params: Record<string, any> = {
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: "https://stockably.vercel.app",
      client_id: process.env.AMAZON_CLIENT_ID!,
      client_secret: process.env.AMAZON_CLIENT_SECRET!,
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    console.log("token exchange url: ", url);

    const request = await fetch(url, {
      method: "POST",
    });

    const res = await request.json();
    console.log(res);
    return res.data.refresh_token;
  } catch (error) {
    console.log(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    switch (req.method) {
      case "POST":
        const consentResult = req.body;

        const {
          data: { user },
        } = await sb.auth.getUser();

        const validConsent = await verifyConsentState(sb, consentResult.state);

        if (validConsent) {
          const refreshToken = await exchangeAuthCodeForRefreshToken(
            consentResult.oAuthCode
          );
          res.status(200).json({ validConsent, refreshToken });
        }

      //   // set new data
      //   validConsent.user = user;
      //   validConsent.refreshToken = refreshToken;
      //   validConsent.sellingPartnerId = consentResult.sellingPartnerId;
      //   validConsent.isGranted = true;

      //   // invalidate flow
      //   validConsent.isFlowActive = false;
      //   const response = await this.consentRepository.save(validConsent);
      //   if (response && response.refreshToken) {
      //     res
      //       .status(200)
      //       .json({ message: "Amazon consent granted", success: true });
      //   } else {
      //     // return { message: "Amazon consent failed", success: false };
      //   }
      // }
    }
  }
}
