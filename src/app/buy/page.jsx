'use client'

import Button from "@/components/UI/Button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import border from '@/image/border.svg'
import { useReceipt } from "@/store/productDetail"
import { useRef } from "react"
import html2canvas from "html2canvas-pro"

export default function Page() {
    const captureRef = useRef()
    const router = useRouter()
    const addReceipt = useReceipt(state => state.addReceipt)
    const removeAllReceipt = useReceipt(state => state.removeAllReceipt)

    const lists = [
        {
            name: 'شماره فاکتور',
            text: '۱۴۰۳۰۷۱۴۰۰۴-۱'
        },
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
            <div ref={captureRef} className="relative bg-[#F7F7F7] w-full rounded-tl-2xl rounded-tr-2xl border-solid border-t border-x border-[#C2C2C2]">
                <span className="icon-Share absolute top-4 right-4 text-xl text-default-500 cursor-pointer"></span>
                <Image className="absolute top-[100%] inset-x-0 w-full" src={border} alt="style" />
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
            <div className="grid grid-cols-2 gap-3">
                <Button
                    text={'ذخیره'}
                    type={'w-full text-tertiary border-solid border-[2px] border-tertiary'}
                    onClick={() => {
                        addReceipt(lists)
                        const element = captureRef.current
                        html2canvas(element, {
                            useCORS: true,
                            allowTaint: false
                        }).then(canvas => {
                            const link = document.createElement('a')
                            link.href = canvas.toDataURL('image/png')
                            link.download = 'screenshot.png'
                            link.click()
                        })
                        // removeAllReceipt()
                    }}
                />
                <Button
                    text={'بازگشت به آگهی‌ها'}
                    type={'w-full text-tertiary border-solid border-[2px] border-tertiary'}
                    onClick={() => router.push('/')}
                />
            </div>
        </div>
    )
}