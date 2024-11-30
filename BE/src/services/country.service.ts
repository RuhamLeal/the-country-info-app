import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { AvailableCountry } from 'src/types/country'
import EnvironmentVariables from 'src/types/env';

@Injectable()
export class CountryService {

  constructor(
    private readonly httpService: HttpService,
    private env: ConfigService<EnvironmentVariables>,
  ) { }


  async findAllAvailableCountries() {
    return await this.fetchAvailableCountries();
  }


  async fetchAvailableCountries(): Promise<{ error: boolean, countries: AvailableCountry[] }> {
    const response = await this.httpService.axiosRef
      .get(
        this.env.get('AVAILABLE_COUNTRIES_URL'),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err: AxiosError) => {
        console.error(err)

        return { error: true, countries: [] }
      }) as AxiosResponse;

    return { error: false, countries: response.data }
  }
}
