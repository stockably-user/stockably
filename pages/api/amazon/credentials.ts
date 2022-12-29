import { AssumeRoleCommand, Credentials, STSClient } from "@aws-sdk/client-sts";
import SellingPartnerAPI from "amazon-sp-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { checkForActiveSession } from "../../../utils";

async function getSecureCredentials() {
  try {
    const client = new STSClient({
      credentials: {
        accessKeyId: process.env.AWS_SELLING_PARTNER_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SELLING_PARTNER_SECRET_ACCESS_KEY!,
      },
      region: "us-east-1",
    });

    const command = new AssumeRoleCommand({
      RoleArn: process.env.AWS_SELLING_PARTNER_ROLE,
      RoleSessionName: `sts-${v4()}`,
    });

    const { Credentials } = await client.send(command);
    return Credentials;
  } catch (error) {
    console.log(error);
  }
}

function createSpApiClient(
  region: "eu" | "na" | "fe",
  credentials: Credentials,
  token: string
) {
  return new SellingPartnerAPI({
    region: region,
    refresh_token: token,
    role_credentials: {
      id: credentials.AccessKeyId,
      secret: credentials.SecretAccessKey,
      security_token: credentials.SessionToken,
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    const credentials = await getSecureCredentials();
    let region_query = await sb.from("marketplaces").select("*");
    if (credentials) {
      // const spApi = createSpApiClient("na", credentials, "");
      res.status(200).json({ credentials, data: region_query.data });
    }
    res.status(200).json({ message: "doesn't work" });
  }
}
