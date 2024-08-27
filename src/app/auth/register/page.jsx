'use client'

import LoginButton from "@/components/loginButton/LoginButton";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

export default function RegisterPage() {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)
    const inputRef = useRef(inputValue)
    const router = useRouter()

    const phoneNumber = z.string().regex(/^0\d{0,10}$/g).min(0).max(11)

    useEffect(() => {
        sessionStorage.setItem('phone', inputValue)
    }, [inputValue])

    return (
        <>
            <p className="text-sm mt-10">برای ورود یا ثبت‌نام، لطفا شماره موبایل خود را وارد کنید</p>
            <input
                dir="ltr"
                className={`placeholder:text-right mt-8 w-full py-3 px-4 rounded-lg border-solid border-[1px] ${error ? 'border-danger' : 'border-default-100'} ${inputRef.current && inputRef.current.value !== '' && 'border-tertiary'}`}
                type="text"
                placeholder="مثلا ۰۹۱۲۳۴۵۶۷۸۹"
                value={inputValue}
                ref={inputRef}
                onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = value.replace(/[^0-9]/g, '');
                    setInputValue(numericValue);
                    setError(numericValue !== '' && !phoneNumber.safeParse(numericValue).success);
                }}
            />
            <p className={`${error ? 'block' : 'hidden'} mt-4 text-danger`}>شماره وارد شده معتبر نیست.</p>
            <LoginButton
                onClick={() => inputRef.current && inputRef.current.value.length === 11 && router.push('/auth/code')}
                className={`${!error && inputRef.current && inputRef.current.value !== '' && inputRef.current.value.length === 11 ? 'bg-primary text-default-500' : 'bg-orange-100 text-default-100'}`} text={'ورود به اگمارکت'} />
            <p className="text-xs mt-6">با ورود یا ثبت‌نام در اگمارکت، <span className="text-tertiary underline underline-offset-8 cursor-pointer">قوانین و مقررات</span> آن را می‌پذیرید.</p>
        </>
    )
}