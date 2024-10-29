import { Controller, Get, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('bigquery')
  getBigQueryData() {
    return this.appService.getBigQueryData();
  }

  @Get('storage/:filename')
  async downloadStorageFile(@Param('filename') filename: string) {
    const file = await this.appService.downloadStorageFile(filename);
    return new StreamableFile(file[0], {
      disposition: `attachment; filename=${filename}`
    });
  }

  @Post('storage')
  @UseInterceptors(FileInterceptor('file'))
  loadStorageFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.loadStorageFile(file);
  }
}
