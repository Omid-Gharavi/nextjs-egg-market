'use client'

import Button from "@/components/UI/Button"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()

    const lists = [
        {
            name: 'شماره پیگیری',
            text: '۱۲۳۴۵۶۷۸۹۰'
        },
        {
            name: 'نوع پرداخت',
            text: 'پرداخت آنلاین'
        },
        {
            name: 'تاریخ',
            text: '۱۴۰۳/۰۴/۱۵',
            second: '۱۲:۴۷'
        },
        {
            name: 'مبلغ',
            text: '۲۲۲.۷۵۰.۰۰۰',
            second: 'تومان'
        },
    ]

    return (
        <div className="min-h-screen flex flex-col justify-center gap-7 px-6">
            <div className="relative overflow-hidden bg-default-50 border-solid border-[2px] border-default-200 w-full rounded-2xl">
                <span className="icon-Share absolute top-4 right-4 text-xl text-default-500 cursor-pointer"></span>
                <div className="mt-6 flex flex-col gap-6 justify-center items-center">
                    <div className="flex justify-center items-center rounded-full w-[85px] h-[85px] bg-success">
                        <span className="icon-light-linear-Tick-success text-6xl"></span>
                    </div>
                    <p className="text-xl font-bold text-success">پرداخت با موفقیت انجام شد.</p>
                </div>
                <ul className="mt-10 mb-6 flex flex-col">
                    {
                        lists.map((list, index) => (
                            <li key={index + 1} className='flex justify-between items-center px-6 h-11'>
                                <p className='text-sm font-normal text-default-500'>{list.name}</p>
                                <div className='flex items-center gap-1'>
                                    <p className='font-semibold text-default-900'>{list.text}</p>
                                    <p className='text-sm font-normal text-default-500'>{list.second}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Button
                text={'بازگشت به آگهی‌ها'}
                type={'w-full text-tertiary border-solid border-[2px] border-tertiary'}
                onClick={() => router.push('/')}
            />
        </div>
    )
}