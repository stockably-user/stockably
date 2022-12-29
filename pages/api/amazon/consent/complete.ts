import { SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import * as url from "url";
import { checkForActiveSession } from "../../utils";

async function verifyConsentState(supabase: SupabaseClient, state: string) {
  // get initial consent
  let amazon_consent_query = await supabase
    .from("amazon_consents")
    .select("*")
    .eq("state", state)
    .eq("is_flow_active", true);

  if (amazon_consent_query.data) {
    return amazon_consent_query.data;
  }
}

async function exchangeAuthCodeForRefreshToken(authCode: string) {
  //   const params = new url.URLSearchParams({
  //     grant_type: "authorization_code",
  //     code: authCode,
  //     redirect_uri: "https://stockably.herokuapp.com",
  //     client_id: process.env.AMAZON_CLIENT_ID,
  //     client_secret: process.env.AMAZON_CLIENT_SECRET,
  //   });
  //   try {
  //     const request = await this.http
  //       .post("https://api.amazon.com/auth/o2/token", params.toString())
  //       .toPromise();
  //     return request.data.refresh_token;
  //   } catch (error) {
  //     console.log(error);
  //   }
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

        res.status(200).json(validConsent);

      // if (validConsent) {
      //   const refreshToken = await exchangeAuthCodeForRefreshToken(
      //     consentResult.oAuthCode
      //   );
      //   const user = await this.userService.findByAuth0Id(
      //     consentResult.auth0Id
      //   );

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

      default:
        console.error("unknown method");
    }
  }
}
