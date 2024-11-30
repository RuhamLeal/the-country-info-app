import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Req,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { BaseController } from './base.controller';
import { CountryService } from 'src/services/country.service';

@Controller('country')
export class CountryController extends BaseController {

  @Inject()
  private countryService: CountryService

  @Get('available')
  @HttpCode(HttpStatus.OK)
  async findAllAvailableCountries(@Req() req: FastifyRequest) {
    const { countries, error } = await this.countryService.findAllAvailableCountries()

    if (!error) {
      throw new HttpException({
        message: "Error Fetching data",
        context: `${req.url}#0001`,
        countries: []
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return this.output({ countries }, "Succesfully fetched data", HttpStatus.OK);
  }
}
