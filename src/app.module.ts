import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { PrismaService } from './db/prisma.service';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { admin, openAPI } from 'better-auth/plugins';

@Module({
  imports: [
    PrismaModule,
    AuthModule.forRootAsync({
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory: (database: PrismaService) => ({
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
