import { Skeleton } from "@heroui/react";

export default function InputSkeleton({ label }) {
    console.log(label)
    return (
        <>
            {label && <div className="text-sm mb-4">{label}</div>}
            <Skeleton className='rounded-lg'>
                <div className=" h-9"></div>
            </Skeleton>
        </>

    )
}