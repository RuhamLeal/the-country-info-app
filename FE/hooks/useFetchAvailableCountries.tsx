import { useQuery } from "@tanstack/react-query";

const fetchAvailableCountries = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_AVAILABLE_COUNTRIES_URL as string);
    return response.json();
};

export function useFetchAvailableCountries() {
    return useQuery({
        queryKey: ["available-countries"],
        queryFn: fetchAvailableCountries,
        staleTime: 1000 * 60 * 2,
    });
}
