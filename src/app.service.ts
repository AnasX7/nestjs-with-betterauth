import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postHello(user: any): string {
    console.log(user);
    return 'Hello World!';
  }
}
