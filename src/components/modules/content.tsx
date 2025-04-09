import dynamic from "next/dynamic";
import { useState } from "react";
const DynamicPinLocation = dynamic(
    () => import("@/components/common/map/PinLocation"),
    {
        ssr: false,
        loading: () => (
            <div className="flex w-full h-full justify-center items-center">
                Loading...
            </div>
        ),
    }
);

export default function Content() {
    return (
        <>
            <DynamicPinLocation />
        </>
    );
}
