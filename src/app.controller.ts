import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous, AuthService } from '@thallesp/nestjs-better-auth';
import { auth } from './auth/auth';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService<typeof auth>,
  ) {}

  @AllowAnonymous()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async postHello() {
    try {
      const user = await this.authService.api.createUser({
        body: {
          name: 'test',
          email: 'test@example.com',
          password: 'password',
        },
      });
      return this.appService.postHello(user);
    } catch (error) {
      console.error(error, 'Failed to create user');
    }
  }
}
