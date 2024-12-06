"use client"

import Border from "@/components/country/border";
import Flag from "@/components/country/flag";
import PopulationChart from "@/components/country/population-chart";
import { useFetchCountryInfo } from "@/hooks/useFetchCountryInfo";
import { use, useEffect, useState } from "react";

interface CountryInfoPageProps {
    params: Promise<{ countryName: string }>;
    searchParams: Promise<{ code: string }>;
}

type CountryInfo = {
    commonName: string;
    countryCode: string;
    officialName: string;
    region: string;
    flag: string;
    populationCounts: { value: number, year: number }[];
    borders: Pick<CountryInfo, 'commonName' | 'region' | 'countryCode' | 'officialName'>[]
}

export default function CountryInfoPage({ params, searchParams }: CountryInfoPageProps) {
    const { countryName } = use(params);
    const { code } = use(searchParams);
    const { data: res, isSuccess, isError, isLoading } = useFetchCountryInfo({ countryCode: code, countryName });
    const [countryInfo, setCountryInfo] = useState<CountryInfo>(
        {
            commonName: "",
            countryCode: "",
            officialName: "",
            region: "",
            flag: "",
            populationCounts: [],
            borders: []
        }
    )

    useEffect(() => {
        if (isSuccess && res.data && res.status === 'success') {
            const { commonName, countryCode, officialName, region, flag, populationCounts, borders } = res.data;

            setCountryInfo({
                commonName,
                countryCode,
                officialName,
                region,
                flag,
                populationCounts,
                borders
            });
        }
    }, [isSuccess, res]);

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Error</p>;

    const validBorders = Array.isArray(countryInfo.borders)

    return (
        <div>
            <h1>{countryInfo.commonName}</h1>
            <h1>{countryInfo.countryCode}</h1>
            <h1>{countryInfo.officialName}</h1>
            <h1>{countryInfo.region}</h1>

            <Flag src={countryInfo.flag} alt={countryInfo.commonName} />

            {validBorders ? countryInfo.borders.map((border) =>
                <Border
                    key={border.countryCode}
                    border={border}
                />
            ) : null}

            <PopulationChart population={countryInfo.populationCounts} />
        </div>
    );
}
