import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { AvailableCountry, CountryBordersInfo, CountryFlagImg, CountryInfo, CountryInfoQuery, CountryPopulation } from 'src/types/country'
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

  async findCountryInfo(queryData: CountryInfoQuery): Promise<CountryInfo> {
    const [borderInfo, populationInfo, flagInfo] = await Promise.all([
      this.fetchCountryBorders(queryData.countryCode),
      this.fetchCountryPopulation(queryData.countryName),
      this.fetchCountryFlagImg(queryData.countryName)
    ])

    return {
      ...populationInfo,
      ...flagInfo,
      ...borderInfo,
    }
  }

  async fetchCountryPopulation(countryName: string): Promise<CountryPopulation> {
    const response = await this.httpService.axiosRef
      .post(
        this.env.get('COUNTRY_POPULATION_URL'),
        {
          country: countryName
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err: AxiosError) => {
        console.error(err)
      }) as AxiosResponse;

    return { populationCounts: response?.data?.data?.populationCounts || null }
  }

  async fetchCountryFlagImg(countryName: string): Promise<CountryFlagImg> {
    const response = await this.httpService.axiosRef
      .post(
        this.env.get('COUNTRY_IMG_URL'),
        {
          country: countryName
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err: AxiosError) => {
        console.error(err)
      }) as AxiosResponse;

    return { flag: response?.data?.data?.flag || null }
  }

  async fetchCountryBorders(code: string): Promise<CountryBordersInfo> {
    const response = await this.httpService.axiosRef
      .get(
        this.env.get('COUNTRY_INFO_URL').replace('countryCode', code),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err: AxiosError) => {
        console.error(err)

        throw new HttpException(
          {
            message: "Error Fetching data",
            context: '#0004',
          },
          HttpStatus.INTERNAL_SERVER_ERROR)
      }) as AxiosResponse;

    return response.data
  }

  async fetchAvailableCountries(): Promise<AvailableCountry[]> {
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
        console.error(err);

        throw new HttpException(
          {
            message: "Error Fetching data",
            context: '#0005',
          },
          HttpStatus.INTERNAL_SERVER_ERROR)
      }) as AxiosResponse;

    return response.data
  }
}
