

import Image from "next/image";

type FlagProps = {
    src: string;
    alt: string;
    itemClass: string;
}

export default function Flag({ src, alt, itemClass }: FlagProps) {
    const validFlag = typeof src === 'string' && src.length;

    if (!validFlag) return null;

    return (
        <Image className={itemClass} src={src} height={200} width={200} alt={`${alt} flag`} />
    );
}
