import { useRouter } from "next/navigation";


type CountryCardProps = {
    code: string,
    name: string,
}

export default function Card({ name, code }: CountryCardProps) {
    const router = useRouter();

    const navigateToCountry = (countryName: string, countryCode: string) => {
        router.push(`/countries/${countryName}?code=${countryCode}`);
    };

    return (
        <div
            className="w-full sm:w-1/2-minus-2rem min-h-24 rounded-lg p-6 hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-indigo-900 hover:from-indigo-950 hover:to-indigo-900 to-indigo-950 border border-transparent hover:border-indigo-300 cursor-pointer"
            onClick={() => navigateToCountry(name, code)}
        >
            <h1 className="tracking-widest antialiased break-words text-xl font-light text-white">{name}</h1><h2 className="text-sm text-gray-300 mt-2 z-10">{code}</h2>
        </div>
    );
}
