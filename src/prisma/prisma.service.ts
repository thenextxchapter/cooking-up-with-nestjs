import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      // this.$transaction ensures that the commands are carried out in the exact order that they are written. Therefore, bookmark is always deleted before user
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
