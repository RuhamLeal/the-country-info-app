"use client";

import { useEffect, useRef, useState } from "react";
import { useFetchAvailableCountries } from "../../hooks/useFetchAvailableCountries";
import Card from "@/components/country/card";
import Image from "next/image";
import Loading from "@/components/default/loading";

type Country = {
    countryCode: string,
    name: string,
}

export default function CountriesPage() {
    const { data: res, isSuccess, isLoading } = useFetchAvailableCountries();
    const [countries, setCountries] = useState<Country[]>([])
    const [filterCountries, setFilterCountries] = useState<Country[]>([])
    const filterSearch = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSuccess && res.status === 'success') {
            setCountries(res.data.countries);
            setFilterCountries(res.data.countries);
        }
    }, [isSuccess, res?.data?.countries, res?.status]);

    const handleFilterSearch = () => {
        const inputvalue = filterSearch.current?.value;
        if (inputvalue && inputvalue.length) {
            if (Array.isArray(countries) && countries.length) {
                setFilterCountries(countries.filter((country) => {
                    const inputValueLC = inputvalue.toLowerCase();
                    const filterCondition =
                        country.name.toLowerCase().startsWith(inputValueLC)
                        || country.countryCode.toLowerCase() === inputValueLC
                    return filterCondition
                }))
            }
        } else {
            setFilterCountries(countries);
        }
    }


    return (
        <>
            <Image className="ml-4 mt-2 rounded-full xl:w-[120px] xl:h-[120px] 2xl:w-[140px] 2xl:h-[140px]" src={"/app-logo-wb.png"} alt="app-logo" width={80} height={80} />
            <div className="xl:px-12 2xl:px-20">
                <div className="m-4 relative w-full-minus-2rem xl:w-[50%]">
                    <input
                        ref={filterSearch}
                        onChange={handleFilterSearch}
                        placeholder="Search..."
                        className="bg-indigo-200 w-full text-black input focus:border-2 border-gray-300 px-5 py-3 rounded-xl outline-none"
                        name="search"
                        type="search"
                    />
                </div>
                {isLoading
                    ? <div className="mt-12 flex items-center justify-center"><Loading /></div>
                    : <div className="flex flex-row items-center justify-center flex-wrap gap-6 p-4">
                        {filterCountries.map((country: Country) => (
                            <Card key={country.countryCode} name={country.name} code={country.countryCode} />
                        ))}
                    </div>
                }

            </div>
        </>
    );
}
