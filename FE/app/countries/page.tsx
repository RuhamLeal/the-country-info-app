"use client";

import { useEffect, useState } from "react";
import { useFetchAvailableCountries } from "../../hooks/useFetchAvailableCountries";
import { useRouter } from "next/navigation";

type Country = {
    countryCode: string,
    name: string,
}

export default function CountriesPage() {
    const { data: res, isSuccess, isError, isLoading } = useFetchAvailableCountries();
    const [countries, setCountries] = useState<Country[]>([])
    const router = useRouter();

    useEffect(() => {
        if (isSuccess && res.status === 'success') {
            setCountries(res.data.countries);
        }
    }, [isSuccess, res?.data?.countries, res?.status]);

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Error</p>;

    const navigateToCountry = (countryCode: string) => {
        router.push(`/countries/${countryCode}`);
    };

    return (
        <ul>
            {countries.map((country: Country) => (
                <li
                    key={country.countryCode}
                    onClick={() => navigateToCountry(country.countryCode)}
                >
                    {country.name}/{country.countryCode}
                </li>
            ))}
        </ul>
    );
}
