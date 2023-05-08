import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../../utils';

async function verifyConsentState(supabase: SupabaseClient, state: string) {
  // get initial consent
  let amazon_consent_query = await supabase
    .from('amazon_consents')
    .select('*')
    .eq('state', state)
    .eq('is_flow_active', true)
    .select('*');

  if (amazon_consent_query.data) {
    return amazon_consent_query.data;
  }
}

async function exchangeAuthCodeForRefreshToken(authCode: string) {
  try {
    const url = new URL('https://api.amazon.com/auth/o2/token');
    const params: Record<string, any> = {
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: 'https://stockably.vercel.app',
      client_id: process.env.AMAZON_CLIENT_ID!,
      client_secret: process.env.AMAZON_CLIENT_SECRET!,
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const request = await fetch(url.href, {
      method: 'POST',
    });

    const res = await request.json();
    return res.refresh_token;
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
      case 'POST': {
        const consentResult = req.body;

        const {
          data: { user },
        } = await sb.auth.getUser();

        const validConsent = await verifyConsentState(sb, consentResult.state);

        if (validConsent) {
          const refreshToken = await exchangeAuthCodeForRefreshToken(
            consentResult.oAuthCode
          );

          const { data } = await sb
            .from('amazon_consents')
            .update({
              refresh_token: refreshToken,
              selling_partner_id: consentResult.sellingPartnerId,
              is_granted: true,
              is_flow_active: false,
            })
            .eq('user_id', user?.id)
            .eq('state', consentResult.state)
            .select('refresh_token');

          if (data && data[0].refresh_token) {
            res
              .status(200)
              .json({ message: 'Amazon consent granted', success: true });
          } else {
            res.json({ message: 'Amazon consent failed', success: false });
          }
        }
      }
    }
  }
}
