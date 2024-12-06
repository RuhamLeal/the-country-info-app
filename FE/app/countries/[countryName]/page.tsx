"use client"

import Card from "@/components/country/card";
import Flag from "@/components/country/flag";
import PopulationChart from "@/components/country/population-chart";
import BackButton from "@/components/default/back-button";
import Loading from "@/components/default/loading";
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
    const { data: res, isSuccess, isLoading, isRefetching } = useFetchCountryInfo({ countryCode: code, countryName });
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

    if (isLoading || isRefetching) return (
        <>
            <BackButton dest={"/countries"} />
            <div className="mt-12 flex items-center justify-center"><Loading /></div>
        </>
    );

    const validBorders = Array.isArray(countryInfo.borders) && countryInfo.borders.length;

    return (
        <div>
            <BackButton dest={"/countries"} />
            <div className="p-6 m-4 rounded-lg bg-indigo-950">
                <div className="p-4 flex justify-center items-center">
                    <Flag itemClass="rounded max-w-[720px] w-full h-full" src={countryInfo.flag} alt={countryInfo.commonName} />
                </div>
                <h1 className="flex justify-center items-center mb-4 text-indigo-300 text-2xl uppercase font-light tracking-wider">{countryInfo.commonName}</h1>
                <div className="2xl:flex-wrap 2xl:flex 2xl:flex-row 2xl:gap-4">
                    <div className="2xl:w-1/2-minus-2rem 2xl:h-[450px]">
                        <div className="2xl:mb-12 mb-4">
                            <h1 className="lg:text-lg lg:text-lg left-4 bg-indigo-200 text-indigo-950 px-2 rounded text-sm uppercase">{"Code"}</h1>
                            <h1 className="lg:text-xl ml-2 text-lg font-bold tracking-wider">{countryInfo.countryCode}</h1>
                        </div>
                        <div className="2xl:mb-12 mb-4">
                            <h1 className="lg:text-lg left-4 bg-indigo-200 text-indigo-950 px-2 rounded text-sm uppercase">{"Official Name"}</h1>
                            <h1 className="lg:text-xl ml-2 text-base font-bold tracking-wider">{countryInfo.officialName}</h1>
                        </div>
                        <div className="2xl:mb-12 mb-4">
                            <h1 className="lg:text-lg left-4 bg-indigo-200 text-indigo-950 px-2 rounded text-sm uppercase">{"Region"}</h1>
                            <h1 className="lg:text-xl ml-2 text-lg font-bold tracking-wider">{countryInfo.region}</h1>
                        </div>
                    </div>
                    <div className="mb-4 2xl:w-1/2-minus-2rem 2xl:h-[450px]">
                        <h1 className="mb-2 lg:text-lg left-4 bg-indigo-200 text-indigo-950 px-2 rounded text-sm uppercase">{"Country Borders"}</h1>
                        <div className="flex flex-row items-center justify-center flex-wrap gap-4 p-4 bg-slate-950 rounded-lg 2xl:h-[400px] 2xl:overflow-y-scroll">
                            {validBorders ? countryInfo.borders.map((border) =>
                                <Card
                                    key={border.countryCode}
                                    code={border.countryCode}
                                    name={border.commonName}
                                />
                            ) : <h1>No borders found</h1>}
                        </div>
                    </div>
                </div>

                <h1 className="2xl:w-full-minus-2rem mb-2 lg:text-lg left-4 bg-indigo-200 text-indigo-950 px-2 rounded text-sm uppercase">{"Population over the years"}</h1>
                <PopulationChart population={countryInfo.populationCounts} />
            </div>
        </div>
    );
}
