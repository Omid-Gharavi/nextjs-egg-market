'use client';
import { usePathname } from 'next/navigation';

export default function Path({ childProp, excludePath = [] }) {
    const path = usePathname();
    const shouldRenderChild = !excludePath.includes(`${process.env.NEXT_PUBLIC_API_URL}${path}`);

    return shouldRenderChild ? (
        <>
            {childProp}
        </>
    ) : null;
}