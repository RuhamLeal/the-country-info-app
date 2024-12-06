"use client";

import { useEffect, useState } from "react";
import { useFetchAvailableCountries } from "../../hooks/useFetchAvailableCountries";
import Card from "@/components/country/card";

type Country = {
    countryCode: string,
    name: string,
}

export default function CountriesPage() {
    const { data: res, isSuccess, isError, isLoading } = useFetchAvailableCountries();
    const [countries, setCountries] = useState<Country[]>([])

    useEffect(() => {
        if (isSuccess && res.status === 'success') {
            setCountries(res.data.countries);
        }
    }, [isSuccess, res?.data?.countries, res?.status]);

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Error</p>;


    return (
        <div>
            {countries.map((country: Country) => (
                <Card key={country.countryCode} name={country.name} code={country.countryCode} />
            ))}
        </div>
    );
}
