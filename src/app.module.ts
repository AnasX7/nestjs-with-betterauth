import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { admin, openAPI } from 'better-auth/plugins';

@Module({
  imports: [
    DbModule,
    AuthModule.forRootAsync({
      imports: [DbModule],
      inject: [DbService],
      useFactory: (database: DbService) => ({
        auth: betterAuth({
          database: prismaAdapter(database, {
            provider: 'postgresql',
          }),
          emailAndPassword: {
            enabled: true,
          },
          advanced: {
            defaultCookieAttributes: {
              sameSite: 'none',
              secure: true,
              httpOnly: true,
            },
          },
          plugins: [admin(), openAPI()],
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
