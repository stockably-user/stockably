import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    switch (req.method) {
      case 'POST': {
        const { countryCode, state } = req.body;

        // get user
        const {
          data: { user },
        } = await sb.auth.getUser();

        // get region id
        let region_query = await sb
          .from('marketplaces')
          .select('region_id')
          .eq('country_code', countryCode);

        const region_id = region_query.data && region_query.data[0].region_id;

        // create amazon consent
        const amazon_consent_query = await sb
          .from('amazon_consents')
          .insert([
            {
              user_id: user?.id,
              state: state,
              is_flow_active: true,
              is_granted: false,
              region_id,
              created_at: new Date(),
            },
          ])
          .select('is_flow_active');

        if (amazon_consent_query.data) {
          const isFlowActive = amazon_consent_query.data[0].is_flow_active;
          if (isFlowActive) {
            res.status(200).json({ message: 'Consent flow initiated' });
          } else {
            res
              .status(200)
              .json({ message: 'Consent flow could not be initiated' });
          }
        } else {
          res
            .status(500)
            .json({ message: 'no good', error: amazon_consent_query.error });
        }
      }
    }
  }
}
