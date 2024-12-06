import { useRouter } from "next/navigation";

type BackButtonProps = {
    dest: string;
}

export default function BackButton({ dest }: BackButtonProps) {
    const router = useRouter();

    const navigateToDest = (destination: string) => {
        if (destination && destination.length) {
            router.push(destination);
        }
    };

    return (
        <button
            className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
            onClick={() => navigateToDest(dest)}
            title="Go Back">
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-indigo-800">
                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
            </svg>
        </button>
    );
}