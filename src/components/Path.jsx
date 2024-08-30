'use client';
import { usePathname } from 'next/navigation';
export default function Path({ childProp, excludePath = [] }) {
    const path = usePathname();

    console.log('exclude path:', excludePath)
    console.log('path:', path)

    const currentPath = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
    const shouldRenderChild = !excludePath.some(excluded => currentPath.endsWith(excluded));

    return shouldRenderChild ? childProp : null;
}