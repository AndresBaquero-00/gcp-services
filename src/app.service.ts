import { BigQuery } from '@google-cloud/bigquery';
import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { Organization } from './interfaces';

@Injectable()
export class AppService {
  private readonly bigquery = new BigQuery();
  private readonly storage = new Storage();

  async getBigQueryData(): Promise<Organization[]> {
    const res = await this.bigquery.query({
      query: 'select * from etraining_samples.organization',
    });

    return res[0] as Organization[];
  }

  async loadStorageFile(file: Express.Multer.File) {
    const bucket = this.storage.bucket('etraining_samples');
    const tempPath = path.join(__dirname, '..', '.temp');

    if (fs.existsSync(tempPath) === false) {
      fs.mkdirSync(tempPath, { recursive: true });
    }

    const filePath = path.join(tempPath, file.originalname);
    fs.writeFileSync(filePath, file.buffer, {
      encoding: 'utf-8',
    });

    return await bucket.upload(filePath);
  }

  async downloadStorageFile(filename: string) {
    const bucket = this.storage.bucket('etraining_samples');
    return await bucket.file(filename).download();
  }
}
