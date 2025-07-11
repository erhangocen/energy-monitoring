import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './shared/database/prisma.service';
import { SecurityMiddleware } from './shared/middleware/security.middleware';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { OrganizationModule } from './modules/organization/organization.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MeterModule } from './modules/meter/meter.module';
import { MeterReadingModule } from './modules/meter-reading/meter-reading.module';
import { ReportModule } from './modules/report/report.module';
import { UserMeterModule } from './modules/user-meter/user-meter.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 dakika
        limit: 100, // 1 dakikada maksimum 100 istek
      },
      {
        ttl: 3600000, // 1 saat
        limit: 1000, // 1 saatte maksimum 1000 istek
      },
    ]),
    OrganizationModule,
    AuthModule,
    UserModule,
    MeterModule,
    MeterReadingModule,
    ReportModule,
    UserMeterModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, SecurityMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
