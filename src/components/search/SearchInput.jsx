'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import advertising from '@/image/advertising.svg'

const SearchInput = () => {
    const [datas, setDatas] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api');
                const data = await response.json();
                setDatas(data || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            await fetch('http://localhost:3000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            })
            if (!datas.includes(input) && input !== '') {
                if (datas.length < 10) {
                    setDatas([...datas, input]);
                } else {
                    datas.shift()
                    setDatas([...datas, input]);
                }
            }
            setInput('');
        }
    }

    const lists = [
        {
            icon: 'icon-calender',
            text: 'تاریخچه جستجوهای شما',
            trash: true,
            isTrue: true
        },
        {
            icon: 'icon-Activity-1',
            text: 'بیشترین جستجوها',
            isTrue: true
        },
        {
            icon: 'icon-icon-ads-empty1 invert',
            text: 'پیشنهاد ویژه',
            isTrue: false
        },
    ]

    return (
        <>
            <div className='flex items-center gap-4 px-6'>
                <form method='dialog' className='pt-6'>
                    <button>
                        <span className='icon-Vector text-default-200 text-[11.5px]'></span>
                    </button>
                </form>
                <label className='pt-6 w-full'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='outline-none w-full text-default-200'
                        type="text"
                        placeholder='جستجو در بازار اگمارکت' />
                </label>
            </div>
            <div className='h-[1.2px] bg-primary mx-2 mt-4'></div>
            <div className='mt-2'>
                {
                    lists.map((list, index) => (
                        <>
                            <div className='mt-4 flex px-6' key={index + 1}>
                                <div className='flex items-center gap-2'>
                                    <span className={list.icon}></span>
                                    <p className='text-sm text-default-200'>{list.text}</p>
                                </div>
                                {list.trash && <span
                                    onClick={async () => {
                                        await fetch('http://localhost:3000/api', { method: 'DELETE' })
                                        setDatas([])
                                    }}
                                    className='icon-trash mr-auto'></span>}
                            </div>
                            {list.isTrue && <>
                                <div key={index + 1} className='h-8 mr-6 mt-4 overflow-x-auto grid auto-cols-max grid-flow-col gap-2 overscroll-contain items-center'>
                                    {
                                        datas.map((data, index) => (<div key={index + 1}
                                            className='text-sm text-default-200 py-1 px-2 rounded-full text-center border-[1px] border-solid border-default-100'
                                            onClick={() => setInput(data)}
                                        >{data}</div>))
                                    }
                                </div>
                                <div key={index + 1} className='h-px mt-[14px] bg-default-100 w-full'></div>
                            </>}
                        </>
                    ))
                }
                {
                    [{ city: 'چکاوک', weight: '۱۲.۴۰۰', filters: ['زرده ساده', ' با پرینت', '۳۶۰ کارتن ', ' لوکس', ' کاشان'] }].map((list, index) => (
                        <div key={index + 1} className='max-w-[364px] h-[78px] mx-4 rounded-lg shadow-[0px_1px_4px_0px_#00000026] mt-[18px] py-3 px-4'>
                            <div className='flex items-center'>
                                <Image src={advertising} alt='advertising' />
                                <p className='text-default-400 text-xs mr-[2.5px]'>برند</p>
                                <p className='text-tertiary font-bold mr-1'>{list.city}</p>
                                <p className='text-default-500 mx-1'>|</p>
                                <p className='text-tertiary font-bold font-["vazir"]'>{list.weight}<span className='text-default-400 text-sm font-normal'> کیلوگرم</span></p>
                            </div>
                            <div key={index + 1} className='mt-2 flex'>{list.filters.map((filter, index) => (<p key={index + 1} className='text-default-500 text-sm font-normal'>{filter}{index < list.filters.length - 1 && ' -'}</p>))}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default SearchInput