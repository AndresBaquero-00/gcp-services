import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Organization } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('bigquery')
  getData(): Promise<Organization[]> {
    return this.appService.getData();
  }
}
