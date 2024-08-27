'use client'

import eggMarket from '@/image/eggmarket.svg'
import Image from 'next/image'
import SearchModal from './SearchModal'

const Search = () => {
    return (
        <>
            <div className='w-full px-2 max-md:block hidden'>
                <div
                    onClick={() => document.getElementById('my_modal_5').showModal()}
                    className='mt-[5px] flex bg-zinc-50 cursor-text w-full h-[48px] px-4 rounded-[12px] border-solid border-2 border-default-100 justify-center items-center'>
                    <span className="icon-Search-2 text-[21px] invert-[40%]"></span>
                    <div className='relative w-full px-2'>
                        <div className={`absolute flex gap-2 top-[50%] translate-y-[-50%]`}>
                            <p className='text-default-100'>جستجو در</p>
                            <Image src={eggMarket} alt='eggMarket' />
                        </div>
                    </div>
                </div>
            </div>
            <SearchModal id={'my_modal_5'} />
        </>
    )
}

export default Search