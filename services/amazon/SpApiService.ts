import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';
import { v4 } from 'uuid';
import SellingPartnerAPI from 'amazon-sp-api';

type CreateSpApiClient = {
  region: 'eu' | 'na' | 'fe';
  refreshToken: string;
  sandbox: boolean;
};

export class SpApiService {
  // get secure credentials from secure token service (STS) to be able to call sp-api
  async getSecureCredentials() {
    const client = new STSClient({
      credentials: {
        accessKeyId: process.env.AWS_SELLING_PARTNER_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SELLING_PARTNER_SECRET_ACCESS_KEY!,
      },
      region: 'us-east-1',
    });

    const command = new AssumeRoleCommand({
      RoleArn: process.env.AWS_SELLING_PARTNER_ROLE,
      RoleSessionName: `sts-${v4()}`,
    });

    const { Credentials } = await client.send(command);
    if (Credentials) {
      return Credentials;
    }
  }

  async createSpApiClient(config: CreateSpApiClient) {
    const credentials = await this.getSecureCredentials();

    return new SellingPartnerAPI({
      options: { use_sandbox: config.sandbox },
      region: config.region,
      refresh_token: config.refreshToken,
      role_credentials: {
        id: credentials!.AccessKeyId,
        secret: credentials!.SecretAccessKey,
        security_token: credentials!.SessionToken,
      },
    });
  }
}
