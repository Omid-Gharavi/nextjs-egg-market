'use client'

import { useState } from 'react'

const LoginInput = ({ onChange, onKeyDown, inputValue, setInputValue, inputRef, className, disabled, inputClassName }) => {
    const [type, setType] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0);
    const [blur, setBlur] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <input
                disabled={disabled}
                ref={inputRef}
                value={inputValue}
                onClick={(e) => setCaretPosition(e.target.selectionStart)}
                onBlur={() => setBlur(true)}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    setCaretPosition(e.target.selectionStart)
                    onChange && onChange()
                }}
                onKeyDown={(e) => {
                    onKeyDown && onKeyDown(e)
                    setTimeout(() => {
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                            setCaretPosition(inputRef.current.selectionStart);
                        }
                    }, 0);
                }}
                onFocus={() => {
                    if (blur) {
                        return
                    } else {
                        setTimeout(() => {
                            inputRef.current.selectionStart = caretPosition;
                            inputRef.current.selectionEnd = caretPosition;
                        }, 0)
                        setBlur(false)
                    }
                }}
                dir="ltr"
                className={`${inputClassName} w-full h-12 px-4 rounded-lg border-solid border-[1px] ${inputValue === '' ? 'border-default-100' : 'border-tertiary'} ${type ? '' : 'text-xl'}`}
                type={!type ? 'password' : 'text'}
            />
            <span
                onClick={() => {
                    if (inputRef.current.value !== '') {
                        setType(!type);
                        const currentPosition = inputRef.current.selectionStart;
                        setTimeout(() => {
                            setCaretPosition(currentPosition);
                            inputRef.current.focus();
                            inputRef.current.selectionStart = currentPosition;
                            inputRef.current.selectionEnd = currentPosition;
                        }, 0);
                    }
                }}
                className={`cursor-pointer absolute top-[50%] translate-y-[-50%] right-4 text-2xl ${inputValue === '' ? 'icon-Show' : type ? 'icon-Hide' : 'icon-Show-fill'}`}></span>
        </div>
    )
}

export default LoginInput