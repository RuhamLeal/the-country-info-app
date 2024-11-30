import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Query,
  Req,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { BaseController } from './base.controller';
import { CountryService } from 'src/services/country.service';
import { JoiValidationPipe } from 'src/pipes/joi-validation';
import { countryInfoQuerySchema } from 'src/services/validations/country';
import { CountryInfoQuery } from 'src/types/country';

@Controller('country')
export class CountryController extends BaseController {

  @Inject()
  private countryService: CountryService

  @Get('available')
  @HttpCode(HttpStatus.OK)
  async findAllAvailableCountries() {
    const countries = await this.countryService.findAllAvailableCountries()

    return this.output({ countries }, "Succesfully fetched data", HttpStatus.OK);
  }

  @Get('info')
  @HttpCode(HttpStatus.OK)
  async findCountryInfo(@Query(new JoiValidationPipe(countryInfoQuerySchema)) query: CountryInfoQuery) {
    const countryInfo = await this.countryService.findCountryInfo(query);

    return this.output({ ...countryInfo }, "Succesfully fetched data", HttpStatus.OK);
  }
}
