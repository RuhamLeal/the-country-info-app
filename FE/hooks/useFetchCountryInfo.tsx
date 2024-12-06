import { useQuery } from "@tanstack/react-query";

type CountryQuery = {
    countryCode: string,
    countryName: string,
}

const fetchCountryInfo = async ({ countryCode, countryName }: CountryQuery) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_COUNTRY_INFO_URL}?countryCode=${countryCode}&countryName=${countryName}`);
    return response.json();
};

export function useFetchCountryInfo(countryData: CountryQuery) {
    return useQuery({
        queryKey: ["country-info"],
        queryFn: () => fetchCountryInfo(countryData),
    });
}
