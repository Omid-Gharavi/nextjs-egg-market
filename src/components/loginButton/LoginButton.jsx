import React from 'react'

const LoginButton = ({ onClick, className, text }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${className} w-full h-12 mt-10 rounded-lg cursor-pointer font-bold`}
        >{text}</button>
    )
}

export default LoginButton