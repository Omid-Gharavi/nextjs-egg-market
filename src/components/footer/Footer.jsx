import bg from '@/image/bg.svg'
import Image from 'next/image'
import egg from '@/image/egg.svg'
import NavFooter from './navFooter'

const Footer = () => {
    return (
        <div className='w-full fixed bottom-0 max-md:block hidden'>
            <Image src={bg} alt='bg' className='w-full' />
            <div className='max-[450px]:scale-[0.9] scale-[1.5] max-[450px]:bottom-[28%] bottom-[60%] absolute translate-x-[-51%] left-[50%]'>
                <Image src={egg} alt='egg' />
                <span className='icon-icon-new-ad-empty text-2xl absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]'></span>
            </div>
            <p className='absolute left-[50%] translate-x-[-45%] bottom-[5px] text-xs text-white max-[361px]:text-[10px]'>اعلام بار کن!</p>
            <NavFooter />
        </div>

    )
}

export default Footer