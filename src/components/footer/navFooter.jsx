'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { lists } from '../nav/Nav'
import Link from 'next/link'

const Pages = ({ text, href, icon, activeIcon }) => {
    const path = usePathname()
    return (
        <Link href={href} className=' text-[12px] flex flex-col items-center' >
            <span className={`${path === href ? activeIcon : icon} text-2xl`}></span>
            <p className={`text-xs ${path === href ? 'text-primary' : ''}`}>{text}</p>
            {path === href && (
                <>
                    <div className='w-full h-[2px] bg-primary mt-auto'></div>
                    <div className='absolute w-[49px] inset-y-0 bg-primary opacity-10'></div>
                </>
            )}
        </Link >
    )
}

const NavFooter = () => {
    const icons = [
        {
            icon: 'icon-icon-ads-empty',
            iconActive: 'icon-icon-ads-empty-active'
        },
        {
            icon: 'icon-Dollar-Square',
            iconActive: 'icon-Dollar-Square-active'
        },
        {
            icon: 'icon-icon-calculator',
            iconActive: 'icon-icon-calculator-active'
        },
        {
            icon: 'icon-icon-profile',
            iconActive: 'icon-icon-profile-active'
        },
    ]

    return (
        <>
            <ul className='absolute flex max-[450px]:gap-[25px] gap-11 text-default-50 z-40 inset-y-0 pt-4 px-7 max-[450px]:px-4 max-[450px]:pt-1'>
                {lists.map((list, index) => {
                    if (index <= 1) {
                        return <Pages key={index + 1} text={list.text} href={list.href} icon={icons[index].icon} activeIcon={icons[index].iconActive} />
                    }
                })}
            </ul>
            <ul className='absolute flex max-[450px]:gap-[25px] gap-11 text-default-50 z-40 inset-y-0 left-0 pt-4 px-7 max-[450px]:px-4 max-[450px]:pt-1'>
                {lists.map((list, index) => {
                    if (index > 1) {
                        return <Pages key={index + 1} text={list.text} href={list.href} icon={icons[index].icon} activeIcon={icons[index].iconActive} />
                    }
                })}
            </ul>
        </>
    )
}

export default NavFooter