import { NextApiRequest, NextApiResponse } from "next";
import { checkForActiveSession } from "../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    switch (req.method) {
      case "POST":
        const { countryCode, state } = req.body;

        // get user
        const {
          data: { user },
        } = await sb.auth.getUser();

        // get region
        let region_query = await sb
          .from("marketplaces")
          .select("region_id")
          .eq("country_code", countryCode);

        const region_id = region_query.data && region_query.data[0].region_id;

        // create amazon consent
        const amazon_consent_query = await sb.from("amazon_consents").insert([
          {
            user: user?.id,
            state: state,
            is_flow_active: true,
            is_granted: false,
            region_id,
          },
        ]);

        if (amazon_consent_query.data) {
          const r = amazon_consent_query.data;
          res.status(200).json(r);
        }

      //   if (response.isFlowActive) {
      //     return { message: "Consent flow initiated" };
      //     res.status(200).json({});
      //   }

      default:
        console.error("unknown method");
    }
  }
}
