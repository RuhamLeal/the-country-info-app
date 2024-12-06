import { useRouter } from "next/navigation";


type BorderProps = {
    border: {
        commonName: string;
        countryCode: string;
        officialName: string;
        region: string;
    }
}

export default function Border({ border }: BorderProps) {
    const router = useRouter();

    const navigateToCountry = (countryName: string, countryCode: string) => {
        router.push(`/countries/${countryName}?code=${countryCode}`);
    };
    return (
        <div onClick={() => navigateToCountry(border.commonName, border.countryCode)}>
            <h1>{border.commonName}</h1>
            <h2>{border.countryCode}</h2>
            <h3>{border.officialName}</h3>
            <p>{border.region}</p>
        </div>
    );
}
