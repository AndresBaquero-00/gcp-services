import { Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as IResponse } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('bigquery')
  getBigQueryData() {
    return this.appService.getBigQueryData();
  }

  @Get('storage/:filename')
  async downloadStorageFile(@Param('filename') filename: string, @Res({ passthrough: true }) response: IResponse) {
    const file = await this.appService.downloadStorageFile(filename);
    response.setHeader('Content-Type', `application/csv`);
    response.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    return new StreamableFile(file[0]);
  }

  @Post('storage')
  @UseInterceptors(FileInterceptor('file'))
  loadStorageFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.loadStorageFile(file);
  }
}
