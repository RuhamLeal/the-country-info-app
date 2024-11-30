import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';
import { HttpModule } from '@nestjs/axios';
import { GlobalExceptionsFilter } from './filters/global-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    HttpModule,
  ],
  controllers: [CountryController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    CountryService
  ],
})
export class AppModule { }
