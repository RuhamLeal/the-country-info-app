import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';
import { HttpModule } from '@nestjs/axios';
import { GlobalExceptionsFilter } from './filters/global-exceptions.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { JoiValidationPipe } from './pipes/joi-validation';

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
      provide: APP_PIPE,
      useClass: JoiValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    CountryService
  ],
})
export class AppModule { }
