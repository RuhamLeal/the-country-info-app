export type AvailableCountry = {
  countryCode: string,
  name: string,
}

export type CountryInfoQuery = {
  countryCode: string,
  countryName: string,
}

export interface CountryInfo extends CountryBordersInfo, CountryPopulation, CountryFlagImg { }

export interface CountryBordersInfo {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  borders: CountryBordersInfo[] | null
}

export interface CountryPopulation {
  populationCounts: { year: number, value: number }[] | null
}

export interface CountryFlagImg {
  flag: string | null
}