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
            className=""
            onClick={() => navigateToCountry(name, code)}
        >
            {name}/{code}
        </div>
    );
}
