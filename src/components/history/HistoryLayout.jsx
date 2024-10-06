'use client'

import History from "@/components/history/History";
import HistoryModal from "@/components/Modal/HistoryModal";
import { useEffect, useState } from "react";

const HistoryLayout = ({ placeholder }) => {
    const [dateValue, setDateValue] = useState({ year: 0, month: '', day: '' });

    useEffect(() => {
        console.log(dateValue)
    }, [dateValue])

    return (
        <>
            <History placeholder={placeholder} date={dateValue} />
            <HistoryModal dateValue={dateValue} setDateValue={setDateValue} />
        </>
    )
}

export default HistoryLayout