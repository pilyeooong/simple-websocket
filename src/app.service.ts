import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  pathTest(): string {
    return 'Path Test!';
  }
}
