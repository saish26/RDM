import Image from "next/image";
import { useRouter } from "next/navigation";

const CommonLogo = (props: any) => {
    const router = useRouter();
    return (
        <Image
            src="/homepage-img/glowktm-logo.svg"
            alt="GlowKtm"
            width={1024}
            height={1024}
            onClick={() => router.push("/")}
            className="h-[5rem] w-[10rem] pl-5 object-contain"
        />
    );
};

export default CommonLogo;
