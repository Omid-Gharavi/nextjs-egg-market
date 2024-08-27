'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const lists = [
    {
        text: 'آگهی ها',
        href: '/'
    },
    {
        text: 'قیمت روز',
        href: '/price'
    },
    {
        text: 'ماشین حساب',
        href: '/calculator'
    },
    {
        text: 'پروفایل',
        href: '/auth/register'
    },
]

const Nav = () => {
    const path = usePathname()
    return (
        <ul className='flex gap-7 text-default-50'>
            {
                lists.map((list, index) => (
                    <Link
                        href={list.href}
                        key={index + 1}
                        className={`hover:text-primary ${path === list.href ? 'text-primary underline underline-offset-[20px] decoration-2 cursor-default' : ''}`}>
                        {list.text}
                    </Link>
                ))
            }
        </ul>
    )
}

export default Nav