'use client'

import LoginButton from "@/components/loginButton/LoginButton";
import LoginInput from "@/components/loginInput/LoginInput";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { z } from "zod";

export default function SignUpPage() {
    const [inputValue, setInputValue] = useState('')
    const [inputValueVerify, setInputValueVerify] = useState('')
    const [state, setState] = useState([false, false, false])
    const [verify, setVerify] = useState(false)
    const inputRef = useRef()
    const inputRefVerify = useRef()
    const router = useRouter()

    const characterMin = z.string().min(8)
    const english = z.string().regex(/[a-zA-Z]/)
    const number = z.string().regex(/[0-9]/)

    return (
        <>
            <div className="mt-10">
                <p>رمز عبور جدید</p>
                <LoginInput
                    className={'mt-3'}
                    inputRef={inputRef}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    onChange={() => {
                        const newState = [
                            characterMin.safeParse(inputRef.current.value).success,
                            english.safeParse(inputRef.current.value).success,
                            number.safeParse(inputRef.current.value).success,
                        ]
                        setState(newState)
                        setVerify(inputRef.current.value === inputRefVerify.current.value && inputRef.current.value !== '');
                    }}
                />
            </div>
            <ul className="flex flex-col gap-1 mt-3">
                {
                    ['حداقل ۸ کاراکتر', 'شامل حروف انگلیسی', 'شامل عدد'].map((list, index) => (
                        <li className={`flex gap-1 ${state[index] ? 'text-success' : 'text-default-100'}`} key={index + 1}>
                            <span className={`text-lg ${state[index] ? 'icon-tick' : 'icon-circle'}`}></span>
                            <p>{list}</p>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-6">
                <p>تکرار رمز عبور جدید</p>
                <LoginInput
                    className={'mt-2'}
                    disabled={!state.every(s => s)}
                    inputRef={inputRefVerify}
                    setInputValue={setInputValueVerify}
                    inputValue={inputValueVerify}
                    onChange={() => {
                        setInputValueVerify(inputRefVerify.current.value);
                        setTimeout(() => {
                            setVerify(inputRef.current.value === inputRefVerify.current.value);
                        }, 0)
                    }}
                />
            </div>
            <LoginButton onClick={() => {
                verify && router.push('/')
            }} className={`mt-6 ${verify ? 'bg-primary text-default-500' : 'bg-orange-100 text-default-100'}`} text={'تعیین رمز عبور'} />
        </>
    )
}