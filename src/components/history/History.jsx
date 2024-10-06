'use client'

import React from 'react'
import InputText from '../UI/InputText'

const History = ({ date, placeholder }) => {
    return (
        <InputText
            className={'text-default-500 !pl-10'}
            space={'max-w-[174px]'}
            placeholder={placeholder}
            icon={'icon-light-linear-Calender-gray'}
            onClick={() => document.getElementById("modal_history").showModal()}
            absolute={date}
        />
    )
}

export default History