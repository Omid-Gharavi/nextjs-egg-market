'use client'

import { useState, useRef } from 'react';
import LoginButton from '../loginButton/LoginButton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Code = () => {
    const [inputValue, setInputValue] = useState(['', '', '', '', '']);
    const inputRefs = useRef([]);
    const router = useRouter()

    const handleInputChange = (index, e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        const newInputValue = [...inputValue];
        newInputValue[index] = numericValue;
        setInputValue(newInputValue);
        if (numericValue.length === 1) {
            const nextIndex = index + 1;
            if (nextIndex <= inputValue.length - 1 && inputRefs.current[nextIndex].value === '') {
                inputRefs.current[nextIndex].focus();
            }
        }
    };

    return (
        <>
            <div className='flex flex-row-reverse justify-center gap-3'>
                {
                    inputValue.map((value, index) => (
                        <input
                            key={index}
                            dir='ltr'
                            value={value}
                            className={`text-center w-[55px] h-[55px] rounded-lg border-[1px] border-solid ${inputValue[index] !== '' ? 'border-tertiary' : 'border-default-100'} max-sm:w-12 max-sm:h-12 text-[28px] font-bold`}
                            type="text"
                            maxLength={1}
                            onClick={(e) => {
                                inputRefs.current[index].setSelectionRange(1, 2)
                            }}
                            onChange={(e) => {
                                handleInputChange(index, e)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
                                if (e.key === 'ArrowLeft') {
                                    if (index > 0) {
                                        e.preventDefault();
                                        inputRefs.current[index - 1].focus()
                                    } else {
                                        e.preventDefault()
                                    }
                                } else if (e.key === 'ArrowRight' && index < inputValue.length - 1) {
                                    e.preventDefault();
                                    inputRefs.current[index + 1].focus()
                                }
                                if (e.key === 'Backspace') {
                                    if (inputRefs.current[index].value === '' && index > 0) {
                                        e.preventDefault();
                                        inputRefs.current[index - 1].focus()
                                    } else {
                                        const newInputValue = [...inputValue];
                                        newInputValue[index] = '';
                                        setInputValue(newInputValue);
                                    }
                                }
                            }}
                            ref={(e) => (inputRefs.current[index] = e)}
                        />
                    ))
                }
            </div>
            <div className='flex items-center justify-between mt-4'>
                <p className='text-sm font-normal text-default-100'>کد را دریافت نکردید؟</p>
                <p className='text-tertiary text-sm font-semibold'>درخواست دوباره</p>
            </div>
            <Link href={'/auth/password'} className="flex items-cente gap-4 text-tertiary mt-8">
                <p>ورود با رمز عبور</p>
                <span className='icon-Down-2 text-[0.4rem] rotate-90'></span>
            </Link>
            <LoginButton
                onClick={() => {
                    inputValue.every(value => value !== '') && router.push('/')
                    sessionStorage.clear()
                }}
                className={`${inputValue.every(value => value !== '') ? 'bg-primary text-default-500' : 'bg-orange-100 text-default-100'}`} text={'ادامه'}
            />
        </>
    );
};

export default Code;    