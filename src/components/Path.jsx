'use client';
import { usePathname } from 'next/navigation';
export default function Path({ childProp, excludePath = [] }) {
    const path = usePathname();
    console.log("Exclude path:", excludePath)
    console.log('path:', path)

    return (
        <>
            {excludePath.includes(path) ? null : childProp}
        </>
    );
}