import React from 'react'

const Filter = () => {
    const lists = [
        {
            text: 'فقط بارهای موجود',
            href: '/filter',
        },
        {
            text: 'مبدأ بار',
            href: '/des',
            dash: true
        },
        {
            text: 'وزن',
            href: '/weight',
            dash: true
        },
        {
            text: 'پرینت',
            href: '/print',
            dash: true
        },
    ]

    return (
        <div className='mt-3 mb-[10px] w-full items-center max-md:grid grid-cols-[32px_1fr] hidden pr-3 gap-1'>
            <div href={'#'} className='flex justify-center items-center w-[32px] h-[32px] rounded-lg bg-tertiary'>
                <span className='icon-Filter-5'></span>
            </div>
            <div className='overflow-x-auto grid auto-cols-max grid-flow-col gap-[3px] overscroll-contain items-center'>
                {
                    lists.map((list, index) => (
                        <div key={index + 1} className='flex gap-2 h-[32px] text-sm font-[400] px-3 items-center rounded-2xl bg-purple-100'>
                            <p className='text-default-200'>{list.text}</p>
                            {list.dash && <span className='icon-Down-2 text-[4px]'></span>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Filter