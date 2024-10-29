import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';
import * as path from 'path';

import { env } from './config/env';
import { Organization } from './interfaces';

@Injectable()
export class AppService {
  private readonly bigquery = new BigQuery({
    keyFilename: path.join(__dirname, '..', 'keys', env.keyFilename),
    projectId: env.projectId,
  });

  async getData(): Promise<Organization[]> {
    const res = await this.bigquery.query({
      query: 'select * from etraining_samples.organization',
    });

    return res[0] as Organization[];
  }
}
