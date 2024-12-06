

import Image from "next/image";

type FlagProps = {
    src: string;
    alt: string;
}

export default function Flag({ src, alt }: FlagProps) {
    const validFlag = typeof src === 'string' && src.length;

    if (!validFlag) return null;

    return (
        <div>
            <Image src={src} height={200} width={200} alt={`${alt} flag`} />
        </div>
    );
}
